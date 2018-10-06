import * as React from 'react';
import './index.css'
import { Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';
export const EmptyTableMessage = (props) =>
    <tr>
        <td colSpan={99} className="text-center"><i>{props.message ? props.message : 'Không có dữ liệu!'}</i></td>
    </tr>;
export const EmptyRowMessage = (props) =>
    <div className="text-center">
        <span><i>{props.message ? props.message : 'Không có dữ liệu!'}</i></span>
    </div>;

const IsSystemTooltip = (
    <Tooltip id="is-system-tooltip"> thuộc hệ thống </Tooltip>
);
export const IsSystem = () =>
<div className="is-system">
    <OverlayTrigger placement="left" overlay={IsSystemTooltip}>
        <Glyphicon glyph='lock' />
    </OverlayTrigger>
</div>;
