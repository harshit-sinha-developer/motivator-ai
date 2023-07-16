import {
  LanguageMenu, MotivationComponent, LoadingSpinner, embedComponent,
} from './uiElements.js';
import { getQuote, getLanguages } from './apiService.js';

/**
 * 
 * @returns {string}
 */
const getSelectedLanguage = () => document.getElementById('language-selector').value;

/**
 * 
 * @param {DocumentFragment} component
 * @returns {void}
 */
const renderQuoteBox = (component) => {
  const quoteBox = document.getElementById('quoteBox');
  embedComponent(quoteBox, component);
}

/**
 * 
 * @param {Object.<string, string>} supportedLanguages
 * @returns {void}
 */
const renderLanguageMenu = (supportedLanguages) => {
  const languageSelectorEle = document.getElementById('language-selector');
  embedComponent(languageSelectorEle, LanguageMenu({ supportedLanguages }));
}

const motivateButtonClicked = async () => {
  const prompt = document.getElementById('chat-input').value;

  if (!prompt || prompt.trim() === '') {
    return;
  }

  const selectedLanguage = getSelectedLanguage();

  renderQuoteBox(LoadingSpinner());
  const motivationResponse = await getQuote(prompt, { langCode: selectedLanguage });
  renderQuoteBox(MotivationComponent({ motivationResponse }))
};

const listenMotivateButtonClick = () => {
  document.getElementById('motivate-btn').addEventListener('click', motivateButtonClicked);
}

async function main() {
  const supportedLanguages = await getLanguages();
  renderLanguageMenu(supportedLanguages);
  listenMotivateButtonClick();
}

main();
