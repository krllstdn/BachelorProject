import Button from "../buttons/Button";
import BlurredBackdrop from "../wrappers/BlurredBackdrop";
import CloseButton from "../buttons/CloseButton";

type ButtonComponentProps = {
  onClickNew: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickExisting: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function AddNewPair(props: ButtonComponentProps) {
  return (
    <BlurredBackdrop>
      <div
        className="relative w-96 bg-secondary pr-5 pl-5 pt-7 pb-8
                            rounded-md border-2 border-primary"
      >
        <h1 className="text-center text-2xl font-semibold mb-3">
          Add new pair
        </h1>
        <div className="flex flex-col space-y-4">
          <Button name="New patients" onClick={props.onClickNew} />
          <Button name="Existing patients" onClick={props.onClickExisting} />
        </div>
        <CloseButton styles="pr-3 pt-3" onClick={props.onClose} />
      </div>
    </BlurredBackdrop>
  );
}

export default AddNewPair;
