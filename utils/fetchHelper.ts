export const fetchHelper = async <T>(
  url: string,
  options: RequestInit,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setState: React.Dispatch<React.SetStateAction<T | null>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
): Promise<void> => {
  try {
    setLoading(true);
    setError(null);
    const response = await fetch(url, options);

    if (response.ok) {
      const data: T = await response.json();
      setState(data);
    } else {
      setError(`Error: ${response.status}`);
    }
  } catch (error: any) {
    setError(`Error: ${error.message}`);
  } finally {
    setLoading(false);
  }
};
