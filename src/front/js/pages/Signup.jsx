import React, { useState } from "react";
import { Link } from "react-router-dom";
import { commonFields, lawyerFields, clientFields } from "../component/signup";

const Signup = () => {
  const [isLawyer, setIsLawyer] = useState(false);
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Create Account</h2>

              {/* Role Toggle */}
              <div className="mb-4 text-center">
                <div className="form-check form-switch d-flex justify-content-center align-items-center">
                  <input
                    className="form-check-input mx-2"
                    style={{ width: "60px", height: "30px" }}
                    type="checkbox"
                    role="switch"
                    id="roleSwitch"
                    checked={isLawyer}
                    onChange={() => setIsLawyer(!isLawyer)}
                  />
                  <label className="form-check-label fs-5" htmlFor="roleSwitch">
                    Sign up as {isLawyer ? "Lawyer" : "Client"}
                  </label>
                </div>
              </div>

              <form>
                {/* Common Fields */}
                {commonFields}

                {/* Conditional Fields */}
                {isLawyer ? lawyerFields : clientFields}

                {/* Terms and Conditions */}
                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="terms"
                    required
                  />
                  <label className="form-check-label" htmlFor="terms">
                    I agree to the <Link to="/terms">Terms and Conditions</Link>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-3"
                >
                  Create {isLawyer ? "Lawyer" : "Client"} Account
                </button>

                {/* Login Link */}
                <div className="text-center">
                  <small className="text-muted">
                    Already have an account?{" "}
                    <Link to="/login" className="text-decoration-none">
                      Login
                    </Link>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;