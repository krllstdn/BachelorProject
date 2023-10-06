import Button from "../buttons/Button";
import BlurredBackdrop from "../wrappers/BlurredBackdrop";
import ModalContainer from "../wrappers/ModalContainer";
import CloseButton from "../buttons/CloseButton";
import { deleteDonor, deleteRecipient } from "../../services/api";

type ConfirmDeleteProps = {
  // onClickYes?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  refresh?: () => void;
  onClose: () => void;
  patientId?: number; // make sure that the patientId is passed, NOT INDEX
  isRecipient?: boolean;
};

ConfirmDelete.defaultProps = {
  isRecipient: true, // TODO: maybe delete this later
};

function ConfirmDelete(props: ConfirmDeleteProps) {
  const handleYesClick = () => {
    if (props.isRecipient && props.patientId) {
      deleteRecipient(props.patientId);
      props.refresh!();
    }
    if (!props.isRecipient && props.patientId) {
      deleteDonor(props.patientId);
      props.refresh!();
    }
    props.onClose();
  };

  return (
    <BlurredBackdrop>
      <ModalContainer className="w-1/2 p-8 xl:w-1/3">
        <h1 className="text-center text-2xl font-semibold mb-3">
          Are you sure you want to delete this
          {props.isRecipient ? " recipient" : " donor"}? All pairs associated
          with this patient will also be deleted.
        </h1>
        <div className="flex justify-evenly">
          <Button
            name="Yes"
            additionalStyles="pr-9 pl-9 p-3"
            onClick={handleYesClick}
          />
          <Button
            name="No"
            additionalStyles="pr-9 pl-9 p-3"
            onClick={props.onClose}
          />
        </div>
        <CloseButton onClick={props.onClose} styles="pr-4 pt-2" />
      </ModalContainer>
    </BlurredBackdrop>
  );
}

export default ConfirmDelete;
