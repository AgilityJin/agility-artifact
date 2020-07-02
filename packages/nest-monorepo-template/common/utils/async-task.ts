/**
 * @export
 * @template T
 * @template U
 * @param {Promise<T>} promise
 * @param {object} [errorExt]
 * @returns {(Promise<[U | null, T | undefined]>)}
 */
export default function asyncTask<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object,
): Promise<[U | null, T | undefined]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        Object.assign(err, errorExt);
      }

      return [err, undefined];
    });
}
