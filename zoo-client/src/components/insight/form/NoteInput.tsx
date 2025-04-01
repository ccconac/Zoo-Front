'use client';
import useModalStore from '@/store/common/useModalStore';
import SettingNoteModal from '@/components/common/modal/SettingNoteModal';
import SaveInsightModal from '@/components/common/modal/SaveInsightModal';
import { useRef, useState } from 'react';
import { useSaveInsight } from '@/store/common/insight/useSaveInsight';

export default function NoteInput({ text, id }: { text: string; id: number }) {
  const { openModal } = useModalStore();
  const [memo, setMemo] = useState('');
  const { content } = useSaveInsight();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const openSettingModal = () => {
    openModal({
      contents: <SettingNoteModal />,
    });
  };
  const openSaveModal = () => {
    openModal({
      contents: (
        <SaveInsightModal
          headerText="임시저장"
          bodyText={`해당 페이지를 벗어 날 시 임시저장을 누르지 않으면 
인사이트에 작성한 모든 노트 정보가 사라집니다.`}
          memo={memo}
        />
      ),
    });
  };
  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <>
      <input hidden name="sessionId" defaultValue={Number(id)} />
      <textarea
        required
        ref={textareaRef}
        onInput={handleResizeHeight}
        name="memo"
        rows={1}
        onChange={(e) => setMemo(e.target.value)}
        className="max-h-[290px] w-full resize-none text-text-thirary scrollbar-hidden focus:outline-none"
        placeholder={text}
        defaultValue={content}
      />
      <div className="flex items-center justify-between">
        <div className="flex gap-16"></div>
        <div className="body-m-16 flex gap-2">
          <button
            type="button"
            onClick={openSaveModal}
            className="cursor-pointer text-text-sub"
          >
            임시저장
          </button>
          <button
            type="button"
            onClick={openSettingModal}
            className="cursor-pointer text-text-primary"
          >
            등록
          </button>
        </div>
      </div>
    </>
  );
}
