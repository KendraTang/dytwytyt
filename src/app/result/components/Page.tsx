'use client';

import { QUESTIONS } from '@/app/constants';
import { StorageKey, useLocalStorage } from '@/utils/useLocalStorage';
import { redirect } from 'next/navigation';
import React from 'react';
import { Answer } from '../../types';
import Result from './Result';

export type Props = {
}
const ClientPage: React.FC<Props> = () => {
  const [answers] = useLocalStorage<Partial<Answer>>(StorageKey.ANSWERS, {});

  if (Object.values(answers).filter(x => x !== undefined).length < QUESTIONS.length) {
    redirect('/')
  }

  return <Result answers={answers as Answer} />
};

export default ClientPage;
