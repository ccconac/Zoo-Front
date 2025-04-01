import { IModalBodyProps } from '@/types/modal/modal';

import ModalHeader from './Layout/ModalHeader';
import ModalContainer from './Layout/ModalContainer';
import useModalStore from '@/store/common/useModalStore';
import { useMutationDeleteNote } from '@/hooks/insights/useInsights';

function ModalBody({ bodyText }: IModalBodyProps) {
  return (
    <div className="flex w-[100%] items-center justify-center bg-bg-secondary px-20 py-24">
      <p className="body-m-16 text-text-main">{bodyText}</p>
    </div>
  );
}

function ModalButton({
  onButtonClick,
  DeleteButtonClick,
}: {
  onButtonClick: () => void;
  DeleteButtonClick: () => void;
}) {
  return (
    <div className="title-sb-20 flex w-full items-center gap-16">
      <button
        onClick={onButtonClick}
        className="flex-1 rounded-md bg-fill-thirary py-16 text-text-primary"
      >
        취소
      </button>
      <button
        onClick={DeleteButtonClick}
        className="flex-1 rounded-md bg-fill-primary py-16 text-text-white"
      >
        삭제
      </button>
    </div>
  );
}

export default function DeleteModal({ id }: { id: number }) {
  const { closeModal } = useModalStore();
  const { mutate } = useMutationDeleteNote();

  const headerText = '알림';
  const bodyText =
    '삭제하시면 작성한 인사이트 노트는 복구할 수 없습니다. 그래도 삭제하시겠어요?';

  const DeleteHandler = () => {
    console.log(id, '삭제');
    mutate(id);
  };

  return (
    <ModalContainer>
      <ModalHeader headerText={headerText} closeModal={closeModal} />
      <ModalBody bodyText={bodyText} />
      <ModalButton
        onButtonClick={closeModal}
        DeleteButtonClick={DeleteHandler}
      />
    </ModalContainer>
  );
}
