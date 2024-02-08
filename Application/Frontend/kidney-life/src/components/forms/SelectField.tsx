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
  // key: string;
  description?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function SelectFieldCox(props: SelectFieldCoxProps) {
  return (
    <div className="bg-quaternary rounded p-3 md:p-2.75 md:pl-2 md:pr-2 text-left flex flex-start mb-1 mt-3 text-sm 3xl:mt-3.5">
      <label
        htmlFor={props.name}
        className="text-primary  font-medium mr-3 whitespace-nowrap"
      >
        {props.text + ":"}
      </label>
      <select
        name={props.name}
        // key={props.key} // "key is not a prop."
        className="flex-grow border-0 bg-inherit outline-none border-primary w-full"
        onChange={props.onChange}
        value={props.value}
      >
        <option value="" disabled>
          Select an option
        </option>
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
