'use client';
import React from 'react';
import { Answer, ContradictionResult } from '../../types';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { CONTRADICTIONS, QUESTIONS_MAP, WHERE_TO_BUY } from '@/app/constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const getContradictionResults = (answers: Answer): ContradictionResult[] => {
  const result = CONTRADICTIONS.map((contradiction) => {
    const [q1, q2] = contradiction.contradiction;
    const a1 = answers[q1.questionId];
    const a2 = answers[q2.questionId];
    return {
      id: contradiction.id,
      contradiction: [q1, q2],
      nervous: a1 === q1.answer && a2 === q2.answer,
    } as ContradictionResult;
  })
  return result;
}

const Summary: React.FC<{ results: ContradictionResult[] }> = ({ results }) => {
  const nervousCount = results.filter((result) => result.nervous).length;
  const { title, description } = (() => {
    if (nervousCount === 0) {
      return {
        title: '沒有緊張關係',
        description: '在我們提出的問題中，你的觀念完全一致。'
      }
    }
    if (nervousCount <= 2) {
      return {
        title: '1、2個緊張關係',
        description: '你的思想就算不是完全一致，至少也非常接近了。'
      }
    }
    if (nervousCount <= 5) {
      return {
        title: '3－5個緊張關係',
        description: '你和大多數人一樣，各種觀念之間存在不少矛盾與衝突。'
      }
    }
    return {
      title: '6個以上緊張關係',
      description: '若不是思想極度細膩，就是一大團矛盾的綜合體！'
    }
  })()

  return (
    <div className="flex flex-col gap-3 items-center my-8 m-5 py-5 px-6 text-center
   border border-gray-400 outline outline-2 outline-offset-4 outline-gray-400 ">
      <span className="text-2xl">{title}</span>
      {description}
    </div>
  )
}

const Details: React.FC<{ result: ContradictionResult[] }> = ({ result }) => {
  return (
    <Accordion type="single" collapsible className="px-4">
      {result.map(({ id, contradiction, nervous }) => {
        return (
          <AccordionItem
            key={id}
            value={id.toString()}>
            <AccordionTrigger>T{id}
              {nervous && ' (矛盾)'}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-3">
              {contradiction.map(({ questionId, answer }) => {
                return (
                  <div key={questionId}>
                    <div>Q{questionId}: {answer ? '同意' : '不同意'}</div>
                    <div>{QUESTIONS_MAP.get(questionId)}</div>
                  </div>
                )
              })}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export type Props = {
  answers: Answer;
}
const Result: React.FC<Props> = ({ answers }) => {
  const router = useRouter();
  const contradictionResults = getContradictionResults(answers);
  return (
    <div className="pb-10">
      <Header
        onBack={() => router.back()}
        title="檢查結果"
      />
      <Summary results={contradictionResults} />
      <div className="px-4 text-base flex flex-col gap-4 mb-5">
        <p>
          每一項「緊張關係」可能代表兩種意義：兩種信念相互矛盾；或者要有非常細膩繁複的思辨，兩種信念才能並存而不致矛盾。在此，檢查的目的，並不是為了確認信念的對或錯，而是了解我們的信念可能有哪些互不相容之處。
        </p>
        <p>
          詳細說明可參見書中 P.20 分析。
        </p>
        <div>
          購書/試閱可參考：
          <ul className="list-disc ml-10">
            {WHERE_TO_BUY.map(({ channel, url }) => (
              <li key={channel} className="underline">
                <a href={url} target="_blank" rel="noreferrer">{channel}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Details
        result={contradictionResults}
      />
    </div>
  )
};

export default Result;
