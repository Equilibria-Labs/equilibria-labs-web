'use client';

import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { useChat } from '@ai-sdk/react';
import { useAlternativeTheme } from '@/hooks/useAlternativeTheme';
import QuestionAnswerChat from '@/components/common/QuestionAnswerChat';
import { REFRAME_MAX_MESSAGES } from '@/config/reframe';
import { Heading } from '@/components/common/Typography';

/**
 * ReframeConversation - A component that manages a conversational experience with an AI assistant
 *
 * Flow Overview:
 * 1. Initialize state and hooks
 * 2. Check for existing session data on load
 * 3. Render chat interface based on session state
 * 4. Handle typing animations for assistant responses
 * 5. Process user submissions and update the conversation
 * 6. End session when maximum messages are reached
 */

interface ReframeConversationProps {
  onCompleteAction: (
    transcript: Array<{ role: string; content: string }>
  ) => void;
}

export default function ReframeConversation({
  onCompleteAction,
}: ReframeConversationProps) {
  // --- INITIALIZATION PHASE: Define all state variables ---
  const [isTyping, setIsTyping] = useState(false);
  const [displayedQuestion, setDisplayedQuestion] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [conversationTranscript, setConversationTranscript] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [fadeIn, setFadeIn] = useState(true);
  const [hasInitialResponse, setHasInitialResponse] = useState(false);
  const MAX_MESSAGES = REFRAME_MAX_MESSAGES; // @todo: make this dynamic

  const updateConversationTranscript = (message: {
    role: string;
    content: string;
  }) => {
    setConversationTranscript(prevTranscript => [...prevTranscript, message]);
  };

  // --- CHAT CONFIGURATION: Setup AI chat with API endpoint and callbacks ---
  const { messages, input, handleInputChange, handleSubmit, status, append } =
    useChat({
      api: '/api/reframe',
      onFinish: () => {
        // CONVERSATION CYCLE - STEP 5: After assistant responds, prepare for next exchange
        // Wait for fade out to complete, then clear content and start new sequence
        setTimeout(() => {
          setDisplayedQuestion('');
          setRandomTheme();
          setFadeIn(true);
          setTimeout(() => {
            setIsTyping(true);
            setTypingIndex(0);
            // Refocus the input after the animation sequence
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }, 300); // Start typing after fade in
        }, 300); // Wait for fade out
      },
    });

  const { setRandomTheme } = useAlternativeTheme();

  // --- INITIAL LOAD SEQUENCE - STEP 1: Check for existing session data ---
  useEffect(() => {
    if (messages.length === 0) {
      // On first load, check if there's an initial response in sessionStorage
      const initialResponse = sessionStorage.getItem('initialResponse');
      if (initialResponse) {
        setHasInitialResponse(true);
        // Initialize conversation with the stored initial response
        append({
          role: 'user',
          content: initialResponse,
        });
        updateConversationTranscript({
          role: 'user',
          content: initialResponse,
        });
        sessionStorage.removeItem('initialResponse');
      }
    }
  }, [messages, append]);

  const currentQuestion =
    messages.length > 0 && messages[messages.length - 1].role === 'assistant'
      ? messages[messages.length - 1].content
      : '';

  // --- CONVERSATION CYCLE - STEP 3: Handle typing animation for assistant responses ---
  useEffect(() => {
    if (isTyping && typingIndex < currentQuestion.length) {
      const timer = setTimeout(() => {
        setDisplayedQuestion(currentQuestion.substring(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }, 10); // Speed of typing

      return () => clearTimeout(timer);
    } else if (isTyping && typingIndex >= currentQuestion.length) {
      updateConversationTranscript({
        role: 'assistant',
        content: currentQuestion,
      });
      setIsTyping(false);
      setQuestionCount(prev => prev + 1);
      // Focus the input after typing animation completes with a delay
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [isTyping, typingIndex, currentQuestion]);

  // --- INITIAL LOAD SEQUENCE - STEP 2: Focus input element ---
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // --- CONVERSATION CYCLE - STEP 4: Handle fade animations ---
  useEffect(() => {
    if (!fadeIn) {
      const timer = setTimeout(() => {
        setDisplayedQuestion(''); // Clear the text when fade out completes
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [fadeIn]);

  // Effect to handle calling onComplete when session ends
  useEffect(() => {
    if (isSessionComplete && conversationTranscript.length > 0) {
      onCompleteAction(conversationTranscript);
    }
  }, [isSessionComplete, conversationTranscript, onCompleteAction]);

  /**
   * --- CONVERSATION CYCLE - STEP 1 & 2: Process user submissions ---
   * Handles form submission when user sends a message
   * Updates transcript, manages animations, and tracks message count
   */
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateConversationTranscript({
      role: 'user',
      content: input,
    });
    setFadeIn(false);

    if (questionCount >= MAX_MESSAGES) {
      setIsSessionComplete(true);
    } else {
      handleSubmit(e);
    }
  };

  // --- RENDER PHASE: Conditionally render based on session state ---
  return hasInitialResponse ? (
    isSessionComplete ? (
      // CONVERSATION CYCLE - END: Show completion message when session is over
      <Heading>Complete</Heading>
    ) : (
      // CONVERSATION CYCLE - ACTIVE: Show chat interface during active session
      <QuestionAnswerChat
        displayedQuestion={displayedQuestion}
        isTyping={isTyping}
        isAssistantMessage={messages[messages.length - 1]?.role === 'assistant'}
        input={input}
        onInputChange={handleInputChange}
        onSubmit={handleFormSubmit}
        isLoading={status === 'streaming' || status === 'submitted'}
        fadeIn={fadeIn}
        inputRef={inputRef}
      />
    )
  ) : null; // Show nothing if initial response hasn't been processed yet
}
