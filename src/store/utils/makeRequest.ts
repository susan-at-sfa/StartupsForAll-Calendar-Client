export async function makeRequest(url: string, method: string, data?: unknown, token?: string) {
  const init: RequestInit = {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
  };
  try {
    console.log('store/util/ MAKING REQUEST', init);
    const response = await fetch(url, init);
    if (!response.ok) {
      console.error('store/util/ ERROR', response);
      return { success: false, data: null, error: response };
    }
    const data = await response.json();
    console.log('store/util GOT DATA', data);
    return { success: true, data, error: null };
  } catch (e) {
    console.error('store/util/ ERROR caught:', e);
    return { success: false, data: null, error: e };
  }
}
