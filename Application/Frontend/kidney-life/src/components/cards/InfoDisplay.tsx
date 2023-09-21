import React from "react";
import { formTypes, infoDisplayTypes } from "../../helpers/constants";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";

type InfoDisplayProps = {
  data: {
    header: string;
    fields: {
      [key: string]: string;
    };
  };
  styles?: string;
  textSize?: string;
  onDelete?: () => void;
  onEdit?: () => void;
  type?: string;
  isAddNewPairExisting?: boolean;
};

InfoDisplay.defaultProps = {
  textSize: "text-3xl",
  type: infoDisplayTypes.OTHER,
  isAddNewPairExisting: false,
};

function InfoDisplay(props: InfoDisplayProps) {
  const { data } = props;

  return (
    <div className="info-display flex-grow mt-2">
      <div
        className={"bg-secondary rounded-md text-lg relative " + props.styles}
      >
        <h2 className={props.textSize + " font-semibold mb-3"}>
          {data.header}
        </h2>
        <ul>
          {Object.entries(data.fields).map(([key, value]) => (
            <li key={key} className="text-xl mb-1">
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
        {props.type !== infoDisplayTypes.OTHER &&
          !props.isAddNewPairExisting && (
            <div>
              <EditButton onClick={props.onEdit} />
              <DeleteButton onClick={props.onDelete} />
            </div>
          )}
        {props.isAddNewPairExisting && (
          <div>
            <EditButton onClick={props.onEdit} styles="top-12 right-0 p-3" />
            <DeleteButton onClick={props.onDelete} styles="top-0 right-0 p-3" />
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoDisplay;
