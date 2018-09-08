import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { isEqual } from 'lodash';
import { ChangeEvent } from 'react';
import { NumberHandle } from '../../../handles/handles';
interface FormatedInputProps {
    className?: string,
    type?: 'number' | 'currency',
    id?: number | string,
    name?: string,
    value?: number | string,
    min?: number,
    max?: number,
    required?: boolean,
    placeholder?: string,
    readOnly?: boolean,
    onValueChange?: Function,
}
interface FormatedInputState {
    className: string,
    type: 'number' | 'currency',
    id: string,
    name: string,
    value: string,
    min: number,
    max: number,
    formatedValue: string,
    displayValue: string,
    required: boolean,
    placeholder: string,
    readOnly: boolean,
}
export class FormatedInput extends React.PureComponent<FormatedInputProps, FormatedInputState>{
    constructor(props: FormatedInputProps) {
        super(props);
        let formatedValue = props.value ? props.value + '' : null;
        formatedValue = this.formatValue(formatedValue, props.type);
        let value = '';
        if (props.type == 'number' || props.type == 'currency') {
            value = props.value ? props.value + '' : '0';
        } else {
            value = props.value ? props.value + '' : '';
        }
        this.state = {
            className: props.className ? props.className : null,
            type: props.type ? props.type : null,
            id: props.id ? props.id + '' : null,
            name: props.name ? props.name : null,
            value: value,
            min: props.min ? props.min : null,
            max: props.max ? props.max : null,
            formatedValue: formatedValue,
            displayValue: formatedValue,
            required: props.required ? props.required : false,
            placeholder: props.placeholder ? props.placeholder : null,
            readOnly: props.readOnly ? props.readOnly : false,
        };
    }
    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props, nextProps)) {
            this.setState({
                className: nextProps.className ? nextProps.className : null,
                type: nextProps.type ? nextProps.type : null,
                value: nextProps.value ? nextProps.value : null,
                min: nextProps.min ? nextProps.min : null,
                max: nextProps.max ? nextProps.max : null,
                required: nextProps.required ? nextProps.required : false,
                placeholder: nextProps.placeholder ? nextProps.placeholder : null,
                readOnly: nextProps.readOnly ? nextProps.readOnly : false,
            });
        }
    }
    formatValue(value, type = null): string {
        if (!type)
            type = this.state.type;
        let formated = value + '';
        if (type == 'number') {
            formated = NumberHandle.FormatNumber(value);
        }
        if (type == 'currency') {
            formated = NumberHandle.FormatCurrency(value);
        }
        return formated;
    }
    onFocus() {
        this.setState({ displayValue: this.state.value });
    }
    onBlur() {
        let { value, formatedValue } = this.state;
        if (this.state.type == 'number' || this.state.type == 'currency')
            value = Number(value) + '';
        this.setState({ displayValue: formatedValue, value: value });
    }
    onValueChange(e) {
        let value = e.target.value;
        let formated = value;
        formated = this.formatValue(e.target.value);
        this.setState({ value: value, displayValue: value, formatedValue: formated });
        if (this.props.onValueChange)
            this.props.onValueChange({ name: this.state.name, value: value });
    }

    render() {
        let { className, id, name, min, max, displayValue, required, placeholder, readOnly, } = this.state;
        let wrappers = {
            className, id, name, min, max,
            required, placeholder, readOnly,
        };
        
        return (
            <input value={displayValue} {...wrappers} onFocus={() => this.onFocus()} onBlur={() => this.onBlur()} onChange={(e) => this.onValueChange(e)} />
        );
    }
}
