export interface IChangeValueAction<T> {
  type: T;
  value: string;
  key: string;
}

export function changeValue<T>(
  key: string,
  value: string,
  type: T
): IChangeValueAction<T> {
  return {
    key,
    type,
    value
  };
}
