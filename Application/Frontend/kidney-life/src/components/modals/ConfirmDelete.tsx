import Button from "../buttons/Button";
import BlurredBackdrop from "../wrappers/BlurredBackdrop";

type ConfirmDeleteProps = {
  onClickYes?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickNo?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function ConfirmDelete(props: ConfirmDeleteProps) {
  return (
    <BlurredBackdrop>
      <div
        className="relative w-1/2 bg-secondary pr-5 pl-5 pt-5 pb-8
                            rounded-md border-2 border-primary"
      >
        <h1 className="text-center text-2xl font-semibold mb-3">
          Are you sure you want to delete this?
        </h1>
        <div className="flex justify-evenly">
          <Button
            name="Yes"
            additionalStyles="w-24"
            onClick={props.onClickYes}
          />
          <Button name="No" additionalStyles="w-24" onClick={props.onClickNo} />
        </div>
        <button
          className="absolute top-0 right-0 text-primary pr-4 pt-2
                                    text-3xl"
          onClick={props.onClose}
        >
          &times;
        </button>
      </div>
    </BlurredBackdrop>
  );
}

export default ConfirmDelete;
