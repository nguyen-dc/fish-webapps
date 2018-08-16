import * as React from "react";
import { RouteComponentProps } from 'react-router';

export class Code404 extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div>
                <h2>Trang không tồn tại!</h2>
            </div>
            );
    }
}