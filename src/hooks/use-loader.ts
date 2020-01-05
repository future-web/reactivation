import { useState, useCallback } from 'react';

interface AsyncRelayType {
  <T>(value: Promise<T>): Promise<T>;
}

/**
 * Provides a loading indicator by observing asynchronous tasks such that the
 * loading state is true if at least one task is still in a pending state
 */
export function useLoader(): [boolean, AsyncRelayType] {
  const [pendingTasks, setPendingTasks] = useState(0);

  const addTask = useCallback(async <T>(task: Promise<T>): Promise<T> => {
    setPendingTasks(count => count + 1);

    try {
      return await task;
    } finally {
      setPendingTasks(count => count - 1);
    }
  }, [setPendingTasks]);

  const isLoading = pendingTasks > 0;

  return [isLoading, addTask];
}
