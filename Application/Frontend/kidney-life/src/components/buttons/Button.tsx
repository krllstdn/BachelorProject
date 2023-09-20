import React, { MouseEventHandler } from "react";

type ButtonProps = {
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  additionalStyles?: string;
};

export default function Button(props: ButtonProps) {
  return (
    <div className="add-pair-button mt-2">
      <button
        className={
          "bg-primary rounded-md p-2 w-full text-white " +
          "hover:bg-quinary focus:text-primary " +
          "focus:bg-quaternary " +
          props.additionalStyles
        }
        id="add-pair-button"
        onClick={props.onClick}
      >
        {props.name}
      </button>
    </div>
  );
}

export function AddNewPairButton() {
  return Button({ name: "Add new pair +" });
}
