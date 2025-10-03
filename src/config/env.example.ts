// Environment configuration example
// Copy this file to env.ts and add your actual API keys

export const env = {
  // OpenAI API Key for LangChain Theme Generation
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || 'your_openai_api_key_here',
  
  // Vendure API Configuration
  VENDURE_API_URL: import.meta.env.VITE_VENDURE_API_URL || 'http://localhost:3000/shop-api',
  VENDURE_API_TOKEN: import.meta.env.VITE_VENDURE_API_TOKEN || 'your_vendure_token_here',
};

// Validation function
export const validateEnv = () => {
  const missing = [];
  
  if (!env.OPENAI_API_KEY || env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    missing.push('VITE_OPENAI_API_KEY');
  }
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing.join(', '));
    console.warn('Please set these in your .env file or environment');
  }
  
  return missing.length === 0;
};
