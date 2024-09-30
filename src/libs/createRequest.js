export default async function createRequest(options) {
  // const baseUrl = 'http://localhost:7070/?'; // локальный сервер
  const baseUrl = 'https://ahj-http-backend-82lw.onrender.com/?'; // деплой на render.com

  const { method, url, body } = options;

  try {
    const response = await fetch(baseUrl + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      if (response.status === 204) {
        return { error: false, status: response.status };
      }

      return await response.json();
    }

    return { error: true, status: response.status };
  } catch (err) {
    return { error: true, status: 520 };
  }
}
