import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { Dialogue } from '@/types/shared/dialogue';

// API base URL - can be configured based on environment
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://equilibria-labs-api.onrender.com');

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  return response.data;
};

// Helper to get the auth token
const getAuthToken = (): string => {
  if (typeof window === 'undefined') return '';

  // Replace with your actual auth token retrieval logic
  return localStorage.getItem('authToken') || '';
};

export function useDialogue() {
  // Get all dialogues for the authenticated user
  const {
    data: dialogues,
    error: dialoguesError,
    mutate: mutateDialogues,
  } = useSWR<Dialogue[]>(`${API_BASE_URL}/api/dialogues`, fetcher);

  // Get a specific dialogue by ID
  const getDialogue = (dialogueId: string) => {
    const { data, error } = useSWR<Dialogue>(
      dialogueId ? `${API_BASE_URL}/api/dialogues/${dialogueId}` : null,
      fetcher
    );

    return {
      dialogue: data,
      isLoading: !error && !data,
      isError: error,
    };
  };

  // Create a new dialogue
  const createDialogue = async (dialogue: Dialogue): Promise<Dialogue> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/dialogues`,
        { dialogue },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update the cache
      mutateDialogues();

      return response.data;
    } catch (error) {
      console.error('Error creating dialogue:', error);
      throw error;
    }
  };

  // Update an existing dialogue
  const updateDialogue = async (
    dialogueId: string,
    dialogue: Dialogue
  ): Promise<Dialogue> => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/dialogues/${dialogueId}`,
        { dialogue },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update the cache for both the list and the specific dialogue
      mutateDialogues();
      mutate(`${API_BASE_URL}/api/dialogues/${dialogueId}`);

      return response.data;
    } catch (error) {
      console.error('Error updating dialogue:', error);
      throw error;
    }
  };

  return {
    dialogues,
    dialoguesError,
    isLoading: !dialoguesError && !dialogues,
    getDialogue,
    createDialogue,
    updateDialogue,
  };
}

export default useDialogue;
