
type SelectFieldProps = {
    name: string;
    text: string;
    options: string[];
    value: string;
    key: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};


function SelectField(props: SelectFieldProps) {
    return (
        <div className="bg-quaternary p-3 text-left flex mb-3">
            <label htmlFor={props.name} className="text-primary font-semibold mr-3">{props.text}</label>
            <select name={props.name} key={props.key} className="flex-grow border-0 bg-inherit outline-none border-primary"
                onChange={props.onChange} value={props.value}>
                {props.options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectField;
