export default (store: any) => (next: any) => (action: any): any => {
  // tslint:disable-next-line:no-console
  console.log("called " + action.type);
  return next(action);
};
