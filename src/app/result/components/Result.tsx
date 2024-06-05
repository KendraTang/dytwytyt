'use client';
import React, { Fragment } from 'react';
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

const NERVOUS_THRESHOLDS = {
  0: {
    title: '沒有緊張關係',
    description: '在我們提出的問題中，你的觀念完全一致。'
  },
  2: {
    title: '1、2個緊張關係',
    description: '你的思想就算不是完全一致，至少也非常接近了。'
  },
  5: {
    title: '3－5個緊張關係',
    description: '你和大多數人一樣，各種觀念之間存在不少矛盾與衝突。'
  },
  other: {
    title: '6個以上緊張關係',
    description: '若不是思想極度細膩，就是一大團矛盾的綜合體！'
  }
}

const Summary: React.FC<{ results: ContradictionResult[] }> = ({ results }) => {
  const nervousCount = results.filter((result) => result.nervous).length;
  const { title, description } = Object.entries(NERVOUS_THRESHOLDS).find((item) => {
    const threshold = parseInt(item[0]);
    return threshold >= nervousCount
  })?.[1] ?? NERVOUS_THRESHOLDS.other

  return (
    <div className="mt-8 mb-3 mx-5">
      <div className="flex flex-col gap-3 items-center py-5 px-6 text-center
   border border-gray-400 outline outline-2 outline-offset-4 outline-gray-400 mb-4">
        <span className="text-2xl">{title}</span>
        {description}
      </div>
      <div className="text-xs text-muted-foreground">各種分數所代表的意義：
        <ul className="list-disc pl-8">
          {Object.values(NERVOUS_THRESHOLDS).map(({ title, description }) => (
            <li key={title}>{title}：{description}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const ContradictionList: React.FC<{ items: ContradictionResult[] }> = ({ items }) => {
  return (
    <ul className="grid grid-cols-[28px_1fr] gap-4 text-base">
      {items.map(({ id, contradiction }, i) => {
        return (
          <Fragment key={id}>
            <li key={id} className="contents">
              <div>T{id}</div>
              <div className="grid grid-cols-subgrid gap-2">
                {contradiction.map(({ questionId, answer }) => {
                  return (
                    <div key={questionId}>
                      <div>Q{questionId}: {answer ? '同意' : '不同意'}</div>
                      <div>{QUESTIONS_MAP.get(questionId)}</div>
                    </div>
                  )
                })}
              </div>
            </li>
            {i !== items.length - 1 && <hr className="col-span-2" />}
          </Fragment>
        )
      })}
    </ul>
  )
}

const Details: React.FC<{ result: ContradictionResult[] }> = ({ result }) => {
  const { failed, passed } = result.reduce((acc, set) => {
    if (set.nervous) {
      acc.failed.push(set);
    } else {
      acc.passed.push(set);
    }
    return acc;
  }, { failed: [] as ContradictionResult[], passed: [] as ContradictionResult[] })
  const foldItems = [
    {
      title: '您思想中的緊張關係',
      key: 'failed',
      items: failed
    },
    {
      title: '其他',
      key: 'passed',
      items: passed
    }
  ].filter(({ items }) => items.length > 0)

  return (
    <Accordion type="multiple" className="px-4" defaultValue={foldItems.map(x => x.key)}>
      {foldItems.map(({ title, key, items }) => (
        <AccordionItem value={key} key={key}>
          <AccordionTrigger className="text-base">
            {foldItems.length === 1 ? '緊張關係組合' : title}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3">
            <ContradictionList items={items} />
          </AccordionContent>
        </AccordionItem>
      ))}
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
      <Details result={contradictionResults} />
      <div className="px-4 text-base flex flex-col gap-4 my-8">
        <p>
          每一項「緊張關係」可能代表兩種意義：兩種信念相互矛盾；或者要有非常細膩繁複的思辨，兩種信念才能並存而不致矛盾。在此，檢查的目的，並不是為了確認信念的對或錯，而是了解我們的信念可能有哪些互不相容之處。
        </p>
        <p>
          詳細說明請見書中 P.20 分析。
        </p>
        <div className="flex flex-col gap-2">
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
    </div>
  )
};

export default Result;
