export default (store: any) => (next: any) => (action: any): any => {
  // tslint:disable-next-line:no-console
  console.log("called " + action.type);
  const result = next(action);
  // tslint:disable-next-line:no-console
  console.log(result);
  return result;
};
