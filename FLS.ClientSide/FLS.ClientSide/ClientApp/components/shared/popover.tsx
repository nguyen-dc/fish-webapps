import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Overlay, Popover } from 'react-bootstrap';
import { ProductTableChoose } from '../product/product-table-choose';

interface PopOverlayProps {
    id: string,
    container?: any,
    overlay?: any,
    playment?: string,
}
export class PopOverlay extends React.Component<PopOverlayProps, any> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            Show: false,
        }
    }
    target = null;
    getTarget() {
        return ReactDOM.findDOMNode(this.target);
    }
    public handleToggle() {
        this.setState({ Show: !this.state.Show });
    }
    render() {
        const sharedProps = {
            container: this,
            target: this.getTarget.bind(this),
            show: this.state.Show,
            placement: this.props.playment && 'bottom'
        };

        return (
            <div className='col-sm-12' ref={thisref => { this.target = thisref }} onClick={() => this.handleToggle()}>
                {this.props.container}
                <Overlay {...sharedProps} >
                    <Popover id={this.props.id}>
                        {this.props.overlay}
                    </Popover>
                </Overlay>
            </div>
        );
    }
}