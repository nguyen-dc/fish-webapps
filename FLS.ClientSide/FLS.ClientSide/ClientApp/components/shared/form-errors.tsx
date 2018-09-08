import * as React from "react";
export const FormErrors = ({ formErrors }) => {
    if (Object.keys(formErrors).length != 0) {
        return (
            <div className="form-error">
                <div className="alert alert-danger">
                    {Object.keys(formErrors).map((fieldName, i) => {
                        if (formErrors[fieldName].length > 0) {
                            return (
                                <p key={i}>{formErrors[fieldName]}</p>
                            )
                        }
                    })}
                </div>
            </div>
        );
    }
    return null;
}