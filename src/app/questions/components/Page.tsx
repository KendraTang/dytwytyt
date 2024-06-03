'use client';

import { StorageKey, useLocalStorage } from '@/utils/useLocalStorage';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Answer } from '../../types';
import Questions from './Questions';

export type Props = {
}
const ClientPage: React.FC<Props> = () => {
  const [answers, setAnswers] = useLocalStorage<Partial<Answer>>(StorageKey.ANSWERS, {});
  const router = useRouter()

  const handleAnswer = (questionId: number, answer: boolean) => {
    setAnswers((prev) => {
      const newAnswer = prev[questionId] === answer ? undefined : answer;
      return ({ ...prev, [questionId]: newAnswer })
    });
  };


  return <Questions onSubmit={() => router.push('/result')}
    answers={answers}
    onAnswer={handleAnswer}
    reset={() => setAnswers({})}
  />;
};

export default ClientPage;
