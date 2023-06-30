const createDOMFragment = (componentString) => {
  return document.createRange().createContextualFragment(componentString);
}

export const LanguageOptions = ({supportedLanguages}) => {
  const options = Object.entries(supportedLanguages).map(([langCode, language]) => {
    return `<option value="${langCode}">${language}</option>`
  });

  return createDOMFragment(options.join(' '))
}

export const MotivationComponent = ({motivationResponse}) => {
  return createDOMFragment(`
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
  `)
}

export const Loader = () => {
  return createDOMFragment(`
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `)
}

/**
 * 
 * @param {HTMLElement} containerComponent 
 * @param {DocumentFragment} childFragment 
 */
export const embedComponent = (containerComponent, childFragment) => {
  containerComponent.replaceChildren();
  containerComponent.appendChild(childFragment);
}