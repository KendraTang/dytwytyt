'use client';
import React from 'react';
import { Answer } from '../types';
import Header from './Header';
import { useRouter } from 'next/navigation';

export type Props = {
  answers: Partial<Answer>;
}
const Result: React.FC<Props> = ({ answers }) => {
  const router = useRouter();
  return (
    <div>
      <Header
        onBack={() => router.back()}
        title="檢查結果"
      />
      <pre>
        {JSON.stringify(answers, null, 2)}
      </pre>
    </div>
  )
};

export default Result;
