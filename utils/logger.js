/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const logger = ['error', 'warn', 'info', 'debug', 'trace', 'log'].reduce((loggerObj, level) => {
  loggerObj[level] = (...args) => console[level](new Date(), ...args);
  return loggerObj;
}, {});
/* eslint-enable no-param-reassign */
/* eslint-disable no-console */

export default logger;
