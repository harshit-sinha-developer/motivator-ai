/**
 * 
 * @param {{supportedLanguages: Object.<string, string>}} param0 
 * @returns {string}
 */
export const LanguageMenu = ({ supportedLanguages }) => {
  const options = Object.entries(supportedLanguages)
    .map(([langCode, language]) => `<option value="${langCode}">${language}</option>`).join(' ');

  return `
    <select class="form-select" aria-label="Language Options">
      ${options}
    </select>
  `;
};

/**
 * 
 * @param {{title: string, quote: string, translatedQuotee: string, quotee: string}} param0 
 * @returns {string}
 */
export const QuoteBox = ({title, quote, quoteeTitle, quotee}) => `
  <h5>${title}</h5>
  <figure class="text-center">
    <blockquote class="blockquote">
      <p>${quote}</p>
    </blockquote>
    <figcaption class="blockquote-footer">
      <cite title="${quoteeTitle}">${quotee}</cite>
    </figcaption>
  </figure>
`;

/**
 * 
 * @param {{motivationResponse: {quote: string, translatedQuotee: string, quotee: string, translatedQuote: string, explanation: string}}} param0 
 * @returns {string}
 */
export const MotivationComponent = ({ motivationResponse }) => `
  <div class="row">
    ${
      QuoteBox({
        title: "Someone once said", 
        quote: motivationResponse.quote, 
        quoteeTitle: motivationResponse.translatedQuotee, 
        quotee: motivationResponse.quotee
      })
    }
  </div>
  <div class="row">
    ${
      QuoteBox({
        title: "Literal Translation", 
        quote: motivationResponse.translatedQuote, 
        quoteeTitle: motivationResponse.translatedQuotee, 
        quotee: motivationResponse.translatedQuotee
      })
    }
  </div>
  <div class="row">
    <h5>Meaning</h5>
    <p>${motivationResponse.explanation}</p>
  </div>
`;

/**
 * 
 * @returns {string}
 */
export const LoadingSpinner = () => `
  <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
`;

/**
 *
 * @param {HTMLElement} containerComponent
 * @param {string} innerHTML
 */
export const embedHTML = (containerComponent, innerHTML) => {
  containerComponent.replaceChildren();
  containerComponent.innerHTML = innerHTML;
};
