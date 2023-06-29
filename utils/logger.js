const logger = ['error', 'warn', 'info', 'debug', 'trace', 'log'].reduce((logger, level) => {
  logger[level] = (...args) => console[level](new Date(), ...args)
  return logger;
}, {});

export default logger;