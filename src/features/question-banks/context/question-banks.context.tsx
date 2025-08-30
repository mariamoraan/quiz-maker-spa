import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { QuestionBanksList } from "../domain/question-bank";
import { getAllQuestionBanks } from "../services/get-all-question-banks";
import { useAuth } from "@/features/auth/context/auth.context";

type QuestionBanksContextType = {
  questionBanks: QuestionBanksList;
  setQuestionBanks: Dispatch<SetStateAction<QuestionBanksList>>;
  favorites: QuestionBanksList;
  isLoading: boolean;
};

const QuestionBanksContext = createContext<QuestionBanksContextType>({
  questionBanks: [],
  favorites: [],
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
  const [isLoading, setIsLoading] = useState(false);
  const favorites = questionBanks.filter((bank) => bank?.isFavorite) ?? [] ;

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
      value={{ questionBanks, setQuestionBanks, isLoading, favorites }}
    >
      {children}
    </QuestionBanksContext.Provider>
  );
};

export const useQuestionBanks = () => useContext(QuestionBanksContext);
