import React from "react";

interface IButtonCounterProps {
  onClickHandelr: (e: any) => void;
  iconClass: string;
  label: string;
  counter: number;
  buttonClassName: string;
}

const ButtonCounter = (props: IButtonCounterProps) => {
  return (
    <button className={props.buttonClassName} onClick={props.onClickHandelr}>
      <i className={props.iconClass} />
      &nbsp; {props.label}
      <span className="counter">({props.counter || 0})</span>
    </button>
  );
};

interface IButtonProps {
  onClickHandler: (e: any) => void;
  iconClass: string;
  label: string;
  buttonClassName: string;
}

const Button = (props: IButtonProps) => {
  return (
    <button className={props.buttonClassName} onClick={props.onClickHandler}>
      <i className={props.iconClass} />
      &nbsp; {props.label}
    </button>
  );
};

export { Button, ButtonCounter };
