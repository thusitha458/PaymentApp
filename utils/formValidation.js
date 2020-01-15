export const isEmpty = value => value === undefined || value === null || value.trim() === '';

export const onlyNumbers = value => /[0-9]+/.test(value);
