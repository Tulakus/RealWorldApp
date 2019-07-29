import * as React from "react";

const DEFAULT_ITEMS_PER_PAGE = 10;

interface IPagination {
  items: number;
  itemsPerPage?: number;
  selectedPage: number;
  handleClick: (index: number) => void;
}

const createPagination = (props: IPagination) => {
  const pages: JSX.Element[] = [];
  const pagesCount: number = Math.ceil(
    props.items / (props.itemsPerPage || DEFAULT_ITEMS_PER_PAGE)
  );
  if (pagesCount === 1) {
    return pages;
  }
  for (let i = 0; i < pagesCount; i++) {
    pages.push(
      <li
        className={i === props.selectedPage ? "page-item active" : "page-item"}
        onClick={e => {
          props.handleClick(i);
        }}
        key={i}
      >
        <a className="page-link">{i + 1}</a>
      </li>
    );
  }
  return pages;
};

export function Pagination(props: IPagination) {
  return props.items === 0 ? null : (
    <div>
      <ul className="pagination">{createPagination(props)}</ul>
    </div>
  );
}
