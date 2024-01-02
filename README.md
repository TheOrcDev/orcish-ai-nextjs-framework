This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

`cp .env.example .env`

Fill out .env with your credentials

```bash
GPT_API_KEY=your api key
GPT_MODEL=gpt-4
GPT_TEMPERATURE=0.8
GPT_MAX_TOKENS=2048
OPENAI_ORGANIZATION=your open ai organization
```

Just insert your prompt on line `8` in `GptCompletion` component. 

On index page just insert your subject inside an input, and click `Get Result`
