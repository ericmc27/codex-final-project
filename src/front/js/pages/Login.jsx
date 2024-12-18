import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [isLawyer, setIsLawyer] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // After successful login, navigate based on role
    if (isLawyer) {
      navigate('/lawyer');
    } else {
      navigate('/client');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Welcome Back</h2>

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
                    Login as {isLawyer ? "Lawyer" : "Client"}
                  </label>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-3"
                >
                  Login as {isLawyer ? "Lawyer" : "Client"}
                </button>

                <div className="text-center">
                  <small className="text-muted">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-decoration-none">
                      Sign up
                    </Link>
                  </small>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center mt-3">
            <Link to="/forgot-password" className="text-decoration-none">
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;