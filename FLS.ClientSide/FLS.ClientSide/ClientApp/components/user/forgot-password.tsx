import * as React from "react";
import { RouteComponentProps } from 'react-router';
import './login.css';

export class ForgotPassword extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div className="container">
            <div className="card card-container">
                <form className="form-signin">
                    <h5 className="text-center">Quên mật khẩu</h5>
                    <input type="email"  className="form-control" placeholder="Email" required />
                    <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Gửi email</button>
                </form>
            </div>
        </div>
    }
}