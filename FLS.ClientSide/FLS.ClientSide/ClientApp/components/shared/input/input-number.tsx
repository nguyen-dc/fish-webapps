import * as React from 'react';
import '../index.css'
import { _HNumber } from '../../../handles/handles';
interface InputNumberProps {
    value?: number,
    className?: string,
    prefix?: string,
    suffix?: string,
    hasScale?: boolean,
    onChange: Function,
}
interface InputNumberState {
    value: string | number;
    formated: string;
    isFocus: boolean;
}
const MatchDecimal = new RegExp('^[0-9]+([\.]{0,1})[0-9]*$');
const MatchInt = new RegExp('^[0-9]+$');
export class InputNumber extends React.Component<InputNumberProps, InputNumberState> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: props.value,
            formated: this.format(props.value),
            isFocus: false,
        }
        this.oldValue = props.value ? props.value : 0;
    }
    oldValue: number = 0;
    format(value) {
        return _HNumber.FormatNumber(value);
    }
    private onChange(e) {
        let value: number;
        if (this.props.hasScale == true) {
            e.target.value = e.target.value.replace(/^0+/, '').replace(/^\./, '0.');
            if (!e.target.value) {
                value = 0;
                this.oldValue = 0;
            } else {
                if (MatchDecimal.test(e.target.value)) {
                    value = e.target.value;
                    this.oldValue = value;
                }
                else {
                    value = this.oldValue;
                }
            }
        } else {
            e.target.value = e.target.value.replace(/^0+/, '');
            if (!e.target.value) {
                value = 0;
                this.oldValue = 0;
            } else {
                if (MatchInt.test(e.target.value)) {
                    value = e.target.value;
                    this.oldValue = value;
                }
                else {
                    value = this.oldValue;
                }
            }
        }
        this.setState({ value });
    }
    private onFocus() {
        this.setState({ isFocus: true })
    }
    private onBlur() {
        let formated = _HNumber.FormatNumber(this.state.value);
        this.setState({ formated, isFocus: false })
        this.props.onChange(this.state.value);
    }
    public render() {
        let { ...props } = this.props;
        let { ...state } = this.state;
        return <div className='input-control'>
            {props.prefix ? <div className='prefix'>{props.prefix}</div> : null}
            <input
                className={props.className}
                value={state.isFocus == true ? state.value : state.formated}
                onChange={(e) => this.onChange(e)}
                onFocus={() => this.onFocus()}
                onBlur={() => this.onBlur()}
            />
            {props.suffix ? <div className='suffix'>{props.suffix}</div> : null}
        </div>
    }
}