export const getFetchOptions = (token?: string) => {
  return {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token || ''}`,
      'Content-Type': 'application/json',
    },
  };
};
