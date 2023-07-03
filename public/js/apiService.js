const API_HOST = '/api';

async function request(URL, { method, body } = {}) {
  try {
    const response = await fetch(URL, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = new Error(`HTTP status code: ${response.status}`);
      err.response = response;
      err.status = response.status;
      throw err;
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getQuote(prompt, { langCode } = {}) {
  const result = await request(`${API_HOST}/getQuote`, {
    method: 'POST',
    body: {
      prompt,
      langCode,
    },
  });

  return result.data.motivationalResponse;
}

export async function getLanguages() {
  const result = await request(`${API_HOST}/languages`, { method: 'GET' });

  return result.data.supportedLanguages;
}
