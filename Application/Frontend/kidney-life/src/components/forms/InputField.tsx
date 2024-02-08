import AdditionalInfoIcon from "../miscellaneous/AdditionalInfoIcon";

type InputFieldProps = {
  name: string;
  text: string;
  value?: string;
  key: string;
  type?: string;
  description?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField(props: InputFieldProps) {
  return (
    <div className="bg-quaternary rounded p-3 md:p-2.75 mb-1 mt-3 text-sm flex flex-start 3xl:mt-3.5">
      <label className="text-primary font-medium mr-3 whitespace-nowrap">
        {props.text + ":"}
      </label>
      <input
        name={props.name}
        className="border-none appearance-none outline-none bg-transparent border-primary w-full remove-arrow"
        type={props.type ? props.type : "text"}
        onChange={props.onChange}
        value={props.value}
        required={true}
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
      />
      {props.description && <AdditionalInfoIcon text={props.description} />}
    </div>
  );
}

export default InputField;
