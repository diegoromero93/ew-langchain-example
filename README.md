# LangChain Model-Agnostic TypeScript Examples

A demonstration project showing how to build **model-agnostic** applications with LangChain, allowing you to seamlessly switch between different AI models (OpenAI, Claude, etc.) without changing your application code.

## 🎯 What This Project Demonstrates

This project showcases three key examples of model-agnostic LangChain usage:

1. **Simple Message Invocation** - Basic chat interactions
2. **Prompt Templates** - Reusable, parameterized prompts
3. **Streaming Responses** - Real-time token streaming

All examples work identically with both **OpenAI GPT-4** and **Anthropic Claude** models.

## 🏗️ How Model-Agnostic Architecture Works

### The Core Concept

LangChain provides a unified interface through `BaseChatModel` that all chat models implement:

```typescript
import { BaseChatModel } from '@langchain/core/language_models/chat_models';

// Both models implement the same interface
const models: Record<string, BaseChatModel> = {
  openai: new ChatOpenAI({ modelName: 'gpt-4o-mini' }),
  claude: new ChatAnthropic({ modelName: 'claude-3-5-sonnet-20241022' }),
};
```

### Key Benefits

✅ **Write Once, Run Anywhere** - Same code works with any supported model
✅ **Easy Model Switching** - Change models by modifying initialization only
✅ **Consistent Interface** - All models support `.invoke()`, `.stream()`, etc.
✅ **Future-Proof** - Add new models without changing application logic

### Message Flow

```
User Input → LangChain Message → BaseChatModel Interface → Any Model → Response
```

### Prompt Templates

Templates let you create reusable prompts with variables:

```typescript
const promptTemplate = ChatPromptTemplate.fromMessages([
  ['system', 'You are a {role} expert. Provide {style} answers.'],
  ['human', '{question}'],
]);
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- API keys for OpenAI and/or Anthropic

### Installation

1. Clone or download this project

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` and add your API keys:
```env
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### Getting API Keys

- **OpenAI**: Get your API key at [platform.openai.com](https://platform.openai.com/api-keys)
- **Anthropic**: Get your API key at [console.anthropic.com](https://console.anthropic.com/)

## 📦 Running the Examples

### Run all examples with both models:
```bash
pnpm start
```

### Run in watch mode (auto-reload on changes):
```bash
pnpm dev
```

## 📝 The Three Examples Explained

### Example 1: Simple Message Invocation

Shows basic message sending with system and human messages:

```typescript
const messages = [
  new SystemMessage('You are a helpful assistant.'),
  new HumanMessage('What is the capital of France?'),
];

const response = await model.invoke(messages);
```

**Key Concept**: Same message format works with any model.

### Example 2: Prompt Templates

Demonstrates reusable, parameterized prompts:

```typescript
const promptTemplate = ChatPromptTemplate.fromMessages([
  ['system', 'You are a {role} expert.'],
  ['human', '{question}'],
]);

const formattedPrompt = await promptTemplate.formatMessages({
  role: 'JavaScript',
  question: 'How do I use async/await?',
});
```

**Key Concept**: Define once, reuse with different variables and models.

### Example 3: Streaming Responses

Shows real-time token streaming:

```typescript
const stream = await model.stream(messages);

for await (const chunk of stream) {
  process.stdout.write(chunk.content);
}
```

**Key Concept**: Streaming interface is consistent across all models.

## 🔑 Key Takeaways

1. **Model Agnostic = Future Proof**: Write code once, switch models anytime
2. **BaseChatModel Interface**: The secret to portability across providers
3. **Unified Methods**: `.invoke()`, `.stream()`, `.batch()` work everywhere
4. **Prompt Templates**: Reusable prompts work with any model
5. **Easy Testing**: Test your app with different models effortlessly

## 🏗️ Project Structure

```
ew-langchain/
├── index.ts           # Main examples file
├── package.json       # Dependencies and scripts
├── .env.example       # Environment variables template
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## 🛠️ Technologies Used

- **LangChain** - AI application framework
- **@langchain/openai** - OpenAI integration
- **@langchain/anthropic** - Anthropic Claude integration
- **TypeScript** - Type-safe JavaScript
- **tsx** - TypeScript executor (run without building)
- **dotenv** - Environment variable management

## 🎓 Learning Resources

- [LangChain JS Documentation](https://js.langchain.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic Claude Documentation](https://docs.anthropic.com/)

## 💡 Next Steps

Want to extend this project? Try:

- Add more models (Gemini, Mistral, etc.)
- Implement chains and agents
- Add memory/conversation history
- Create custom tools
- Build a RAG (Retrieval-Augmented Generation) system
- Add vector stores for semantic search

## 📄 License

ISC

---

**Built with ❤️ using LangChain and TypeScript**
