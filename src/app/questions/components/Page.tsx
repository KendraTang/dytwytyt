'use client';
import React from 'react';
import Questions from './Questions';
import { Answer } from '../types';
import Result from './Result';

export type Props = {
}
const ClientPage: React.FC<Props> = () => {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Partial<Answer>>({});

  const handleAnswer = (questionId: number, answer: boolean) => {
    setAnswers((prev) => {
      const newAnswer = prev[questionId] === answer ? undefined : answer;
      return ({ ...prev, [questionId]: newAnswer })
    });
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  }

  if (step === 0) {
    return <Questions onSubmit={handleNext}
      answers={answers}
      onAnswer={handleAnswer}
    />;
  }
  return <Result answers={answers} />
};

export default ClientPage;
