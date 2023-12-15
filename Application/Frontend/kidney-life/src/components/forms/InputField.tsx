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
    <div className="bg-quaternary rounded p-3 mb-3 text-sm flex justify-between">
      <label className="text-primary font-semibold mr-3">
        {props.text + ":"}
      </label>
      <input
        name={props.name}
        className="border-none outline-none bg-inherit border-primary w-7/12"
        type={props.type ? props.type : "text"}
        onChange={props.onChange}
        value={props.value}
      />
      {props.description && <AdditionalInfoIcon text={props.description} />}
    </div>
  );
}

export default InputField;
