/* eslint-disable @typescript-eslint/no-explicit-any */
import { toCapitalize } from './toCapitalize'

describe('toCapitalize', () => {
  test('should capitalize the first letter of a lowercase word', () => {
    expect(toCapitalize('hello')).toBe('Hello')
  })

  test('should return the word unchanged if the first letter is already uppercase', () => {
    expect(toCapitalize('Hello')).toBe('Hello')
  })

  test('should return the word unchanged if it is empty', () => {
    expect(toCapitalize('')).toBe('')
  })

  test('should throw a TypeError if the input is not a string', () => {
    expect(() => toCapitalize(123 as any)).toThrow(TypeError)
    expect(() => toCapitalize(null as any)).toThrow(TypeError)
    expect(() => toCapitalize(undefined as any)).toThrow(TypeError)
    expect(() => toCapitalize({} as any)).toThrow(TypeError)
    expect(() => toCapitalize([] as any)).toThrow(TypeError)
  })
})
