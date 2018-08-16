import * as React from 'react';

interface Props {
    name: string;
    label: string;
    isChecked: boolean;
    disabled?: boolean;
    onChange: (fieldName: string, value: boolean) => void;
    error?: string;
}

export const Checkbox: React.StatelessComponent<Props> = (props) => {
    return (
        <div>
            <label className="checkbox-inline">
            <input
                type="checkbox"
                name={props.name}
                checked={props.isChecked}
                disabled={props.disabled}
                onChange={onChangeCheckbox(props)} />
                {props.label}
            </label>
        </div>
    );
}

const onChangeCheckbox = (props: Props) => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.name, e.target.checked);
};

