#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Twitter-Based Candidate Analysis Platform...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  const envContent = `# Twitter API Configuration
TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here
TWITTER_API_KEY=your_twitter_api_key_here
TWITTER_API_SECRET=your_twitter_api_secret_here
TWITTER_ACCESS_TOKEN=your_twitter_access_token_here
TWITTER_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret_here

# Google Gemini API Configuration
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key_here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created');
} else {
  console.log('✅ .env.local file already exists');
}

console.log('\n📋 Next steps:');
console.log('1. Get Twitter API keys from: https://developer.twitter.com/');
console.log('2. Get Google Gemini API key from: https://makersuite.google.com/');
console.log('3. Update the .env.local file with your API keys');
console.log('4. Run: pnpm install');
console.log('5. Run: pnpm dev');
console.log('\n🎉 Setup complete! Happy analyzing!');
