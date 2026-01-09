import React from 'react';
import Button from '../Appearance/components/Button';
import { cn } from '../../lib/utils';

interface ModalProps {
  title: string;
  description: string;
  accept: string;
  decline: string;
  handleAccept: () => Promise<void> | void;
  handleDecline: () => Promise<void> | void;
}

const Modal = ({ title, description, accept, decline, handleAccept, handleDecline }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="max-w-md w-full flex flex-col items-center gap-6 p-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground uppercase drop-shadow-lg">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg opacity-70">
            {description}
          </p>
        </div>

        <div className="flex gap-4 mt-8 w-full">
          <Button
            onClick={handleAccept}
            variant="default"
            size="lg"
            className="flex-1 text-lg py-6 uppercase font-bold tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(var(--primary),0.3)]"
          >
            {accept}
          </Button>
          <Button
            onClick={handleDecline}
            variant="outline"
            size="lg"
            className="flex-1 text-lg py-6 uppercase font-bold tracking-widest transition-transform hover:scale-105 active:scale-95 border-2"
          >
            {decline}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
