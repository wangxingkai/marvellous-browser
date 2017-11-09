import { isNil, isEmpty, curry } from 'ramda';

function _isInvalidProperty(input) {
  return property =>
    isStringInvalid(input[property]);
}

export function isStringInvalid(input) {
  return (
    isNil(input) ||
    isEmpty(input)
  );
}

export const propValidator = curry(
  (props, input) => {
    const properties = props
      .filter(_isInvalidProperty(input))
      .join(',');

    if (properties !== '') {
      throw new Error(
        `${properties} cannot be null/empty/undefined`
      );
    }
    return input;
  }
);
