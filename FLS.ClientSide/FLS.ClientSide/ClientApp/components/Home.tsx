import * as React from "react";
import { RouteComponentProps } from 'react-router';
export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div className="display-flex column-flex">
            <div className="column">
                <div id="nav_container">
                    <nav>
                        <a href="/">Danh mục</a>
                        <a href="/browse" className="active">Nhập xuất hàng hóa</a>
                        <a href="/docs">Thu chi</a>
                        <a href="/news">News</a> <a href="/stats">Quản lý nuôi cá</a>
                        <a href="/about">Báo cáo</a>
                        <a href="/say_thanks">Hệ thống</a>
                    </nav>
                </div>
            </div>
            <div className="column">
                <div className="contents">
                    <div>
                        <h3>Ngày cập nhật: 11/09/2018</h3>
                        <p>A sublime plugin complete with Bootstrap 3 snippets</p>
                        <p>Feel free to let me know what else you want added via:</p>
                        <p>Bootstrap 3 - Sublime Plugin is open-sourced software licensed under the</p>
                    </div>
                </div>
            </div>
        </div>;
    }
}