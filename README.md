# Field Builder Frontend
A minimal React boilerplate with TypeScript, Tailwind CSS, and Apollo GraphQL.

## Features
- ⚡️ [Vite](https://vitejs.dev/) - Fast build tool
- ⚛️ [React 18](https://reactjs.org/) - UI library
- 🔷 [TypeScript](https://www.typescriptlang.org/) - Type safety
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- 🚀 [Apollo GraphQL](https://www.apollographql.com/) - GraphQL client

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=http://localhost:3332/graphql
```

**Note**: The `VITE_API_URL` should point to your Field Builder API Gateway endpoint. Make sure the API is running before starting the frontend development server.

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:5173`
