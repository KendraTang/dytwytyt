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
  const [edited, setEdited] = React.useState(false);
  const router = useRouter()

  const handleAnswer = (questionId: number, answer: boolean) => {
    setEdited(true)
    setAnswers((prev) => {
      const newAnswer = prev[questionId] === answer ? undefined : answer;
      return ({ ...prev, [questionId]: newAnswer })
    });
  };

  const handleSubmit = () => {
    if (edited) {
      window.gtag?.('event', 'submit_answers', Object.fromEntries(Object.entries(answers).map(([questionId, answer]) => [`q${questionId}`, answer])));
    }
    router.push('/result');
  }


  return <Questions onSubmit={() => handleSubmit()}
    answers={answers}
    onAnswer={handleAnswer}
    reset={() => setAnswers({})}
  />;
};

export default ClientPage;
