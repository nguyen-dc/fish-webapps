import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';

export class ExportReports extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any){
        super(props)
    }

    render() {
        return (
            <div>
                <h3>Báo cáo xuất vật tư</h3>
            </div>
            );
    }
}