import * as React from "react";

interface Props {
    inputType?: string;
    name?: string;
    placeholder?: string;
    value?: string | number;
    required?: boolean;
    onChange?: (fieldName: string, value: string) => void;
    error?: string;
    readOnly?: boolean;
}
export const Input: React.StatelessComponent<Props> = (props) => {
    return (
        <div className={formatWrapperClass(props)} >
            <input
                className="form-control"
                type={props.inputType}
                name={props.name}
                value={props.value || ''}
                required={props.required || false}
                onChange={onChangeInput(props)}
                placeholder={props.placeholder}
                readOnly={props.readOnly || false}/>
        </div>
    )
}
const formatWrapperClass = (props: Props) => {
    const wrapperClass = '';
    return props.error && props.error.length > 0 ?
        `${wrapperClass} has-error` :
        wrapperClass;
};

const onChangeInput = (props: Props) => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.name, e.target.value);
};