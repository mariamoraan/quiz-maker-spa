export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  FAVORITES: "/favorites",
  STATISTICS: "/statistics",
  SETTINGS: "/settings",
  NEW_QUESTION_BANK: "/question-banks/new",
  QUESTION_BANK: (id: string) => `/question-banks/${id}`,
  EDIT_QUESTION_BANK: (id: string) => `/edit-question-banks/${id}`,
  QUIZ: (id: string) => `/quiz/${id}`,
};
