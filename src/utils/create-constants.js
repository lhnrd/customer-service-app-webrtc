export default (...keys) => {
  return keys.reduce((obj, key) => ({ ...obj, [key]: key }), {})
}
