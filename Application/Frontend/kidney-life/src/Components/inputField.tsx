type InputFieldProps = {
  name: string;
  text: string;
  value?: string;
  key: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField(props: InputFieldProps) {
  return (
    <div className="bg-quaternary p-3 mb-3">
      <label className="text-primary font-semibold mr-3">{props.text}</label>
      <input
        name={props.name}
        className="border-none outline-none bg-inherit border-primary w-9/12"
        type={props.type ? props.type : "text"}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}

export default InputField;
