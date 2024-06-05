'use client'

import { Button } from '@/components/ui/button';
import { StorageKey, useLocalStorage } from '@/utils/useLocalStorage';
import Link from 'next/link';
import React from 'react';
import { QUESTIONS } from '../constants';
import { Answer } from '../types';

export type Props = {
}
const SkipButton: React.FC<Props> = () => {
  const [answers] = useLocalStorage<Partial<Answer>>(StorageKey.ANSWERS, {});

  if (Object.values(answers).filter(x => x !== undefined).length !== QUESTIONS.length) {
    return null;
  }

  return (
    <Button variant={"outline"} asChild className="font-normal">
      <Link href="/result">
        查看上次結果
      </Link>
    </Button>
  )
};

export default SkipButton;
