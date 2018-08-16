import * as React from "react";

interface Props {
    name: string;
    placeholder?: string;
    value: string;
    onChange: (fieldName: string, value: string) => void;
    //onChange: () => void;
    error?: string;
    rows: number;
}

export const TextArea: React.StatelessComponent<Props> = (props) => {
    return (
        <div className={formatWrapperClass(props)}>
            <textarea
                className="form-control"
                name={props.name}
                rows={props.rows}
                value={props.value || ''}
                onChange={onChangeInput(props)}
                placeholder={props.placeholder} >
            </textarea>
        </div>
    )
};

const formatWrapperClass = (props: Props) => {
    const wrapperClass = '';

    return props.error && props.error.length > 0 ?
        `${wrapperClass} has-error` :
        wrapperClass;
};

const onChangeInput = (props: Props) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange(e.target.name, e.target.value);
};