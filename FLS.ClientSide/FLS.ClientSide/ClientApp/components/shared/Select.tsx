import * as React from "react";

interface Props {
    name: string;
    placeholder?: string;
    value: string | number;
    selectedOption: number | string;
    onChange: (fieldName: string, value: string) => void;
    //onChange: () => void;
    error?: string;
    options: IOption[]
}
interface IOption {
    id: string;
    name: string;
}

export const Select: React.StatelessComponent<Props> = (props) => {
    return (
        <div className={formatWrapperClass(props)}>
            <select
                name={props.name}
                value={props.selectedOption}
                onChange={onChangeInput(props)}
                className="form-control">
                <option value="">{props.placeholder}</option>
                {props.options.map(opt => {
                    return (
                        <option
                            key={opt.id}
                            value={opt.id}>{opt.name}
                        </option>
                    );
                })}
            </select>
        </div>
    )
};

const onChangeInput = (props: Props) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.name, e.target.value);
};

const formatWrapperClass = (props: Props) => {
    const wrapperClass = '';

    return props.error ?
        `${wrapperClass} has-error` :
        wrapperClass;
};
