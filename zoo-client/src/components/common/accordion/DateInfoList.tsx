'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { SelectSession } from '@/types/session/session';
import { useSessionStore } from '@/store/common/useSessionStore';

interface DateInfoProps {
  title: string;
  items: SelectSession[];
}
export default function DateInfoList({ title, items }: DateInfoProps) {
  const { selectedSessionsByDate } = useSessionStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen && Object.values(selectedSessionsByDate).length > 0) {
      setIsOpen(true);
    }
  }, [selectedSessionsByDate]);

  return (
    <>
      <hr className="text-divider-secondary" />
      <div className="flex w-full flex-col justify-center bg-bg-secondary">
        <div className="px-12 py-16 text-text-main">
          <div className="flex h-[38px] content-center items-center justify-between">
            <span className="body-m-14 flex-1 text-text-main">{title}</span>
            <Image
              src="/accordion/date-btn.svg"
              alt="DateInfo Toggle Accordion"
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              width={16}
              height={16}
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
          {isOpen && (
            <ul className="flex flex-col gap-20 px-2 text-sm">
              {items.map((item, index) => (
                <li key={index} className="flex flex-col gap-20 py-1">
                  <span className="figure-m-10">{item.time}</span>
                  <span className="body-r-14">{item.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
