export const toCapitalize = (word: string): string => {
  if (typeof word !== 'string') {
    throw new TypeError('Input must be a string')
  }
  if (word.length === 0 || word.charAt(0) === word.charAt(0).toUpperCase()) {
    return word
  }
  return word.charAt(0).toUpperCase() + word.slice(1)
}
