function auto(handler) {
  return (req, res, next) =>
    Promise.resolve(handler(req, res, next)).catch(next);
}

export default function autoCatch(handlers) {
  if (typeof handlers === 'function') return auto(handlers);

  return Object.keys(handlers).reduce((autoHandlers, key) => {
    // eslint-disable-next-line
    autoHandlers[key] = auto(handlers[key]);
    return autoHandlers;
  }, {});
}
