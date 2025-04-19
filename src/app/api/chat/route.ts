import { Anthropic } from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from './systemPrompt';

// 初始化 Anthropic 客户端
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // 验证消息
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return new Response('Missing or invalid messages', { status: 400 });
        }

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

        // 创建Server-Sent Events流
        const encoder = new TextEncoder();
        let counter = 0;

        const stream = new ReadableStream({
            async start(controller) {
                // 发送开始事件
                const queue = encoder.encode('event: start\ndata: {"role":"assistant"}\n\n');
                controller.enqueue(queue);

                try {
                    for await (const chunk of response) {
                        if (chunk.type === 'content_block_delta' &&
                            chunk.delta.type === 'text_delta') {
                            const text = chunk.delta.text;
                            counter++;

                            // 文本块
                            const textChunk = encoder.encode(`event: text\ndata: {"text":${JSON.stringify(text)}}\n\n`);
                            controller.enqueue(textChunk);
                        }
                    }

                    // 完成事件
                    const done = encoder.encode('event: done\ndata: {}\n\n');
                    controller.enqueue(done);
                } catch (error) {
                    // 错误事件
                    const errorEvent = encoder.encode(`event: error\ndata: ${JSON.stringify({ error: String(error) })}\n\n`);
                    controller.enqueue(errorEvent);
                }

                controller.close();
            }
        });

        // 返回流式响应
        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            }
        });
    } catch (error) {
        console.error('Error in chat API:', error);
        return new Response('An error occurred during the chat process', { status: 500 });
    }
} 