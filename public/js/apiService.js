const API_HOST = '/api';

const getApiEndpoingUrl = (endpoint) => `${API_HOST}/${endpoint}`;

async function request(url, { method, body } = {}) {
  try {
    const response = await fetch(url, {
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

/**
 * 
 * @param {string} prompt 
 * @param {{langCode: string}} param1 
 * @returns {Promise<{quote: string, translatedQuotee: string, quotee: string, translatedQuote: string, explanation: string}>}
 */
export async function getQuote(prompt, { langCode } = {}) {
  const result = await request(getApiEndpoingUrl('getQuote'), {
    method: 'POST',
    body: {
      prompt,
      langCode,
    },
  });

  return result.data.motivationalResponse;
}

/**
 * 
 * @returns {Promise<Object.<string, string>>}
 */
export async function getLanguages() {
  const result = await request(getApiEndpoingUrl('languages'), { method: 'GET' });

  return result.data.supportedLanguages;
}
