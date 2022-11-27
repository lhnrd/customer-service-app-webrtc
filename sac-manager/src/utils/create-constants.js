export default (prefix = '') => (...keys) =>
  keys.reduce((obj, key) => ({ ...obj, [key]: prefix + key }), {});
