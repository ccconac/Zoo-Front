'use client';
import {
  Footer,
  Video,
  InsightForm,
  NavigationBar,
  SessionInfo,
  NoteList,
  InsightNoteTab,
  InsightSideNavigationBar,
  AnotherInsightCard,
} from '@/components';
import { useGetTopInsightQuery } from '@/hooks/insights/insight';
import { useGetInsightNote } from '@/hooks/insights/useInsights';
import { useSession } from '@/hooks/session/useSession';
import useModalStore from '@/store/common/useModalStore';
import { ISessionId } from '@/types/session/session';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

function AnotherInsightSection() {
  const router = useRouter();
  const { data: topInsights, isLoading } = useGetTopInsightQuery();

  return (
    <section className="flex gap-3">
      <div className="flex w-[263px] max-w-[35.8125rem] flex-col">
        <h3 className="title-sb-20 text-text-main">타 세션 인사이트 노트</h3>
        <div className="flex flex-col items-center justify-center gap-16">
          {topInsights &&
            topInsights?.map(
              (topInsight, index) =>
                index !== 2 && (
                  <AnotherInsightCard key={index} content={topInsight} />
                ),
            )}
          {isLoading && (
            <div className="h-[500px] w-[263px] bg-bg-primary"></div>
          )}
        </div>
        <button
          onClick={() => router.push('/insight-notes')}
          className="body-sb-16 rounded-md bg-bg-thirary px-16 py-12 text-text-primary"
        >
          더 구경하러 가기
        </button>
      </div>
    </section>
  );
}

function InsightSection({ id, count }: { id: number; count: number }) {
  return (
    <section className="flex w-[100%] flex-col items-center justify-center gap-40 p-0">
      <div className="flex w-[100%] items-center justify-between bg-bg-secondary px-20 py-16">
        <h3 className="title-sb-20 text-text-main">인사이트 노트 {count}개</h3>
        <InsightNoteTab />
      </div>
      <InsightForm type="insight" id={id} />
      <NoteList />
    </section>
  );
}

const SessionInsightInfo = ({ currentSession }: ISessionId) => {
  return (
    <div className="py-32">
      <SessionInfo currentSession={currentSession} />
      <div className="flex items-center gap-2">
        <Image
          src="/mock/profile.svg"
          alt="session-profile"
          height={48}
          width={48}
        />
        <span className="title-sb-20 text-text-main">
          {currentSession.speakerName}
        </span>
        <span className="body-m-16-150 text-text-sub">
          {currentSession.careers[0]}
        </span>
      </div>
    </div>
  );
};

export default function SessionInsightNotes() {
  const { id } = useParams();
  const { data: currentSession } = useSession(Number(id));
  const { data } = useGetInsightNote(Number(id), 'latest');
  const count = data?.pages[0].totalElements;

  const { isOpen, contents } = useModalStore();

  return (
    <>
      {isOpen && contents}
      <main>
        <NavigationBar />
        <InsightSideNavigationBar />
        <div className="my-14 flex w-full justify-center gap-20">
          <div className="flex max-w-[924px] flex-col items-start justify-center">
            <Video />
            {currentSession && (
              <SessionInsightInfo currentSession={currentSession} />
            )}
            <InsightSection id={Number(id)} count={Number(count)} />
          </div>
          <AnotherInsightSection />
        </div>
        <Footer />
      </main>
    </>
  );
}
