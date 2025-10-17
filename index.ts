import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatPromptTemplate } from '@langchain/core/prompts';

/**
 * MODEL-AGNOSTIC LANGCHAIN EXAMPLES
 *
 * This project demonstrates how LangChain allows you to write code once
 * and switch between different AI models (OpenAI, Claude, etc.) seamlessly.
 *
 * HOW IT WORKS:
 * 1. All chat models in LangChain extend BaseChatModel
 * 2. They implement the same interface (invoke, stream, etc.)
 * 3. You can swap models by just changing the initialization
 * 4. Your application logic remains the same
 */

// ============================================================================
// MODEL INITIALIZATION (Model-Agnostic Approach)
// ============================================================================

/**
 * Initialize models - both implement the same interface
 */
const models: Record<string, BaseChatModel> = {
  openai: new ChatOpenAI({
    model: 'gpt-4o-mini',
    temperature: 0.7,
  }),
  claude: new ChatAnthropic({
    model: 'claude-haiku-4-5-20251001',
    temperature: 0.7,
  }),
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Run an example with any model
 */
async function runWithModel(
  modelName: string,
  fn: (model: BaseChatModel) => Promise<void>
) {
  const model = models[modelName];
  if (!model) {
    console.error(`Model ${modelName} not found`);
    return;
  }

  console.log(`\n${'='.repeat(80)}`);
  console.log(`Running with: ${modelName.toUpperCase()}`);
  console.log('='.repeat(80));

  try {
    await fn(model);
  } catch (error) {
    console.error(`Error with ${modelName}:`, error);
  }
}

/**
 * Run the same example with all models
 */
async function runWithAllModels(fn: (model: BaseChatModel) => Promise<void>) {
  for (const modelName of Object.keys(models)) {
    await runWithModel(modelName, fn);
  }
}

// ============================================================================
// EXAMPLE 1: SIMPLE MESSAGE INVOCATION
// ============================================================================

async function example1SimpleInvocation(model: BaseChatModel) {
  console.log('\n📝 EXAMPLE 1: Simple Message Invocation\n');

  const messages = [
    new SystemMessage('You are a helpful assistant that provides concise answers.'),
    new HumanMessage('What is the capital of France?'),
  ];

  const response = await model.invoke(messages);
  console.log('Response:', response.content);
}

// ============================================================================
// EXAMPLE 2: USING PROMPT TEMPLATES
// ============================================================================

async function example2PromptTemplates(model: BaseChatModel) {
  console.log('\n📝 EXAMPLE 2: Using Prompt Templates\n');

  // Create a reusable prompt template
  const promptTemplate = ChatPromptTemplate.fromMessages([
    ['system', 'You are a {role} expert. Provide {style} answers.'],
    ['human', '{question}'],
  ]);

  // Format the prompt with variables
  const formattedPrompt = await promptTemplate.formatMessages({
    role: 'JavaScript',
    style: 'clear and practical',
    question: 'How do I use async/await in TypeScript? Keep it under 100 words',
  });

  const response = await model.invoke(formattedPrompt);
  console.log('Response:', response.content);
}

// ============================================================================
// EXAMPLE 3: STREAMING RESPONSES
// ============================================================================

async function example3Streaming(model: BaseChatModel) {
  console.log('\n📝 EXAMPLE 3: Streaming Responses\n');

  const messages = [
    new SystemMessage('You are a creative writing assistant.'),
    new HumanMessage('Write a very short haiku about coding.'),
  ];

  console.log('Streaming response:');
  process.stdout.write('> ');

  const stream = await model.stream(messages);

  for await (const chunk of stream) {
    process.stdout.write(chunk.content as string);
  }

  console.log('\n');
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('\n🚀 LANGCHAIN MODEL-AGNOSTIC EXAMPLES');
  console.log('=====================================\n');
  console.log('This demo shows how the same code works with different models.');
  console.log('We will run 3 examples with both OpenAI and Claude models.\n');

  // Run all examples with all models
  await runWithAllModels(example1SimpleInvocation);
  await runWithAllModels(example2PromptTemplates);
  await runWithAllModels(example3Streaming);

  console.log('\n' + '='.repeat(80));
  console.log('✅ All examples completed!');
  console.log('='.repeat(80) + '\n');

  console.log('💡 KEY TAKEAWAYS:');
  console.log('   1. Same code works with any LangChain-supported model');
  console.log('   2. Switch models by changing initialization only');
  console.log('   3. Use BaseChatModel type for model-agnostic functions');
  console.log('   4. Prompts, chains, and agents work across all models\n');
}

// Run the examples
main().catch(console.error);
