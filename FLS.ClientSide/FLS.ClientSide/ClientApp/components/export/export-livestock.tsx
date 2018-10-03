import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { UnderConstructor } from "../shared/under-constructor";

export class ExportLivestocks extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any){
        super(props)
    }

    render() {
        return (
            <UnderConstructor /> ||
            <div>
                <h3>Xuất bán Cá</h3>
            </div>
            );
    }
}