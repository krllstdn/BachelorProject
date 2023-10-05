import Button from "../buttons/Button";
import BlurredBackdrop from "../wrappers/BlurredBackdrop";
import ModalContainer from "../wrappers/ModalContainer";
import CloseButton from "../buttons/CloseButton";

type ConfirmDeleteProps = {
  onClickYes?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickNo?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function ConfirmDelete(props: ConfirmDeleteProps) {
  return (
    <BlurredBackdrop>
      <ModalContainer className="w-1/2 p-8 xl:w-1/3">
        <h1 className="text-center text-2xl font-semibold mb-3">
          Are you sure you want to delete this patient? All pairs associated
          with this patient will also be deleted.
        </h1>
        <div className="flex justify-evenly">
          <Button
            name="Yes"
            additionalStyles="pr-9 pl-9 p-3"
            onClick={props.onClickYes}
          />
          <Button
            name="No"
            additionalStyles="pr-9 pl-9 p-3"
            onClick={props.onClickNo}
          />
        </div>
        <CloseButton onClick={props.onClose} styles="pr-4 pt-2" />
      </ModalContainer>
    </BlurredBackdrop>
  );
}

export default ConfirmDelete;
