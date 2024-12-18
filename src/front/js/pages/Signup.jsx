import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [isLawyer, setIsLawyer] = useState(false);

  // Common fields for both lawyers and clients
  const commonFields = (
    <>
      <div className="mb-3">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Full Name"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          className="form-control form-control-lg"
          placeholder="Email Address"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control form-control-lg"
          placeholder="Password"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="tel"
          className="form-control form-control-lg"
          placeholder="Phone Number"
          required
        />
      </div>
    </>
  );

  // Lawyer-specific fields
  const lawyerFields = (
    <>
      <div className="mb-3">
        <select className="form-select form-select-lg" required>
          <option value="">Select Practice Area</option>
          <option value="family">Family Law</option>
          <option value="criminal">Criminal Law</option>
          <option value="corporate">Corporate Law</option>
          <option value="real-estate">Real Estate Law</option>
          <option value="immigration">Immigration Law</option>
        </select>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Bar Number"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Law Firm (if applicable)"
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Professional Experience"
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Upload Credentials</label>
        <input
          type="file"
          className="form-control"
          accept=".pdf,.doc,.docx"
          required
        />
      </div>
    </>
  );

  // Client-specific fields
  const clientFields = (
    <>
      <div className="mb-3">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Address"
          required
        />
      </div>
      <div className="mb-3">
        <select className="form-select form-select-lg" required>
          <option value="">Type of Legal Help Needed</option>
          <option value="family">Family Matter</option>
          <option value="criminal">Criminal Defense</option>
          <option value="corporate">Business/Corporate</option>
          <option value="real-estate">Real Estate</option>
          <option value="immigration">Immigration</option>
        </select>
      </div>
    </>
  );

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