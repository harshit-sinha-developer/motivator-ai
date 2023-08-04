/**
 *
 * @param {HTMLElement} containerComponent
 * @param {string} innerHTML
 */
export const embedHTML = (containerComponent, innerHTML) => {
  containerComponent.replaceChildren();
  containerComponent.innerHTML = innerHTML; // eslint-disable-line no-param-reassign
};
