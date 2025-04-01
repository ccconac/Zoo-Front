'use client';
import { Tab } from '@/components';
import { useSessionStore } from '@/store/common/useSessionStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { selectedInsightDate } from '@/constants/insights';
import useObserver from '@/hooks/common/useObserver';
import { useGetInfiniteMyInsightNote } from '@/hooks/insights/useInsights';
import { IMyNote } from '@/types/insight/insightNote';
import useModalStore from '@/store/common/useModalStore';
import { useFilterStore } from '@/store/common/useFilterStore';
import { useGetTicket } from '@/hooks/session/useReservation';

function InsightItems({ note }: IMyNote) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isDetailed, setIsDetailed] = useState(false);
  const { memo, isPublic, sessionName } = note;

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollHeight > 120);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 p-6">
        <div className="flex items-center gap-2">
          <div className="body-m-16-150 bg-bg-secondary px-2 py-1 text-text-main">
            {isPublic ? '공개' : '비공개'}
          </div>
          <h3>{sessionName}</h3>
        </div>
        <p
          ref={textRef}
          className="body-r-16-150 overflow-hidden text-text-sub"
          style={{ maxHeight: isDetailed ? '' : '120px' }}
        >
          {memo}
        </p>
        {isOverflowing && (
          <div
            onClick={() => setIsDetailed(!isDetailed)}
            className="body-r-14 flex cursor-pointer items-center gap-1 text-text-sub"
          >
            <span>{isDetailed ? '닫기' : '자세히 보기'}</span>
            <Image
              height={24}
              width={24}
              src="/button/down-arrow.svg"
              alt="down-arrow"
              className={`transition-transform duration-300 ease-in-out ${isDetailed ? 'rotate-180' : ''}`}
            />
          </div>
        )}
      </div>
    </>
  );
}

function InsightList() {
  const lastRef = useRef<HTMLDivElement | null>(null);
  const { currentDate } = useSessionStore();
  const { selectedInsights } = useFilterStore();

  useEffect(() => {}, [selectedInsights]);

  const {
    data: myInsights,
    fetchNextPage,
    hasNextPage,
  } = useGetInfiniteMyInsightNote(selectedInsightDate[currentDate]);

  useObserver({
    target: lastRef,
    onIntersect: ([entry]) => {
      if (entry.isIntersecting && hasNextPage) fetchNextPage();
    },
  });

  const filteredInsights =
    selectedInsights.size === 0
      ? myInsights
      : {
          ...myInsights,
          pages: myInsights?.pages.map((page) => ({
            ...page,
            content: page?.content.filter((insight) =>
              selectedInsights.has(insight.sessionId),
            ),
          })),
        };

  return (
    <div className="flex w-full flex-col shadow-lg">
      {filteredInsights?.pages?.map((page) => {
        return page?.content.map((list, index) => (
          <InsightItems key={index} note={list} />
        ));
      })}
      {hasNextPage && <div ref={lastRef}></div>}
    </div>
  );
}

export default function MyInsights() {
  const router = useRouter();
  const { isOpen, contents } = useModalStore();
  const { data: tickets } = useGetTicket();

  const sessionId =
    tickets &&
    tickets.registeredSessions &&
    Array.isArray(Object.values(tickets.registeredSessions)) &&
    Object.values(tickets.registeredSessions)[0] &&
    Object.values(tickets.registeredSessions)[0][0]?.sessionId;

  return (
    <>
      {isOpen && contents}
      <div className="flex flex-col gap-10">
        <div>
          <h1 className="headline-sb-36 leading-normal text-text-main">
            내 인사이트 노트
          </h1>
          <p className="body-m-16 text-text-sub">
            필요할 때 꺼내 보며, 아이디어 정리하고 새로운 관점을 더해 보세요
          </p>
        </div>
        <div className="flex flex-col gap-36">
          <Tab />
          <div className="flex w-full flex-col items-end">
            <div
              onClick={() =>
                sessionId
                  ? router.push(`/sessions/${sessionId}/insight-notes`)
                  : router.push(`/session-apply`)
              }
              className="flex items-center"
            >
              <label className="text-text-sub">
                인사이트 노트 작성하러 가기
              </label>
              <button>
                <Image
                  src={'/button/right-arrow-side-in.svg'}
                  alt="자세히 보기"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </button>
            </div>
            <InsightList />
          </div>
        </div>
      </div>
    </>
  );
}
