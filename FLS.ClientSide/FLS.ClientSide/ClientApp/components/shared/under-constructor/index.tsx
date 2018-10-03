import * as React from 'react';
import { Glyphicon } from 'react-bootstrap';
import './index.css';

export class UnderConstructor extends React.PureComponent<any, any>{
    constructor() {
        super();
        this.state = {
            isShow: false
        }
    }
    componentDidMount() {
        let prevThis = this;
        setTimeout(function () {
            prevThis.setState({
                isShow: true,
            })
        }, 0);
    }
    render() {
        let classes = {
            className: this.state.isShow ? 'construct-container on-show' : 'construct-container on-hide'
        }
        return (
            <div {...classes}>
                <Glyphicon className='construct-icon' glyph='flag' />
                <span className='construct-head'>Trang đang trong quá trình xây dựng.</span>
                <span className='construct-descript'>Sẽ được hoàn thiện phục vụ bạn trong thời gian sớm nhất.</span>
            </div>
        );
    }
}