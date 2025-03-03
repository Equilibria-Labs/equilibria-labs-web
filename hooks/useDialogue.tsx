import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { Dialogue } from '@/types/shared/dialogue';
import { createClient } from '@/utils/supabase/client';

// API base URL - can be configured based on environment
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://equilibria-labs-api.onrender.com');

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
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

  // Get all submissions for a specific dialogue type
  const getDialogueSubmissions = (dialogueId: string) => {
    const { data, error } = useSWR<Dialogue[]>(
      dialogueId ? `${API_BASE_URL}/api/dialogues/type/${dialogueId}` : null,
      fetcher
    );

    return {
      submissions: data || [],
      isLoading: !error && !data,
      isError: error,
    };
  };

  // Create a new dialogue
  const createDialogue = async (dialogue: Dialogue): Promise<Dialogue> => {
    try {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      // Log the request details (for debugging)
      console.log('Creating dialogue with:', {
        url: `${API_BASE_URL}/api/dialogues`,
        token: token ? 'Present' : 'Missing',
        dialogue: dialogue,
      });

      const response = await axios.post(
        `${API_BASE_URL}/api/dialogues`,
        { dialogue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update the cache
      mutateDialogues();

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error creating dialogue:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message,
          headers: error.response?.headers,
        });
      } else {
        console.error('Error creating dialogue:', error);
      }
      throw error;
    }
  };

  // Update an existing dialogue
  const updateDialogue = async (
    dialogueId: string,
    dialogue: Dialogue
  ): Promise<Dialogue> => {
    try {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      // Always require submissionId
      if (!dialogue.submissionId) {
        throw new Error('submissionId is required for updating a dialogue');
      }

      const endpoint = `${API_BASE_URL}/api/dialogues/${dialogueId}/${dialogue.submissionId}`;

      const response = await axios.put(
        endpoint,
        { dialogue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update the cache for both the list and the specific dialogue
      mutateDialogues();
      mutate(
        `${API_BASE_URL}/api/dialogues/${dialogueId}/${dialogue.submissionId}`
      );

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
    getDialogueSubmissions,
    createDialogue,
    updateDialogue,
  };
}

export default useDialogue;
