const createDOMFragment = (componentString) => document
  .createRange().createContextualFragment(componentString);

export const LanguageMenu = ({ supportedLanguages }) => {
  const options = Object.entries(supportedLanguages)
    .map(([langCode, language]) => `<option value="${langCode}">${language}</option>`);

  return createDOMFragment(`
    <select class="form-select" aria-label="Language Options">
      ${options.join(' ')}
    </select>
  `);
};

export const MotivationComponent = ({ motivationResponse }) => createDOMFragment(`
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
`);

export const Loader = () => createDOMFragment(`
  <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
`);

/**
 *
 * @param {HTMLElement} containerComponent
 * @param {DocumentFragment} childFragment
 */
export const embedComponent = (containerComponent, childFragment) => {
  containerComponent.replaceChildren();
  containerComponent.appendChild(childFragment);
};
