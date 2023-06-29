class ApiService {
  #apiUrl = "http://localhost:3000/api"

  async getQuote(prompt, {langCode} = {}) {
    try {
      const response = await fetch(`${this.#apiUrl}/getQuote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({prompt, langCode}),
      });
  
      if (!response.ok) {
        let err = new Error("HTTP status code: " + response.status)
        err.response = response
        err.status = response.status
        throw err
      }

      const result = await response.json();
      console.log("Success:", result);
      return result.data.motivationalResponse;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async getLanguages() {
    try {
      const response = await fetch(`${this.#apiUrl}/languages`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        let err = new Error("HTTP status code: " + response.status)
        err.response = response
        err.status = response.status
        throw err
      }

      const result = await response.json();
      console.log("Success:", result);
      return result.data.supportedLanguages;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

const renderLanguageOptions = (containerEle, supportedLanguages) => {
  const options = Object.entries(supportedLanguages).map(([langCode, language]) => {
    return `<option value="${langCode}">${language}</option>`
  });
  const optionsContent = document.createRange().createContextualFragment(options.join(' '))

  containerEle.replaceChildren();
  containerEle.appendChild(optionsContent);
}

const renderMotivationResponse = (containerEle, motivationResponse) => {
  const quoteContent = document.createRange().createContextualFragment(
    `
    <div class="row">
      <h5>Someone once said</h5>
      <figure class="text-center">
        <blockquote class="blockquote">
          <p>${motivationResponse.quote}</p>
        </blockquote>
        <figcaption class="blockquote-footer">
          <cite title="${motivationResponse.translatedQuotee}">${motivationResponse.quotee}</cite>
        </figcaption>
      </figure>
    </div>
    <div class="row">
      <h5>Literal Translation</h5>
      <figure class="text-center">
        <blockquote class="blockquote">
          <p>${motivationResponse.translatedQuote}</p>
        </blockquote>
        <figcaption class="blockquote-footer">
          <cite title="${motivationResponse.translatedQuotee}">${motivationResponse.translatedQuotee}</cite>
        </figcaption>
      </figure>
    </div>
    <div class="row">
      <h5>Meaning</h5>
      <p>${motivationResponse.explanation}</p>
    </div>
    `
  );

  containerEle.replaceChildren();
  containerEle.appendChild(quoteContent);
}

const renderLoader = (containerEle) => {
  const quoteContent = document.createRange().createContextualFragment(
    `
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    `
  )

  containerEle.replaceChildren();
  containerEle.appendChild(quoteContent);
}

/**
 * 
 * @param {ApiService} apiService 
 * @returns 
 */
const motivateButtonClicked = (apiService) => async () => {
  const prompt = document.getElementById('chat-input').value

  if(!prompt || prompt.trim() == '') {
    return;
  }

  const containerEle = document.getElementById('quoteBox')
  renderLoader(containerEle)
  const selectedLanguage = document.getElementById('language-selector').value;
  console.log(selectedLanguage)
  const motivationalResponse = await apiService.getQuote(prompt, {langCode: selectedLanguage});
  renderMotivationResponse(containerEle, motivationalResponse)
}

async function main() {
  const apiService = new ApiService({language: 'Hindi (Devanagari)'});
  const supportedLanguages = await apiService.getLanguages();

  const languageSelectorEle = document.getElementById('language-selector')
  renderLanguageOptions(languageSelectorEle, supportedLanguages);
  document.getElementById('motivate-btn').addEventListener('click', motivateButtonClicked(apiService))
}

main();