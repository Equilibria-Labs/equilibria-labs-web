# The Sleep Lab by Equilibria Labs

[Visit The Sleep Lab](https://thesleeplab.app)

## Overview

The Sleep Lab is a comprehensive sleep assessment and improvement platform that helps users understand and enhance their sleep quality using clinically validated methods and personalized recommendations.

## Features

- **Sleep Assessments**: Evidence-based questionnaires including:
  - Insomnia Severity Index (ISI)
  - Pittsburgh Sleep Quality Index (PSQI)
  - Epworth Sleepiness Scale (ESS)

- **Personalized Reports**: Get detailed insights about your sleep patterns and potential issues

- **CBT-i Based Recommendations**: Access proven cognitive behavioral therapy techniques for insomnia

- **Progress Tracking**: Monitor your sleep improvements over time

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Deployment**: Vercel

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/equilibria-labs-web.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

Run the test suite:
```bash
npm test
```

## Contributing

We welcome contributions! Please read our contributing guidelines before submitting pull requests.

## License

This project is proprietary and confidential. All rights reserved.

## About Equilibria Labs

Equilibria Labs is dedicated to improving mental health through evidence-based digital interventions. The Sleep Lab is our flagship product focusing on sleep improvement through cognitive behavioral therapy techniques.

[Visit our website](https://thesleeplab.app) 