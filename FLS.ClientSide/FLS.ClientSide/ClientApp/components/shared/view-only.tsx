import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { Props } from 'react';
export const EmptyTableMessage = (props) =>
    <tr>
        <td colSpan={99} className="text-center"><i>{props.message ? props.message : 'Không có dữ liệu!'}</i></td>
    </tr>;
export const EmptyRowMessage = (props) =>
    <div className="text-center">
        <span><i>{props.message ? props.message : 'Không có dữ liệu!'}</i></span>
    </div>;