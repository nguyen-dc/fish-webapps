import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { NavLink } from "react-router-dom";
import './index.css';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div className="display-flex column-flex">
            <div className="column">
                <span className='header text-center'>Các trang đã hoàn thành</span>
                <div id="nav_container">
                    <nav>
                        <div className="menu active" href="/">Danh mục
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
                        </div>
                        <div className="menu" href="/browse">
                            Nhập xuất hàng hóa
                            <ul>
                                <li><a >Quản lý nhập</a></li>
                                <li><a>Nhập mua hàng hóa thông thường</a></li>
                                <li><a>Quản lý xuất</a></li>
                                <li><a>Xuất bán hàng hóa thông thường</a></li>
                            </ul>
                        </div>
                        <div className="menu" href="/docs">Thu chi
                             <ul>
                                <li><a>Quản thu chi</a></li>
                                <li><a>Tạo phiếu thu</a></li>
                                <li><a>Tạo phiếu chi</a></li>
                            </ul>
                        </div>
                        <div className="menu" href="/stats">Quản lý nuôi cá
                             <ul>
                                <li><NavLink to="/dotnuoi" className="a-active">Đợt nuôi</NavLink></li>
                                <li><a>Nhập thả cá</a></li>
                                <li><a>Cho ăn</a></li>
                                <li><a>Rãi thuốc</a></li>
                                <li><a>Kiểm tra cá chết</a></li>
                                <li><a>Kiểm tra tăng trọng</a></li>
                                <li><a>Xuất bán cá thành phẩm</a></li>
                                <li><a>Xuất bán cá chết</a></li>
                            </ul>
                        </div>
                        <div className="menu" href="/about">Báo cáo
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
                        </div>
                        <div className="menu" href="/say_thanks">Hệ thống
                             <ul>
                                <li><a>Người dùng</a></li>
                                <li><a>Quyền người dùng</a></li>
                            </ul>
                         </div>
                    </nav>
                </div>
            </div>
            <div className="column">
                <span className='header'>Tiến độ</span>
                <span className='descript'>
                    Thứ tự các việc cần làm còn lại: lên các màn hình chính - Phân quyền - Đăng nhập/Đăng xuất - Các màn hình Quản lý/Phân quyền nhân viên - lên các màn hình báo cáo
                </span>
                <div className="contents">
                    <div className="times-line">
                        <ul>
                            <li>
                                <div>
                                    <div className="title expect">Màn hình danh sách phiếu xuất hàng</div>
                                    <div className="info">
                                        <p>Hiển thị, tìm kiếm phiếu xuất hàng</p>
                                        <p>Danh sách phiếu xuất</p>
                                    </div>
                                    <div className="type">Danh sách</div>
                                </div>
                                <span className="number">
                                    <span>07-10-2018</span>
                                </span>
                            </li>
                            <li>
                                <div>
                                    <div className="title expect">Màn hình danh sách phiếu nhập hàng</div>
                                    <div className="info">
                                        <p>Hiển thị, tìm kiếm phiếu nhập hàng</p>
                                        <p>Danh sách phiếu nhập</p>
                                    </div>
                                    <div className="type">Danh sách</div>
                                </div>
                                <span className="number">
                                    <span>07-10-2018</span>
                                </span>
                            </li>
                            <li>
                                <div>
                                    <div className="title expect">Màn hình chi tiết phiếu xuất hàng</div>
                                    <div className="info">
                                        <p>Hiển thị chi tiết 1 phiếu xuất hàng</p>
                                        <p>Bao gồm: thông tin phiếu, thông tin khách hàng, danh sách sản phẩm</p>
                                    </div>
                                    <div className="type">Hiển thị</div>
                                </div>
                                <span className="number">
                                    <span>07-10-2018</span>
                                </span>
                            </li>
                            <li>
                                <div>
                                    <div className="title expect">Màn hình chi tiết phiếu nhập hàng</div>
                                    <div className="info">
                                        <p>Hiển thị chi tiết 1 phiếu nhập hàng</p>
                                        <p>Bao gồm: thông tin phiếu, danh sách nhà cung cấp, danh sách sản phẩm, danh sách các phụ phí nếu có</p>
                                    </div>
                                    <div className="type">Hiển thị</div>
                                </div>
                                <span className="number">
                                    <span>06-10-2018</span>
                                </span>
                            </li>
                            <li>
                                <div>
                                    <div className="title expect">Chức năng xóa cho danh mục</div>
                                    <div className="info">
                                        <p>Chức năng xóa cho toàn bộ các trang danh mục</p>
                                    </div>
                                    <div className="type">Xóa</div>
                                </div>
                                <span className="number">
                                    <span>04-10-2018</span>
                                </span>
                            </li>
                            <li>
                                <div>
                                    <div className="title expect">Màn hình xuất hàng</div>
                                    <div className="info">
                                        <p>Lên màn hình xuất hàng hóa</p>
                                    </div>
                                    <div className="type">Thêm</div>
                                </div>
                                <span className="number">
                                    <span>04-10-2018</span>
                                </span>
                            </li>
                            <li>
                                <div>
                                    <div className="title expect">Màn hình nhập hàng</div>
                                    <div className="info">
                                        <p>Lên màn hình nhập hàng hóa thông thường</p>
                                    </div>
                                    <div className="type">Thêm</div>
                                </div>
                                <span className="number">
                                    <span>03-10-2018</span>
                                </span>
                            </li>
                            <li>
                                <div>
                                    <div className="title">Hoàn thành danh mục</div>
                                    <div className="info">
                                        <p>Lên cơ bản chức năng cho các danh mục</p>
                                        <p>Chức năng xóa dự kiến lên ngày 04-10-2018 cho tất cả danh mục</p>
                                    </div>
                                    <div className="type">Thêm - Cập nhật - Tìm kiếm</div>
                                </div>
                                <span className="number">
                                    <span>02-10-2018</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>;
    }
}