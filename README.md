# Quiz Maker SPA

Quiz Maker SPA is a modern, single-page application for creating, managing, and taking quizzes. Built with React, TypeScript, and Vite, it provides a user-friendly interface for both quiz creators and participants. The app supports authentication, question bank management, quiz generation, scoring, and internationalization.

## Features

- **User Authentication**: Sign in with Google to access personalized features.
- **Question Bank Management**: Create, edit, and manage question banks for quizzes.
- **Quiz Generation**: Generate quizzes dynamically from question banks.
- **Quiz Participation**: Take quizzes, answer questions, and receive instant feedback.
- **Score Tracking**: Scores are calculated and stored for each quiz attempt.
- **Internationalization (i18n)**: Supports multiple languages (e.g., English, Spanish).
- **Responsive UI**: Clean, modern, and mobile-friendly interface.


## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
  ```sh
  git clone https://github.com/mariamoraan/quiz-maker-spa.git
  cd quiz-maker-spa
  ```
2. **Install dependencies:**
  ```sh
  npm install
  # or
  yarn install
  ```
3. **Configure Firebase:**
  - Update the Firebase configuration in `src/core/firebase/index.ts` with your project credentials.

4. **Run the development server:**
  ```sh
  npm run dev
  # or
  yarn dev
  ```
  The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Build for Production

```sh
npm run build
# or
yarn build
```

### Linting

```sh
npm run lint
# or
yarn lint
```

## License

This project is licensed under the MIT License.
