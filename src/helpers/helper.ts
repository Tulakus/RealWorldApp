import { ThunkDispatch } from "redux-thunk";

export function getDate(date: string): string {
  const tempDate = new Date(date);
  const a = tempDate.toLocaleDateString("en-us", {
    day: "numeric",
    month: "long"
  });
  return `${a}th`;
}

export function navigateOnFetchSuccess(
  fetchRequest: () => any,
  props: any,
  redirectTo: string
) {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    return dispatch(fetchRequest()).then(
      () => {
        props.history.push(redirectTo);
      },
      // tslint:disable-next-line:no-empty
      () => {}
    );
  };
}
