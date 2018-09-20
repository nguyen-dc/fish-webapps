import * as React from "react";
import { RouteComponentProps } from 'react-router';
export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div className="display-flex column-flex">
            <div className="column">
                <div id="nav_container">
                    <nav>
                        <a className="active" href="/">Danh mục
                             <ul>
                                <li><a >Vùng nuôi</a></li>
                                <li><a className="a-active">Ao nuôi</a></li>
                                <li><a>Đợt nuôi</a></li>
                                <li><a>Kho</a></li>
                                <li><a>Ngành hàng</a></li>
                                <li><a>Nhóm hàng</a></li>
                                <li><a>Đơn vị tính</a></li>
                                <li><a>Sản phẩm</a></li>
                                <li><a>Khách hàng</a></li>
                                <li><a>Nhà cung cấp</a></li>
                                <li><a>Loại kho</a></li>
                                <li><a>Loại phiếu nhập</a></li>
                                <li><a>Loại phiếu xuất</a></li>
                                <li><a>Loại phiếu thu/chi</a></li>
                            </ul>
                            </a>
                        <a href="/browse">
                            Nhập xuất hàng hóa
                            <ul>
                                <li><a >Quản lý nhập</a></li>
                                <li><a>Nhập mua hàng hóa thông thường</a></li>
                                <li><a>Quản lý xuất</a></li>
                                <li><a>Xuất bán hàng hóa thông thường</a></li>
                            </ul>
                        </a>
                        <a href="/docs">Thu chi
                             <ul>
                                <li><a>Quản thu chi</a></li>
                                <li><a>Tạo phiếu thu</a></li>
                                <li><a>Tạo phiếu chi</a></li>
                            </ul>
                            </a>
                        <a href="/stats">Quản lý nuôi cá
                             <ul>
                                <li><a>Nhập thả cá</a></li>
                                <li><a>Cho ăn</a></li>
                                <li><a>Rãi thuốc</a></li>
                                <li><a>Kiểm tra cá chết</a></li>
                                <li><a>Kiểm tra tăng trọng</a></li>
                                <li><a>Xuất bán cá thành phẩm</a></li>
                                <li><a>Xuất bán cá chết</a></li>
                            </ul>
                            </a>
                        <a href="/about">Báo cáo
                             <ul>
                                <li><a>Nhật ký ao nuôi</a></li>
                                <li><a>Theo dõi tăng trọng</a></li>
                                <li><a>Theo dõi cá giống</a></li>
                                <li><a>Xuất vật tư</a></li>
                                <li><a>Nhập xuất tồn</a></li>
                                <li><a>Thu chi theo ao</a></li>
                                <li><a>Chi phí theo ao</a></li>
                                <li><a>Theo dõi doanh thu</a></li>
                            </ul>
                            </a>
                        <a href="/say_thanks">Hệ thống
                             <ul>
                                <li><a>Người dùng</a></li>
                                <li><a>Quyền người dùng</a></li>
                            </ul>
                         </a>
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