const API_HOST = "http://localhost:3000/api"

async function request(URL, {method, body} = {}) {
  try {
    const response = await fetch(URL, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      let err = new Error("HTTP status code: " + response.status)
      err.response = response
      err.status = response.status
      throw err
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getQuote(prompt, {langCode} = {}) {
  const result = await request(`${API_HOST}/getQuote`, {
    method: 'POST',
    body: {
      prompt,
      langCode
    }
  });

  return result.data.motivationalResponse;
}

export async function getLanguages() {
  const result = await request(`${API_HOST}/languages`, { method: 'GET' });
  
  return result.data.supportedLanguages;
}