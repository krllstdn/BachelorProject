import Button from "./Button";

type ButtonComponentProps = {
  onClickNew: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickExisting: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function AddNewPair(props: ButtonComponentProps) {
  return (
    <div
      className="absolute top-0 left-0 z-10 flex justify-center 
                 items-center bg-opacity-10 bg-black backdrop-blur-sm 
                 h-screen w-screen"
    >
      <div
        className="relative w-96 bg-secondary pr-5 pl-5 pt-5 pb-8
                            rounded-md border-2 border-primary"
      >
        <h1 className="text-center text-2xl font-semibold">Add new pair</h1>
        <div className="flex flex-col space-y-4">
          <Button name="New patients" onClick={props.onClickNew} />
          <Button name="Existing patients" onClick={props.onClickExisting} />
        </div>
        <button
          className="absolute top-0 right-0 text-primary pr-2
                                    text-3xl"
          onClick={props.onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default AddNewPair;
