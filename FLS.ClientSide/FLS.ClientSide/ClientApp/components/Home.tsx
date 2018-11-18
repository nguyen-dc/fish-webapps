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
                                <li><NavLink to="/vungnuoi" className="a-active">Vùng nuôi</NavLink></li>
                                <li><NavLink to="/aonuoi" className="a-active">Ao nuôi</NavLink></li>
                                <li><NavLink to="/kho" className="a-active">Kho</NavLink></li>
                                <li><NavLink to="/nganhhang" className="a-active">Ngành hàng</NavLink></li>
                                <li><NavLink to="/nhomhang" className="a-active">Nhóm hàng</NavLink></li>
                                <li><NavLink to="/donvitinh" className="a-active">Đơn vị tính</NavLink></li>
                                <li><NavLink to="/sanpham" className="a-active">Sản phẩm</NavLink></li>
                                <li><NavLink to="/khachhang" className="a-active">Khách hàng</NavLink></li>
                                <li><NavLink to="/nhacungcap" className="a-active">Nhà cung cấp</NavLink></li>
                                <li><NavLink to="/loaikho" className="a-active">Loại kho</NavLink></li>
                                <li><NavLink to="/loaiphieunhap" className="a-active">Loại phiếu nhập</NavLink></li>
                                <li><NavLink to="/loaiphieuxuat" className="a-active">Loại phiếu xuất</NavLink></li>
                                <li><NavLink to="/loaiphieuthuchi" className="a-active">Loại phiếu thu/chi</NavLink></li>
                            </ul>
                        </div>
                        <div className="menu" href="/browse">
                            Nhập xuất hàng hóa
                            <ul>
                                <li><NavLink to="/quanlynhap" className="a-active">Quản lý nhập</NavLink></li>
                                <li><NavLink to="/quanlynhap/nhaphang" className="a-active">Nhập mua hàng</NavLink></li>
                                <li><NavLink to="/quanlyxuat" className="a-active">Quản lý xuất</NavLink></li>
                                <li><NavLink to="/quanlyxuat/xuathang" className="a-active">Xuất bán hàng</NavLink></li>
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
                                <li><NavLink to="/nhapthaca">Nhập thả cá</NavLink></li>
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
                        <div className="menu" href="/saythanks">Hệ thống
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
                            <li><span></span>
                                <div>
                                    <div className="title">Màn hình danh sách phiếu xuất hàng</div>
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
                                    <div className="title">Màn hình danh sách phiếu nhập hàng</div>
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
                                    <div className="title">Màn hình chi tiết phiếu xuất hàng</div>
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
                                    <div className="title">Màn hình chi tiết phiếu nhập hàng</div>
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
                                    <div className="title">Chức năng xóa cho danh mục</div>
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
                                    <div className="title">Màn hình xuất hàng</div>
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
                                    <div className="title">Màn hình nhập hàng</div>
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