export interface Score {
  id: string;
  userId: string;
  bankId: string;
  date: string;
  answers: Record<string, string>;
  score: number;
}
