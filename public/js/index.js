import {LanguageOptions, MotivationComponent, Loader, embedComponent} from './uiElements.js';
import {getQuote, getLanguages} from './apiService.js';

const motivateButtonClicked = async () => {
  const prompt = document.getElementById('chat-input').value

  if(!prompt || prompt.trim() == '') {
    return;
  }

  const containerEle = document.getElementById('quoteBox')
  embedComponent(containerEle, Loader());

  const selectedLanguage = document.getElementById('language-selector').value;
  const motivationResponse = await getQuote(prompt, {langCode: selectedLanguage});
  embedComponent(containerEle, MotivationComponent({ motivationResponse: motivationResponse }));
}

async function main() {
  const supportedLanguages = await getLanguages();

  const languageSelectorEle = document.getElementById('language-selector');
  embedComponent(languageSelectorEle, LanguageOptions({ supportedLanguages: supportedLanguages }));

  document.getElementById('motivate-btn').addEventListener('click', motivateButtonClicked);
}

main();