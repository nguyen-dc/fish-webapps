import * as React from "react";
import { RouteComponentProps } from 'react-router';
import './login.css';

export class ChangePassword extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div className="container">
            <div className="card card-container">
                <form className="form-signin">
                    <h5 className="text-center">Thay đổi mật khẩu</h5>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Mật khẩu cũ" required />
                    <input type="password" id="inputPassword" className="form-control" placeholder="Mật khẩu mới" required />
                    <input type="password" id="inputPassword" className="form-control" placeholder="Nhập lại mật khẩu mới" required />
                    <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Đổi mật khẩu</button>
                </form>
            </div>
        </div>
    }
}