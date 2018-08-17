import * as React from "react";
import * as ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router";

export class ProductDetail extends React.Component<RouteComponentProps<any>, any>{
    constructor(props: any) {
        super(props)
        this.props = props;
    }
    render() {
        return (
            <div className="row">
                <form className="form-horizontal" action="/examples/actions/confirmation.php" method="post">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="control-label col-xs-12 col-sm-3 col-md-3" htmlFor="inputEmail">Email Address:</label>
                            <div className="col-xs-12 col-sm-9 col-md-9">
                                <input type="email" className="form-control" id="inputEmail" placeholder="Email Address" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-12 col-sm-3 col-md-3" htmlFor="phoneNumber">Phone Number:</label>
                            <div className="col-xs-12 col-sm-9 col-md-9">
                                <input type="tel" className="form-control" id="phoneNumber" placeholder="Phone Number" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-12 col-sm-3 col-md-3">Date of Birth:</label>
                            <div className="col-xs-3">
                                <select className="form-control">
                                    <option>Date</option>
                                </select>
                            </div>
                            <div className="col-xs-3">
                                <select className="form-control">
                                    <option>Month</option>
                                </select>
                            </div>
                            <div className="col-xs-3">
                                <select className="form-control">
                                    <option>Year</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-12 col-sm-3 col-md-3" htmlFor="postalAddress">Postal Address:</label>
                            <div className="col-xs-12 col-sm-9 col-md-9">
                                <textarea className="form-control" id="postalAddress" placeholder="Postal Address" required></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-12 col-sm-3 col-md-3" htmlFor="ZipCode">Zip Code:</label>
                            <div className="col-xs-12 col-sm-9 col-md-9">
                                <input type="text" className="form-control" id="ZipCode" placeholder="Zip Code" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-12 col-sm-3 col-md-3">Gender:</label>
                            <div className="col-xs-3">
                                <label className="radio-inline">
                                    <input type="radio" name="genderRadios" value="male" required /> Male
                             </label>
                            </div>
                            <div className="col-xs-3">
                                <label className="radio-inline">
                                    <input type="radio" name="genderRadios" value="female" required /> Female
                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-offset-0 col-sm-offset-3 col-xs-9">
                                <label className="checkbox-inline">
                                    <input type="checkbox" value="news" /> Send me latest news and updates.
                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-offset-0 col-sm-offset-3 col-xs-9">
                                <label className="checkbox-inline">
                                    <input type="checkbox" value="agree" />  I agree to the <a href="#">Terms and Conditions</a>.
                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-offset-0 col-sm-offset-3 col-xs-9">
                                <input type="submit" className="btn btn-primary mg-r-15" value="Submit" />
                                <input type="reset" className="btn btn-default" value="Reset" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="control-label col-xs-12 col-sm-3 col-md-3" htmlFor="inputEmail">Email Address:</label>
                            <div className="col-xs-12 col-sm-9 col-md-9">
                                <input type="email" className="form-control" id="inputEmail" placeholder="Email Address" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-12 col-sm-3 col-md-3" htmlFor="phoneNumber">Phone Number:</label>
                            <div className="col-xs-12 col-sm-9 col-md-9">
                                <input type="tel" className="form-control" id="phoneNumber" placeholder="Phone Number" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-12 col-sm-3 col-md-3">Date of Birth:</label>
                            <div className="col-xs-3">
                                <select className="form-control">
                                    <option>Date</option>
                                </select>
                            </div>
                            <div className="col-xs-3">
                                <select className="form-control">
                                    <option>Month</option>
                                </select>
                            </div>
                            <div className="col-xs-3">
                                <select className="form-control">
                                    <option>Year</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-12 col-sm-3 col-md-3" htmlFor="postalAddress">Postal Address:</label>
                            <div className="col-xs-12 col-sm-9 col-md-9">
                                <textarea className="form-control" id="postalAddress" placeholder="Postal Address" required></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-12 col-sm-3 col-md-3" htmlFor="ZipCode">Zip Code:</label>
                            <div className="col-xs-12 col-sm-9 col-md-9">
                                <input type="text" className="form-control" id="ZipCode" placeholder="Zip Code" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-xs-12 col-sm-3 col-md-3">Gender:</label>
                            <div className="col-xs-3">
                                <label className="radio-inline">
                                    <input type="radio" name="genderRadios" value="male" required /> Male
                             </label>
                            </div>
                            <div className="col-xs-3">
                                <label className="radio-inline">
                                    <input type="radio" name="genderRadios" value="female" required /> Female
                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-offset-0 col-sm-offset-3 col-xs-9">
                                <label className="checkbox-inline">
                                    <input type="checkbox" value="news" /> Send me latest news and updates.
                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-offset-0 col-sm-offset-3 col-xs-9">
                                <label className="checkbox-inline">
                                    <input type="checkbox" value="agree" />  I agree to the <a href="#">Terms and Conditions</a>.
                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-offset-0 col-sm-offset-3 col-xs-9">
                                <input type="submit" className="btn btn-primary mg-r-15" value="Submit" />
                                <input type="reset" className="btn btn-default" value="Reset" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}