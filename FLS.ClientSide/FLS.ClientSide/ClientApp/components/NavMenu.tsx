import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className="master">
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="">F&LS</a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Danh mục<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><NavLink to="/vungnuoi" >Vùng nuôi</NavLink></li>
                                    <li><NavLink to="/aonuoi" >Ao nuôi</NavLink></li>
                                    <li><NavLink to="/dotnuoi" >Đợt nuôi</NavLink></li>
                                    <li><NavLink to="/kho" >Kho</NavLink></li>
                                    <li className="divider-vertical"></li>
                                    <li><NavLink to="/nganhhang" >Ngành hàng</NavLink></li>
                                    <li><NavLink to="/nhomhang" >Nhóm hàng</NavLink></li>
                                    <li><NavLink to="/donvitinh" >Đơn vị tính</NavLink></li>
                                    <li><NavLink to="/sanpham" >Sản phẩm</NavLink></li>
                                    <li className="divider-vertical"></li>
                                    <li><NavLink to="/khachhang" >Khách hàng</NavLink></li>
                                    <li><NavLink to="/nhacungcap" >Nhà cung cấp</NavLink></li>
                                    <li className="divider-vertical"></li>
                                    <li><NavLink to="/loaikho" >Loại kho</NavLink></li>
                                    <li><NavLink to="/loaiphieunhap" >Loại phiếu nhập</NavLink></li>
                                    <li><NavLink to="/loaiphieuxuat" >Loại phiếu xuất</NavLink></li>
                                    <li><NavLink to="/loaiphieuthuchi" >Loại phiếu thu/chi</NavLink></li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Nhập xuất hàng hóa<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><NavLink to="/quanlynhap" >Quản lý nhập</NavLink></li>
                                    <li><NavLink to="/nhapmuahang" >Nhập mua hàng hóa thông thường</NavLink></li>
                                    <li className="divider-vertical"></li>
                                    <li><NavLink to="/quanlyxuat" >Quản lý xuất</NavLink></li>
                                    <li><NavLink to="/xuatbanhang" >Xuất bán hàng hóa thông thường</NavLink></li>
                                    <li><NavLink to="/xuathuy" >Xuất hủy</NavLink></li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Thu chi<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><NavLink to="/quanlythuchi" >Quản lý thu chi</NavLink></li>
                                    <li><NavLink to="/taophieuthu" >Tạo phiếu thu</NavLink></li>
                                    <li><NavLink to="/taophieuchi" >Tạo phiếu chi</NavLink></li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Quản lý nuôi cá<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><NavLink to="/nhapthaca" >Nhập thả cá</NavLink></li>
                                    <li><NavLink to="/choan" >Cho ăn</NavLink></li>
                                    <li><NavLink to="/raithuoc" >Rãi thuốc</NavLink></li>
                                    <li><NavLink to="/kiemcachet" >Kiểm cá chết</NavLink></li>
                                    <li><NavLink to="/kiemtratangtrong" >Kiểm tra tăng trọng</NavLink></li>
                                    <li><NavLink to="/xuatbanca" >Xuất bán cá thành phẩm</NavLink></li>
                                    <li><NavLink to="/xuatbancachet" >Xuất bán cá chết</NavLink></li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Báo cáo<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><NavLink to="/nhatkyaonuoi" >Nhật ký ao nuôi</NavLink></li>
                                    <li><NavLink to="/theodoitangtrong" >Theo dõi tăng trọng</NavLink></li>
                                    <li><NavLink to="/baocao/cagiong" >Theo dõi cá giống</NavLink></li>
                                    <li className="divider-vertical"></li>
                                    <li><NavLink to="/baocao/xuatvattu" >Xuất vật tư</NavLink></li>
                                    <li><NavLink to="/baocao/nhapxuatton" >Nhập xuất tồn</NavLink></li>
                                    <li className="divider-vertical"></li>
                                    <li><NavLink to="/baocao/thuchi" >Thu chi theo ao</NavLink></li>
                                    <li><NavLink to="/baocao/chiphi" >Chi phí theo ao</NavLink></li>
                                    <li><NavLink to="/baocao/doanhthu" >Theo dõi doanh thu</NavLink></li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Hệ thống<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><NavLink to="/hethong/nguoidung" >Người dùng</NavLink></li>
                                    <li><NavLink to="/hethong/quyennguoidung" >Quyền người dùng</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    }
}
