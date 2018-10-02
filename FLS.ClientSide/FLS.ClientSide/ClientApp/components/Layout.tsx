import * as React from 'react';
import { NavMenu } from './NavMenu';
import Notifications, { notify } from 'react-notify-toast';
import { PropTypes } from 'react';
import './index.css';
import { StringStringPair } from '../models/shared';

export interface LayoutProps {
    children?: React.ReactNode;
    id?: React.ReactChild;
}
interface LayoutState {
    isShowMessage: boolean;
    type: 'success' | 'warning' | 'error',
    messages: StringStringPair[];
}
const timeOut = 2500;
export class Layout extends React.Component<LayoutProps, LayoutState> {
    constructor(props) {
        super(props);
        this.state = {
            isShowMessage: false,
            messages: [],
            type: 'error',
        }
    }
    static childContextTypes = {
        ShowGlobalMessage: PropTypes.func,
        ShowGlobalMessages: PropTypes.func,
    }

    getChildContext() {
        return {
            ShowGlobalMessage: this.ShowGlobalMessage.bind(this),
            ShowGlobalMessages: this.ShowGlobalMessages.bind(this),
        }
    }
    ShowGlobalMessage(type: 'success' | 'warning' | 'error', message: string) {
        let prevThis = this;
        let messages = [] as StringStringPair[];
        messages.push(new StringStringPair('t-gn-mssg', message));
        this.setState({
            isShowMessage: true,
            messages: messages,
            type: type
        }, () => {
            setTimeout(function (this) {
                prevThis.setState({
                    isShowMessage: false,
                })
            }, timeOut);
        });
    }
    ShowGlobalMessages(type: 'success' | 'warning' | 'error', messages: StringStringPair[]) {
        let prevThis = this;
        this.setState({
            isShowMessage: true,
            messages: messages,
            type: type
        }, () => {
            setTimeout(function (this) {
                prevThis.setState({
                    isShowMessage: false,
                })
            }, timeOut);
        });
    }
    public render() {
        let { isShowMessage, type, messages } = this.state;
        let wrapperAttr = {
            className: isShowMessage ? 'fade-in global-message ' + type : 'fade-out global-message ' + type
        }
        return <div className='container-fluid'>
            <div {...wrapperAttr}>
                {
                    messages.map((m, i) => {
                        return <p key={type + '-' + i + '-' + m.key}><strong>{m.value}</strong></p>
                    })
                }
            </div>
            <div className='row'>
                <div className='col-sm-12'>
                    <NavMenu />
                </div>
                <div className='col-sm-12'>
                    { this.props.children }
                </div>
                {/*<Notifications options={{ zIndex: 9999, top: '10px' }}  />*/}
            </div>
        </div>;
    }
}
