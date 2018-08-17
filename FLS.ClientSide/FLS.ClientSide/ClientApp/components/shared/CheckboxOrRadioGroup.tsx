import * as React from 'react';

interface Props {
    inputType: string;
    name: string;
    checked: boolean;
    onChange: (fieldName: string, value: string) => void;
    error?: string;
}

export const CheckboxOrRadioGroup: React.StatelessComponent<Props> = (props) => {
    return(
        <div className = { formatWrapperClass(props) } >
            <input
                className=""
                type={props.inputType}
                name={props.name}
                defaultChecked={props.checked || false}
                onChange={onChangeInput(props)} />
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

