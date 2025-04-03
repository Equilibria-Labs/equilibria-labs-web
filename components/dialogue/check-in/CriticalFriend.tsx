'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useChat } from 'ai/react';
import Column from '@/components/structure/Column';
import { HeadingLarge } from '@/components/common/Typography';
import { useAlternativeTheme } from '@/hooks/useAlternativeTheme';
import { Button } from '@/components/ui/button';
interface CriticalFriendProps {
  onComplete?: () => void;
}

export default function CriticalFriend({ onComplete }: CriticalFriendProps) {
  const [isTyping, setIsTyping] = useState(false);
  const [displayedQuestion, setDisplayedQuestion] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [fadeIn, setFadeIn] = useState(true);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = useChat({
    api: '/api/critical-friend',
    onFinish: () => {
      setIsTyping(true);
      setTypingIndex(0);
      setDisplayedQuestion('');
    },
  });

  const { setRandomTheme } = useAlternativeTheme();

  // Get the current question from the messages
  const currentQuestion =
    messages.length > 0 && messages[messages.length - 1].role === 'assistant'
      ? messages[messages.length - 1].content
      : '';

  // Typing animation effect
  useEffect(() => {
    if (isTyping && typingIndex < currentQuestion.length) {
      const timer = setTimeout(() => {
        setDisplayedQuestion(prev => prev + currentQuestion[typingIndex]);
        setTypingIndex(typingIndex + 1);
      }, 10); // Speed of typing

      return () => clearTimeout(timer);
    } else if (isTyping && typingIndex >= currentQuestion.length) {
      setIsTyping(false);
    }
  }, [isTyping, typingIndex, currentQuestion]);

  // Initial question setup
  useEffect(() => {
    if (messages.length === 0) {
      append({
        role: 'assistant',
        content: '',
      });
    }
  }, [messages, append]);

  // Focus input on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle fade-in effect
  useEffect(() => {
    if (!fadeIn) {
      const timer = setTimeout(() => setFadeIn(true), 100);
      return () => clearTimeout(timer);
    }
  }, [fadeIn]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFadeIn(false);
    setRandomTheme();
    setTimeout(() => {
      handleSubmit(e);
    }, 300);
  };

  return (
    <Column
      hasLargeGap
      className={`w-full max-w-2xl transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
    >
      <HeadingLarge className='text-secondary'>
        {isTyping || messages[messages.length - 1]?.role !== 'assistant' ? (
          <>
            {displayedQuestion}
            <span className='inline-block w-2 h-5 ml-1 bg-black animate-pulse'></span>
          </>
        ) : displayedQuestion ? (
          displayedQuestion
        ) : null}
      </HeadingLarge>

      <form onSubmit={handleFormSubmit} className='relative flex flex-col'>
        <Column hasNoGap justifyItems='end'>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => {
              handleInputChange(e);
              // Auto-expand height
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!isLoading && !isTyping && input.trim()) {
                  handleFormSubmit(e);
                }
              }
            }}
            placeholder='Type your response...'
            className='w-full min-h-[64px] p-0 text-heading bg-transparent border-none outline-none resize-none font-input'
            disabled={isLoading || isTyping}
            rows={1}
          />
          <Button
            type='submit'
            variant='secondary'
            size='iconCircle'
            className='rounded-full self-end'
            isLoading={isLoading}
            iconName='chevronUp'
            disabled={isLoading || isTyping || !input.trim()}
          />
        </Column>
      </form>
    </Column>
  );
}
