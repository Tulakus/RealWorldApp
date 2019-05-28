import { Dispatch } from "redux";

export function getDate(date: string): string {
  const tempDate = new Date(date);
  const a = tempDate.toLocaleDateString("en-us", {
    day: "numeric",
    month: "long"
  });
  return `${a}th`;
}

export function itemsFetchData(url: string) {
  return (dispatch: Dispatch) => {
    // dispatch(itemsIsLoading(true));
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(payload => dispatch(payload))
      .catch(e => alert(e));
  };
}
