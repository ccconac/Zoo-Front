'use client';
import Overlay from './Overlay';
import { IModalContainer } from '@/types/modal/modal';

export default function ModalContainer({ children }: IModalContainer) {
  return (
    <>
      <Overlay />
      <div className="fixed left-[50%] top-[50%] flex w-[50rem] translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center gap-0 rounded-[0.25rem] bg-bg-primary pb-32 pl-32 pr-32 pt-20">
        <div className="flex w-[100%] flex-col items-center justify-center gap-20 p-0">
          {children}
        </div>
      </div>
    </>
  );
}
