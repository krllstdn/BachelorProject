import AdditionalInfoIcon from "../miscellaneous/AdditionalInfoIcon";

type Option = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  name: string;
  text: string;
  options: string[];
  value: string;
  key: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function SelectField(props: SelectFieldProps) {
  return (
    <div className="bg-quaternary p-3 text-left flex mb-3">
      <label htmlFor={props.name} className="text-primary font-semibold mr-3">
        {props.text}
      </label>
      <select
        name={props.name}
        key={props.key}
        className="flex-grow border-0 bg-inherit outline-none border-primary"
        onChange={props.onChange}
        value={props.value}
      >
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

type SelectFieldCoxProps = {
  name: string;
  text: string;
  options: Option[];
  value: string | number;
  key: string;
  description?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function SelectFieldCox(props: SelectFieldCoxProps) {
  return (
    <div className="bg-quaternary rounded p-3 text-left flex flex-start mb-3 text-sm">
      <label
        htmlFor={props.name}
        className="text-primary  font-semibold mr-3 whitespace-nowrap"
      >
        {props.text + ":"}
      </label>
      <select
        name={props.name}
        key={props.key}
        className="flex-grow border-0 bg-inherit outline-none border-primary w-full"
        onChange={props.onChange}
        value={props.value}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {props.description && <AdditionalInfoIcon text={props.description} />}
    </div>
  );
}
