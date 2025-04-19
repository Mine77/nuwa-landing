import { NextApiRequest, NextApiResponse } from 'next';
import { Anthropic } from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from './systemPrompt';

// 初始化 Anthropic 客户端
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { messages } = req.body;

        // 验证消息
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: 'Missing or invalid messages' });
        }

        // 设置 SSE 头
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            'Connection': 'keep-alive',
            'X-Accel-Buffering': 'no'
        });

        // 发送开始事件
        res.write(`event: start\ndata: {"role":"assistant"}\n\n`);

        // 创建Anthropic消息请求
        const response = await anthropic.messages.create({
            model: 'claude-3-opus-20240229',
            messages: messages.map(({ content, role }) => ({
                content: typeof content === 'string' ? content : JSON.stringify(content),
                role: role === 'user' ? 'user' : 'assistant'
            })),
            max_tokens: 4096,
            stream: true,
            system: SYSTEM_PROMPT
        });

        try {
            for await (const chunk of response) {
                if (chunk.type === 'content_block_delta' &&
                    chunk.delta.type === 'text_delta') {
                    const text = chunk.delta.text;

                    // 发送文本块 - 确保格式与客户端期望的完全一致
                    const eventData = `event: text\ndata: {"text":${JSON.stringify(text)}}\n\n`;
                    res.write(eventData);
                }
            }

            // 发送完成事件
            res.write(`event: done\ndata: {}\n\n`);
        } catch (error) {
            // 发送错误事件
            const errorData = `event: error\ndata: ${JSON.stringify({ error: String(error) })}\n\n`;
            res.write(errorData);
        } finally {
            res.end();
        }
    } catch (error) {
        console.error('Error in chat API:', error);
        res.status(500).json({ error: 'An error occurred during the chat process' });
    }
} 