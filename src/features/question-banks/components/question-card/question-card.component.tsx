import { useState } from "react";
import { bind } from "@/core/styles/bind";
import styles from "./question-card.module.scss";
import type { Question } from "../../domain/question";
import { Button } from "@/core/components/button/button.component";
import { CheckIcon, TriangleIcon } from "@/core/icons";
const cn = bind(styles);

interface Props {
  question: Question;
}

export const QuestionCard = (props: Props) => {
  const { question } = props;
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const toggleAnswerVisibility = () => {
    setIsAnswerVisible((prev) => !prev);
  };

  return (
    <div className={cn("question-card")}>
      <p className={cn("question-card__question")}>
        <Button
          color="none"
          label={
            <TriangleIcon
              size={16}
              className={cn("question-card__question__icon", {
                "question-card__question__icon--active": isAnswerVisible,
              })}
            />
          }
          onClick={toggleAnswerVisibility}
        />
        {question.text}
      </p>
      {isAnswerVisible ? (
        <p className={cn("question-card__answer")}>
          <CheckIcon color="var(--color-success)" />
          {question.options
            .filter((option) => option.isCorrect)
            .map((option) => option.text)
            .join(", ")}
        </p>
      ) : null}
    </div>
  );
};
