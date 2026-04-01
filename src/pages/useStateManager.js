import { useState } from 'react';

export function useStateManager() {
  const [errorState, setError] = useState({
    state: false,
    error: null,
    errorMessage: null,
  });

  const [editDashboard, setEditDashboard] = useState({
    dashboard: false,
    editOn: false,
  });

  const [optimistcUpdate, setOptimisticUpdate] = useState(true);

  return {
    errorState,
    setError,
    editDashboard,
    setEditDashboard,
    optimistcUpdate, setOptimisticUpdate
  };
}
