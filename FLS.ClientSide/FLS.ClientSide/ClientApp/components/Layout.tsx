import * as React from 'react';
import { NavMenu } from './NavMenu';
import Notifications, { notify } from 'react-notify-toast';
import { PropTypes } from 'react';
import './index.css';

export interface LayoutProps {
    children?: React.ReactNode;
    id?: React.ReactChild;
}
interface LayoutState {
    isShowMessage: boolean;
    type: 'success' | 'warning' | 'error',
    message: string;
}
export class Layout extends React.Component<LayoutProps, LayoutState> {
    constructor(props) {
        super(props);
        this.state = {
            isShowMessage: false,
            message: '',
            type: 'error',
        }
    }
    static childContextTypes = {
        ShowGlobalMessage: PropTypes.func,
    }

    getChildContext() {
        return {
            ShowGlobalMessage: this.ShowGlobalMessage.bind(this),
        }
    }
    public ShowGlobalMessage(type: 'success' | 'warning' | 'error', message: string) {
        this.setState({
            isShowMessage: true,
            message: message,
            type: type
        }, () => {
            setTimeout(function (this) {
                this.setState({
                    isShowMessage: false,
                })
            }, 3000);
        });
    }
    public render() {
        let { isShowMessage, type, message } = this.state;
        let wrapperAttr = {
            className: 'global-message ' + type
        }
        return <div className='container-fluid'>
            {
                isShowMessage ?
                    <div {...wrapperAttr}>
                        <strong>{message}</strong>
                    </div>
                    : null
            }
            <div className='row'>
                <div className='col-sm-12'>
                    <NavMenu />
                </div>
                <div className='col-sm-12'>
                    { this.props.children }
                </div>
                <Notifications options={{ zIndex: 9999, top: '10px' }}  />
            </div>
        </div>;
    }
}
