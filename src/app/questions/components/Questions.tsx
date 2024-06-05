'use client';

import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';
import { CircleIcon, Cross1Icon, ReloadIcon } from '@radix-ui/react-icons';
import { cva } from 'class-variance-authority';
import React from 'react';
import { QUESTIONS } from '../../constants';
import { Answer } from '../../types';
import Header from '../../../components/Header';
import { useRouter } from 'next/navigation';

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
  answers: Partial<Answer>;
  reset: () => void;
  onAnswer: (questionId: number, answer: boolean) => void;
  onSubmit: () => void;
}
const Questions: React.FC<Props> = ({ answers, reset, onSubmit, onAnswer }) => {
  const answerCount = Object.values(answers).filter(x => x !== undefined).length;
  const router = useRouter();

  return (
    <>
      <Header
        title="哲學健康檢查"
        onBack={() => router.back()}
        onTitleClick={() => {
          if (process.env.NODE_ENV === 'development') {
            Array.from({ length: QUESTIONS.length }, () => Math.random() > 0.5)
              .forEach((answer, i) => onAnswer(i + 1, answer));
          }
        }}
        right={
          answerCount > 0 &&
          <Button
            variant="ghost"
            size="icon"
            onClick={reset}
          >
            <ReloadIcon />
          </Button>
        }
      />
      <div className="sticky -mx-4 inset-0 bottom-auto bg-white shadow-[0_0_15px_10px_#fff]">
        <Progress
          className="rounded-none"
          color="#ec4899"
          value={answerCount * 100 / QUESTIONS.length} />
      </div>
      <ul className="flex flex-col pb-10">
        {QUESTIONS.map((question) => (
          <li key={question.id} className="flex gap-3 py-5 border-b border-b-gray-200 items-center">
            <div className="flex">
              <Button variant="ghost"
                size="sm"
                onClick={() => onAnswer(question.id, true)}
                className={cn(
                  buttonVariants({ kind: 'left', active: answers[question.id] ? true : null }),
                )}><CircleIcon /></Button>
              <Button variant="ghost"
                size="sm"
                onClick={() => onAnswer(question.id, false)}
                className={cn(
                  buttonVariants({ kind: 'right', active: answers[question.id] === false ? false : null }),
                )}
              ><Cross1Icon /></Button>
            </div>
            {question.id.toString().padStart(2, '0')}. {question.question}
          </li>
        ))}
      </ul>
      <div className="py-5 -mx-4 sticky inset-0 top-auto bg-white px-4 border-t border-t-gray-400">
        <Button
          className="w-full"
          size="lg"
          onClick={() => onSubmit()}
          disabled={answerCount !== QUESTIONS.length}>
          {answerCount === QUESTIONS.length ? '看結果' : `已回答 ${answerCount} / ${QUESTIONS.length} 題`}
        </Button>
      </div>
    </>
  )
};

export default Questions;
