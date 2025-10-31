# Twitter-Based Candidate Analysis Platform

A comprehensive background check tool for companies to analyze potential candidates using their Twitter/X social media presence. This platform leverages advanced NLP techniques and AI to provide insights into candidate interests, personality traits, and cultural fit.

## 🚀 Features

### Core Analysis
- **Real Twitter API Integration**: Fetches actual tweets from Twitter/X profiles
- **Advanced NLP Processing**: Uses multiple NLP libraries for comprehensive analysis
- **Google Gemini AI Integration**: Leverages Google's AI for deep insights and topic extraction
- **Sentiment Analysis**: Analyzes emotional tone and positivity/negativity
- **Ideology Spectrum**: Assesses progressive vs conservative leanings
- **Personality Profiling**: Identifies key personality traits and characteristics

### Enhanced Insights
- **Interest Area Analysis**: Categorizes candidate interests (Technology, Leadership, Social Impact, etc.)
- **Topic Modeling**: Extracts key conversation topics with confidence scores
- **Risk Assessment**: Identifies potential red flags and concerning patterns
- **Cultural Fit Analysis**: Evaluates alignment with company values
- **Hirability Scoring**: Provides overall assessment score (0-100%)

### Interview Support
- **AI-Generated Questions**: Creates personalized interview questions based on analysis
- **Question Categorization**: Organizes questions by type (Technical, Cultural Fit, etc.)
- **Candidate-Specific Insights**: Tailored questions addressing specific interests and concerns

## 🛠️ Technology Stack

### Backend
- **Next.js 15**: React framework with API routes
- **TypeScript**: Type-safe development
- **Twitter API v2**: Real-time tweet fetching
- **Google Gemini AI**: Advanced language processing
- **Natural Language Processing**: Multiple NLP libraries

### Frontend
- **React 19**: Modern UI components
- **Tailwind CSS**: Utility-first styling
- **Radix UI**: Accessible component primitives
- **Recharts**: Data visualization
- **Lucide React**: Icon library

### NLP Libraries
- **Natural**: Natural language processing
- **Sentiment**: Sentiment analysis
- **Compromise**: Text processing
- **Node-NLP**: Advanced NLP features

## 📋 Prerequisites

Before running this project, you'll need:

1. **Twitter Developer Account**: Get API keys from [Twitter Developer Portal](https://developer.twitter.com/)
2. **Google Cloud Account**: Get Gemini API key from [Google AI Studio](https://makersuite.google.com/)
3. **Node.js 18+**: JavaScript runtime
- **pnpm**: Package manager (recommended)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nlp-project
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your API keys in `.env.local`:
   ```env
   # Twitter API Configuration
   TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here
   TWITTER_API_KEY=your_twitter_api_key_here
   TWITTER_API_SECRET=your_twitter_api_secret_here
   TWITTER_ACCESS_TOKEN=your_twitter_access_token_here
   TWITTER_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret_here

   # Google Gemini API Configuration
   GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key_here

   # Application Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 API Keys Setup

### Twitter API Setup
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app or use existing one
3. Generate API keys and access tokens
4. Ensure your app has read permissions for user tweets

### Google Gemini API Setup
1. Go to [Google AI Studio](https://makersuite.google.com/)
2. Create a new API key
3. Copy the key to your `.env.local` file

## 📊 How It Works

### 1. Tweet Extraction
- Extracts Twitter handle from provided URL
- Fetches recent tweets using Twitter API v2
- Handles rate limiting and error cases gracefully

### 2. NLP Analysis
- **Sentiment Analysis**: Uses multiple methods to assess emotional tone
- **Topic Extraction**: Identifies key themes and conversation topics
- **Interest Categorization**: Maps content to professional interest areas
- **Personality Profiling**: Analyzes language patterns for personality traits

### 3. AI Enhancement
- **Google Gemini Integration**: Provides deep insights and context
- **Cultural Fit Assessment**: Evaluates alignment with company values
- **Risk Factor Detection**: Identifies potential concerns
- **Professional Insights**: Extracts expertise areas and skills

### 4. Interview Question Generation
- **Personalized Questions**: Tailored to candidate's specific profile
- **Category Organization**: Questions grouped by type and purpose
- **Context-Aware**: Addresses specific interests and potential concerns

## 🎯 Use Cases

### For HR Professionals
- **Background Screening**: Comprehensive social media analysis
- **Cultural Fit Assessment**: Evaluate alignment with company values
- **Interview Preparation**: Generate targeted questions
- **Risk Mitigation**: Identify potential red flags early

### For Recruiters
- **Candidate Profiling**: Understand interests and expertise areas
- **Skill Assessment**: Identify technical and soft skills
- **Personality Insights**: Assess communication style and traits
- **Decision Support**: Data-driven hiring recommendations

## 📈 Analysis Features

### Sentiment Analysis
- Positive, neutral, and negative sentiment percentages
- Emotional tone assessment
- Mood pattern recognition

### Ideology Spectrum
- Progressive vs conservative leanings
- Political and social stance analysis
- Value alignment assessment

### Interest Areas
- Technology & Innovation
- Leadership & Management
- Learning & Development
- Social Impact
- Business & Finance
- Health & Wellness
- Creative & Arts

### Personality Traits
- Analytical thinking
- Collaborative nature
- Innovation mindset
- Communication style
- Ambition level
- Empathy indicators
- Detail orientation
- Adaptability

## 🔒 Privacy & Ethics

### Data Handling
- Only analyzes publicly available tweets
- No data storage or retention
- Respects Twitter's terms of service
- Complies with privacy regulations

### Ethical Considerations
- Transparent analysis methodology
- Bias-aware algorithms
- Fair assessment criteria
- Respectful of candidate privacy

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **AWS**: EC2 or Lambda deployment

## 📝 API Endpoints

### `/api/analyze`
- **Method**: POST
- **Body**: `{ "url": "twitter_url" }`
- **Response**: Complete analysis data

### `/api/analyze-custom`
- **Method**: POST
- **Body**: `{ "username": "handle", "tweets": ["tweet1", "tweet2"] }`
- **Response**: Analysis for custom tweets

### `/api/generate-questions`
- **Method**: POST
- **Body**: `{ "analysisData": {...}, "username": "handle" }`
- **Response**: Generated interview questions

## 🛠️ Development

### Project Structure
```
├── app/
│   ├── api/                 # API routes
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── analysis-form.tsx   # Analysis input form
│   ├── analysis-results.tsx # Results display
│   └── ...                 # Other components
├── lib/
│   ├── nlp-service.ts      # Core NLP functionality
│   └── utils.ts            # Utility functions
└── ...
```

### Adding New Features
1. Create new API routes in `app/api/`
2. Add UI components in `components/`
3. Extend NLP service in `lib/nlp-service.ts`
4. Update types and interfaces as needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API documentation

## 🔮 Future Enhancements

- **Multi-platform Support**: LinkedIn, GitHub analysis
- **Advanced Analytics**: Trend analysis over time
- **Team Analysis**: Compare multiple candidates
- **Integration APIs**: Connect with ATS systems
- **Custom Models**: Train specialized analysis models
- **Real-time Updates**: Live monitoring capabilities

---

**Note**: This tool is designed for professional use in hiring contexts. Always ensure compliance with local employment laws and regulations when using social media data for hiring decisions.
