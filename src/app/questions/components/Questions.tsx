'use client';

import React from 'react';
import { Answer } from '../types';
import { QUESTIONS } from '../constants';
import { Button } from '@/components/ui/button';
import { CircleIcon, Cross1Icon, CrossCircledIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

export type Props = {
}
const Questions: React.FC<Props> = () => {
  const [answers, setAnswers] = React.useState<Partial<Answer>>({});

  const handleAnswer = (questionId: number, answer: boolean) => {
    setAnswers((prev) => {
      const newAnswer = prev[questionId] === answer ? undefined : answer;
      return ({ ...prev, [questionId]: newAnswer })
    });
  };

  return (
    <div>
      <h1>Questions</h1>
      <ul className="flex flex-col">
        {QUESTIONS.map((question) => (
          <li key={question.id} className="flex gap-3 py-5 border-b border-b-gray-200 items-center">
            <div className="flex">
              <Button variant="ghost"
                size="sm"
                onClick={() => handleAnswer(question.id, true)}
                className={cn('rounded-r-none border border-gray-300', {
                  'bg-green-200 hover:bg-green-300': answers[question.id] === true,
                })}><CircleIcon /></Button>
              <Button variant="ghost"
                size="sm"
                onClick={() => handleAnswer(question.id, false)}
                className={cn('border border-gray-300 rounded-l-none border-l-0', {
                  'bg-rose-200 hover:bg-rose-300': answers[question.id] === false,
                })}
              ><Cross1Icon /></Button>
            </div>
            {question.question}
          </li>
        ))}
      </ul>

      <pre>{JSON.stringify(answers, null, 2)}</pre>
    </div>
  )
};

export default Questions;
