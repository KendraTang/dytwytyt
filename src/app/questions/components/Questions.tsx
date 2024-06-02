'use client';

import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';
import { CircleIcon, Cross1Icon } from '@radix-ui/react-icons';
import { cva } from 'class-variance-authority';
import React from 'react';
import { QUESTIONS } from '../constants';
import { Answer } from '../types';

const buttonVariants = cva(
  'border rounded-sm border-gray-300',
  {
    variants: {
      kind: {
        'left': 'rounded-r-none',
        'right': 'rounded-l-none border-l-0',
      },
      active: {
        'true': 'bg-[#ffe655] hover:bg-[#ffe655]',
        'false': 'bg-[#ffa3c7] hover:bg-[#ffa3c7]',
      },
    },
  }
)

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

  const answerCount = Object.values(answers).filter(x => x !== undefined).length;

  return (
    <div>
      <div className="fixed inset-0 bottom-auto bg-white shadow-[0_0_15px_10px_#fff]">
        <Progress
          className="rounded-none"
          color="#ec4899"
          value={answerCount * 100 / QUESTIONS.length} />
      </div>
      <h1 className="text-2xl text-center border-b-2 border-b-style-double py-2">哲學健康檢查</h1>
      <ul className="flex flex-col pb-20">
        {QUESTIONS.map((question) => (
          <li key={question.id} className="flex gap-3 py-5 border-b border-b-gray-200 items-center">
            <div className="flex">
              <Button variant="ghost"
                size="sm"
                onClick={() => handleAnswer(question.id, true)}
                className={cn(
                  buttonVariants({ kind: 'left', active: answers[question.id] ? true : null }),
                )}><CircleIcon /></Button>
              <Button variant="ghost"
                size="sm"
                onClick={() => handleAnswer(question.id, false)}
                className={cn(
                  buttonVariants({ kind: 'right', active: answers[question.id] === false ? false : null }),
                )}
              ><Cross1Icon /></Button>
            </div>
            {question.id.toString().padStart(2, '0')}. {question.question}
          </li>
        ))}
      </ul>
      <div className="py-5 fixed inset-0 bg-white top-auto px-4 border-t border-t-gray-400">
        <Button
          className="w-full"
          size="lg"
          disabled={answerCount !== QUESTIONS.length}>
          {answerCount === QUESTIONS.length ? '看結果' : `已回答 ${answerCount} / ${QUESTIONS.length} 題`}
        </Button>
      </div>
    </div>
  )
};

export default Questions;
