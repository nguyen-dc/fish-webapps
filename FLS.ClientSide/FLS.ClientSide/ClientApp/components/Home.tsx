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
                    <div className="times-line">
                        <ul>
                            <li><span></span>
                                <div>
                                    <div className="title">Codify</div>
                                    <div className="info">Let&apos;s make coolest things in css</div>
                                    <div className="type">Presentation</div>
                                </div>
                                <span className="number">
                                    <span>9/9/2018</span>
                                </span>
                            </li>
                            <li>
                                <div><span></span>
                                    <div className="title">Codify</div>
                                    <div className="info">Let&apos;s make coolest things in javascript</div>
                                    <div className="type">Presentation</div>
                                </div>
                                <span className="number">
                                    <span>7/9/2018</span>
                                </span>
                            </li>
                            <li>
                                <div><span></span>
                                    <div className="title">Codify</div>
                                    <div className="info">Let&apos;s make coolest things in css</div>
                                    <div className="type">Review</div>
                                </div> <span className="number">
                                    <span>5/9/2018</span>
                                </span>
                            </li>
                            <li><span></span>
                                <div>
                                    <div className="title">Codify</div>
                                    <div className="info">Let&apos;s make coolest things in css</div>
                                    <div className="type">Presentation</div>
                                </div>
                                <span className="number">
                                    <span>10:00</span>
                                </span>
                            </li>
                            <li>
                                <div><span></span>
                                    <div className="title">Codify</div>
                                    <div className="info">Let&apos;s make coolest things in javascript</div>
                                    <div className="type">Presentation</div>
                                </div>
                                <span className="number">
                                    <span>13:00</span>
                                </span>
                            </li>
                            <li>
                                <div><span></span>
                                    <div className="title">Codify</div>
                                    <div className="info">Let&apos;s make coolest things in css</div>
                                    <div className="type">Review</div>
                                </div> <span className="number">
                                    <span>17:45</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>;
    }
}