import * as React from 'react';
import { isEqual } from 'lodash';
import { _HNumber } from '../../../handles/handles';
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
    onValueChange: Function,
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
    isFocus: boolean,
}
export class FormatedInput extends React.PureComponent<FormatedInputProps, FormatedInputState>{
    constructor(props: FormatedInputProps) {
        super(props);
        let formatedValue = props.value ? props.value + '' : null;
        formatedValue = this.formatValue(formatedValue, props.type);
        let value = '';
        if (props.type == 'number' || props.type == 'currency') {
            value = props.value ? props.value + '' : '';
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
            isFocus: false,
        };
    }
    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props, nextProps)) {
            let { type, isFocus } = this.state;
            let formatedValue = nextProps.value ? nextProps.value + '' : null;
            formatedValue = this.formatValue(formatedValue, type);
            let value = '';
            if (type == 'number' || type == 'currency') {
                value = nextProps.value ? nextProps.value + '' : '';
            } else {
                value = nextProps.value ? nextProps.value + '' : '';
            }
            let displayValue = isFocus ? value : formatedValue;
            this.setState({
                className: nextProps.className ? nextProps.className : null,
                value: value,
                formatedValue: formatedValue,
                displayValue: displayValue,
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
            formated = _HNumber.FormatNumber(value);
        }
        if (type == 'currency') {
            formated = _HNumber.FormatCurrency(value);
        }
        return formated;
    }
    onFocus() {
        this.setState({ displayValue: this.state.value, isFocus: true });
    }
    onBlur() {
        let { value, formatedValue } = this.state;
        if (this.state.type == 'number' || this.state.type == 'currency')
            value = Number(value) + '';
        this.setState({ displayValue: formatedValue, value: value, isFocus: false });
    }
    onValueChange(e) {
        let value = null;
        if (this.state.type == 'number' || this.state.type == 'currency') {
            if (Number.isNaN(e.target.value))
                return;
            else value = Number.parseFloat(e.target.value);
        } else
            value = e.target.value;
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
