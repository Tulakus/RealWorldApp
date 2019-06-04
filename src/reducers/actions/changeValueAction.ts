export const CHANGE_VALUE = "CHANGE_VALUE";

export interface IChangeValueAction {
  type: typeof CHANGE_VALUE;
  value: string;
  key: string;
}

export function changeValue(key: string, value: string): IChangeValueAction {
  return {
    key,
    type: CHANGE_VALUE,
    value
  };
}
