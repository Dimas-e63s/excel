export function parse(val = '') {
  if(val.startsWith('=')) {
    try {
      return eval(val.slice(1))
    } catch (e) {
      return val
    }
  }
  return val
}