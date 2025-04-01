'use client';

import useModalStore from '@/store/common/useModalStore';
import { useEffect } from 'react';

export default function Overlay() {
  const { isOpen } = useModalStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return <div className="fixed inset-0 flex bg-material-overlay" />;
}
