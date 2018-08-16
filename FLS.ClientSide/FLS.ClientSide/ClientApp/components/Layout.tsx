import * as React from 'react';
import { NavMenu } from './NavMenu';
import Notifications, { notify } from 'react-notify-toast';
export interface LayoutProps {
    children?: React.ReactNode;
    id?: React.ReactChild;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
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
