import React, { forwardRef } from 'react';

interface DialogueTextInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onSubmit?: (e: React.FormEvent) => void;
  isLoading?: boolean;
  isTyping?: boolean;
}

const DialogueTextInput = forwardRef<
  HTMLTextAreaElement,
  DialogueTextInputProps
>(({ onSubmit, isLoading, isTyping, onChange, onKeyDown, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      onChange={e => {
        // Call the original onChange if provided
        onChange?.(e);
        // Auto-expand height
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
      onKeyDown={e => {
        // Call the original onKeyDown if provided
        onKeyDown?.(e);
        // Handle Enter key submission
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (!isLoading && !isTyping && onSubmit) {
            onSubmit(e);
          }
        }
      }}
      className='w-full min-h-[64px] p-0 text-heading bg-transparent border-none outline-none resize-none font-input'
      disabled={isLoading || isTyping}
      rows={1}
      {...props}
    />
  );
});

DialogueTextInput.displayName = 'DialogueTextInput';

export default DialogueTextInput;
