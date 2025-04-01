'use client';
import LikeToggle from '@/components/common/toggle/LikeToggle';
import { IChildren } from '@/types/children';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import InsightForm from '../form/InsightForm';
import ProfileHeader from '../profileHeader';
import { getTime } from '@/utils/insightDate';
import { INote } from '@/types/insight/insightNote';
import DeleteModal from '@/components/common/modal/DeleteModal';
import useModalStore from '@/store/common/useModalStore';

export default function NoteItem({ children, note }: IChildren & INote) {
  const [replyOn, setReplyOn] = useState(false);
  const [detailedReply, setDetailedReply] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const { openModal } = useModalStore();

  const {
    id,
    displayName,
    createdAt,
    updatedAt,
    likeCount,
    isPublic,
    isAnonymous,
    isLiked,
    hasSpeakerComment,
    memo,
    profile,
    isMine,
  } = note;

  const time = getTime(createdAt);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollHeight > 120);
    }
  }, []);

  const OpenDeleteModal = () => {
    openModal({
      contents: profile && <DeleteModal id={id} />,
    });
  };

  return (
    <div className={`flex w-full flex-col gap-6 ${!isPublic && 'hidden'}`}>
      <div className="flex flex-col gap-2 text-text-sub">
        <div className="flex items-center justify-between">
          <ProfileHeader
            isAnonymous={isAnonymous}
            profile={profile}
            name={displayName}
            time={time}
            edited={createdAt == updatedAt ? false : true}
          />
          <div className={`${!isMine && 'hidden'}`}>
            <Image
              onClick={OpenDeleteModal}
              width={24}
              height={24}
              alt="edit"
              src="/button/add-btn.svg"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p
            ref={textRef}
            className="body-r-16-150 overflow-hidden text-text-sub"
            style={{ maxHeight: detailedReply ? '' : '120px' }}
          >
            {memo}
          </p>

          {isOverflowing && (
            <div
              onClick={() => setDetailedReply(!detailedReply)}
              className="body-r-14 flex cursor-pointer items-center gap-1 text-text-sub"
            >
              <span>{detailedReply ? '닫기' : '자세히 보기'}</span>
              <Image
                height={24}
                width={24}
                src="/button/down-arrow.svg"
                alt="down-arrow"
                className={`transition-transform duration-300 ease-in-out ${detailedReply ? 'rotate-180' : ''}`}
              />
            </div>
          )}
        </div>
        <div className="flex gap-16">
          <LikeToggle
            id={id}
            size={'m'}
            likeCount={likeCount}
            isLiked={isLiked}
          />
          <div
            onClick={() => setReplyOn(!replyOn)}
            className="flex items-center gap-1"
          >
            <Image
              height={24}
              width={24}
              src="/mock/reply-icon.svg"
              alt="reply-icon"
            />
            <span className="body-r-14 text-text-sub">답글</span>
            {hasSpeakerComment && (
              <span className="body-m-16-150 rounded-md bg-bg-secondary px-2 py-1 text-text-main">
                강연자 답글
              </span>
            )}
          </div>
        </div>
        {replyOn && <InsightForm type="reply" id={id} />}
      </div>
      {children}
    </div>
  );
}
