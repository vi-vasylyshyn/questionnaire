const tryJsonParse = (value: string | null) => {
  if (!value) return value

  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

const storageService = (name: string) => {
  if (typeof window === 'undefined') {
    return {
      has: () => false,
      get: () => null,
      set: () => {},
      remove: () => {},
    }
  }
  return {
    has: () => !!localStorage.getItem(name),
    get: () => tryJsonParse(localStorage.getItem(name)),
    set: (val: unknown) => localStorage.setItem(name, JSON.stringify(val)),
    remove: () => localStorage.removeItem(name),
  }
}

export default storageService
