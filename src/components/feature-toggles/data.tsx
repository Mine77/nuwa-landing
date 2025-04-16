import { AiFillBug } from "react-icons/ai";
import { BsFillCursorFill } from "react-icons/bs";
import {
  FiAlignLeft,
  FiAnchor,
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiChevronRight,
  FiClock,
  FiEdit,
  FiEye,
  FiItalic,
} from "react-icons/fi";

const IssuesComponent = () => {
  return (
    <div className="h-full w-full p-4">
      <div className="mb-6 flex items-center gap-1.5 text-sm">
        <span className="text-zinc-600">SEO Team</span>
        <FiChevronRight />
        <div className="flex items-center gap-1 rounded bg-red-100 px-1.5 py-0.5 text-red-900">
          <AiFillBug />
          <span>Bugs</span>
        </div>
      </div>
      <div className="-ml-1.5 mb-4 flex items-center gap-1.5">
        <img
          src="https://api.dicebear.com/8.x/notionists/svg"
          alt="avatar"
          className="ml-1.5 size-8 rounded bg-indigo-200 shadow-inner"
        />
        <div>
          <span className="block text-sm font-medium">Andrea Smith</span>
          <span className="block text-xs text-zinc-600">Site Reliability</span>
        </div>
      </div>
      <div className="mb-1 line-clamp-1 text-xl font-medium">
        Bot crawlers causing latency issues
      </div>
      <span className="line-clamp-3 text-sm leading-relaxed text-zinc-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed incidunt
        iste molestiae distinctio assumenda quos consectetur laborum eaque autem
        libero?
      </span>
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-1.5 bg-white/50 p-4 backdrop-blur">
        <span className="flex w-fit items-center gap-1 rounded bg-yellow-100 px-1.5 py-0.5 text-sm text-yellow-900">
          <FiClock />
          <span>TODO</span>
        </span>
        <span className="flex w-fit items-center gap-1 rounded bg-zinc-200 px-1.5 py-0.5 text-sm text-zinc-900">
          <FiArrowRight />
          <span>Medium</span>
        </span>
      </div>
    </div>
  );
};

const KanbanComponent = () => {
  return (
    <div className="relative grid h-full w-full min-w-96 grid-cols-2 gap-2 p-4 pb-0 pr-0">
      <div className="relative z-0 h-full w-full rounded-t-xl bg-zinc-100 p-4">
        <div className="flex items-center justify-between">
          <span className="flex w-fit items-center gap-1 rounded bg-blue-100 px-1.5 py-0.5 text-sm text-blue-900">
            <FiEye />
            <span>Doing</span>
          </span>
          <FiChevronDown />
        </div>
        <div className="mt-4 space-y-2">
          <BGTask />
          <BGTask />
          <BGTask />
        </div>
      </div>
      <div className="relative z-0 h-full w-full rounded-t-xl bg-zinc-100 p-4">
        <div className="flex items-center justify-between">
          <span className="green-yellow-900 flex w-fit items-center gap-1 rounded bg-green-100 px-1.5 py-0.5 text-sm">
            <FiCheck />
            <span>Done</span>
          </span>
          <FiChevronDown />
        </div>
        <div className="mt-4 space-y-2">
          <BGTask />
        </div>
      </div>

      <OverlayTask />
    </div>
  );
};

const BGTask = () => {
  return (
    <div className="w-full rounded-lg bg-white p-4 text-[0.5rem] text-zinc-400 shadow blur-[1px] sm:text-xs">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </div>
  );
};

const OverlayTask = () => {
  return (
    <div className="absolute left-1/2 top-1/2 z-10 w-64 -translate-x-1/2 -translate-y-1/2 rotate-3 rounded-lg border-2 border-indigo-600 bg-white p-4 shadow-xl shadow-indigo-600/20">
      <div className="mb-2 flex items-center gap-1.5 text-xs">
        <span className="text-zinc-600">Design Team</span>
        <FiChevronRight />
        <div className="flex items-center gap-1 rounded bg-indigo-100 px-1.5 py-0.5 text-indigo-900">
          <FiAnchor />
          <span>Features</span>
        </div>
      </div>
      <span className="mb-0.5 block text-lg font-medium">
        Launch landing page
      </span>
      <span className="block text-sm text-zinc-600">December 4th, 2023</span>
    </div>
  );
};

const GanttComponent = () => {
  return (
    <div className="relative h-full min-w-96 p-4 pb-0 pt-0">
      <div className="grid h-full grid-cols-5">
        <span className="block h-full w-full pt-4 text-center text-sm">
          Sat
        </span>
        <span className="block h-full w-full bg-zinc-100 pt-4 text-center text-sm">
          Sun
        </span>
        <span className="block h-full w-full pt-4 text-center text-sm">
          Mon
        </span>
        <span className="block h-full w-full bg-zinc-100 pt-4 text-center text-sm">
          Tue
        </span>
        <span className="block h-full w-full pt-4 text-center text-sm">
          Wed
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-10 space-y-4 p-4">
        <div className="h-4 w-2/5 rounded-full bg-purple-500" />
        <div className="ml-[20%] h-4 w-3/5 rounded-full bg-blue-500" />
        <div className="flex w-full">
          <div className="h-4 w-3/5 rounded-full bg-green-500" />
          <div className="h-4 w-1/5 rounded-full bg-blue-500" />
        </div>
        <div className="ml-[60%] h-4 w-2/5 rounded-full bg-amber-500" />
        <div className="h-4 w-1/5 rounded-full bg-pink-500" />
        <div className="flex w-full">
          <div className="ml-[60%] h-4 w-1/5 rounded-full bg-purple-500" />
          <div className="h-4 w-1/5 rounded-full bg-pink-500" />
        </div>
        <div className="ml-[60%] h-4 w-2/5 rounded-full bg-green-500" />
        <div className="ml-[20%] h-4 w-3/5 rounded-full bg-amber-500" />
        <div className="flex w-full">
          <div className="h-4 w-2/5 rounded-full bg-red-500" />
          <div className="ml-[20%] h-4 w-1/5 rounded-full bg-red-500" />
        </div>
      </div>

      <div className="absolute bottom-0 left-1/3 top-0 w-0.5 bg-indigo-600">
        <span className="absolute left-0 top-0 -translate-x-1/2 rounded-b bg-indigo-500 px-1.5 pb-0.5 text-xs font-medium text-white">
          Now
        </span>
      </div>
    </div>
  );
};

const DocumentationComponent = () => {
  return (
    <div className="relative p-4">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="block w-fit rounded bg-zinc-200 p-2">
          <FiEye />
        </span>
        <span className="block w-fit rounded bg-zinc-200 p-2">
          <FiEdit />
        </span>
        <span className="block w-fit rounded bg-zinc-200 p-2">
          <FiAlignLeft />
        </span>
        <span className="block w-fit rounded bg-zinc-200 p-2">
          <FiItalic />
        </span>
      </div>
      <div className="mb-4 flex items-center gap-1.5">
        <span className="block w-fit rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-900">
          John Smith
        </span>
        <span className="block w-fit rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-900">
          Beth Davis
        </span>
      </div>
      <span className="relative mb-1.5 inline-block text-lg font-medium">
        AWS Migration Technical Proposal
        <span className="inline-block scale-150 animate-pulse text-green-600">
          |
        </span>
        <BsFillCursorFill className="inline-block translate-y-full -rotate-90 text-3xl text-green-600" />
      </span>
      <br />
      <span className="relative text-xs text-zinc-600 sm:text-sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta hic quo
        a officiis. Mollitia architecto sed debitis laboriosam repudiandae
        veniam quidem nesciunt beatae quis. Esse placeat quasi inventore
        blanditiis laboriosam?{" "}
        <span className="inline-block scale-150 animate-pulse text-blue-600">
          |
        </span>
        <BsFillCursorFill className="inline-block translate-y-full -rotate-90 text-3xl text-blue-600" />
      </span>
    </div>
  );
};

export const data = [
  {
    id: 1,
    title: "A2SC Protocol",
    svgUrl: "https://api.dicebear.com/8.x/shapes/svg?seed=A2SC",
    cardTitle: "Agent to Smart Contract (A2SC) Protocol",
    cardSubtitle:
      "The A2SC protocol forms enables seamless communication between AI agents and on-chain smart contracts.With A2SC, your agent gains the ability to execute contract functions, just as your current application does through its interface.",
  },
  {
    id: 2,
    title: "Security Fence",
    svgUrl: "https://api.dicebear.com/8.x/shapes/svg?seed=SecurityFence",
    cardTitle: "Security Fence",
    cardSubtitle:
      "Agent unpredictability presents unique security challenges for on-chain interactions. The Security Fence ensures your agent operates within carefully defined parameters, preventing unexpected or unauthorized contract calls.",
  },
  {
    id: 3,
    title: "Agent Campabilities",
    svgUrl: "https://api.dicebear.com/8.x/shapes/svg?seed=Gantt",
    cardTitle: "Agent Campabilities",
    cardSubtitle:
      "Nuwa agents extend beyond basic smart contract interactions through: MCP (Model Context Protocol) and A2A (Agent to Agent) Protcol. These capabilities allow you to continuously enhance your product's features and create increasingly sophisticated user experiences.",
  },
  {
    id: 4,
    title: "Documentation",
    svgUrl: "https://api.dicebear.com/8.x/shapes/svg?seed=Documentation",
    cardTitle: "Title for Documentation feature",
    cardSubtitle:
      "Explain what the Documentation feature and why it's different or better than your competitors.",
  },
];
