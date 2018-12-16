import * as React from "react";
import { RouteComponentProps } from 'react-router';
import './login.css';
export class Login extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div className="container">
            <div className="card card-container">
                <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
                <p id="profile-name" className="profile-name-card"></p>
                <form className="form-signin">
                    <span id="reauth-email" className="reauth-email"></span>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email" required />
                    <input type="password" id="inputPassword" className="form-control" placeholder="Mật khẩu" required />
                    <div id="remember" className="checkbox">
                        <label>
                            <input type="checkbox" value="remember-me" /> Ghi nhớ đăng nhập
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Đăng nhập</button>
                </form>
                <a href="#" className="forgot-password">Quên mật khẩu?</a>
            </div>
        </div>
    }
}