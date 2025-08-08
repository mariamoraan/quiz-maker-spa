import { createContext, useContext, useEffect, useState } from "react";
import type { QuestionBank, QuestionBanksList } from "../domain/question-bank";
import { getAllQuestionBanks } from "../services/get-all-question-banks";
import { useAuth } from "@/features/auth/context/auth.context";

type QuestionBanksContextType = {
  questionBanks: QuestionBanksList;
  setQuestionBanks: (questionBanks: QuestionBanksList) => void;
  isLoading: boolean;
};

const QuestionBanksContext = createContext<QuestionBanksContextType>({
  questionBanks: [],
  setQuestionBanks: () => {},
  isLoading: false,
});

export const QuestionBanksProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [questionBanks, setQuestionBanks] = useState<QuestionBanksList>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setup = async (userId: string) => {
      setIsLoading(true);
      const res = await getAllQuestionBanks({ userId });
      setQuestionBanks(res);
      setIsLoading(false);
    };
    if (!user) return;
    setup(user.uid);
  }, [user]);

  return (
    <QuestionBanksContext.Provider
      value={{ questionBanks, setQuestionBanks, isLoading }}
    >
      {children}
    </QuestionBanksContext.Provider>
  );
};

export const useQuestionBanks = () => useContext(QuestionBanksContext);
