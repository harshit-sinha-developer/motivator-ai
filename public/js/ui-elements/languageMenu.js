/**
 *
 * @param {{supportedLanguages: Object.<string, string>}} param0
 * @returns {string}
 */
const LanguageMenu = ({ supportedLanguages }) => {
  const options = Object.entries(supportedLanguages)
    .map(([langCode, language]) => `<option value="${langCode}">${language}</option>`).join(' ');

  return `
    <select class="form-select" aria-label="Language Options">
      ${options}
    </select>
  `;
};

export default LanguageMenu;
