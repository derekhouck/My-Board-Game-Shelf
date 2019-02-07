export const required = value => (value ? undefined : 'Required');

export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';

export const isTrimmed = value =>
    value.trim() === value ? undefined : 'Cannot start or end with whitespace';

export const length = length => value => {
    if (length.min && value.length < length.min) {
        return `Must be at least ${length.min} characters long`;
    }
    if (length.max && value.length > length.max) {
        return `Must be at most ${length.max} characters long`;
    }
};

export const matches = field => (value, allValues) =>
    field in allValues && value.trim() === allValues[field].trim()
        ? undefined
        : 'Does not match';

export const minNum = num => value =>
    value >= num ? undefined : `Must be at least ${num}`;

export const maxNum = num => value =>
    value <= num ? undefined : `Must be at most ${num}`;

export const notLessThanField = field => (value, allValues) =>
    field in allValues && Number(value) >= Number(allValues[field])
        ? undefined
        : `Must not be less than ${allValues[field]}`;