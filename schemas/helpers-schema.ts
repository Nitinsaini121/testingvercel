import { z } from 'zod'

export const phoneRegExp =
  /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s]{3}[-.\s]?\d{4}$/
  export const longitudeRegex =
  /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;

export const latitudeRegex =
  /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;


export const requiredString = (fieldName: string) =>
  z
    .string()
    .trim()
    .min(1, { message: `${fieldName} is required` })

export const minLengthString = (min: number, fieldName: string) =>
  z
    .string()
    .trim()
    .min(min, {
      message: `${fieldName} must be at least ${min} characters long`
    })