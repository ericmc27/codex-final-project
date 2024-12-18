import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Test credentials for both user types
    const testCredentials = {
      client: {
        email: 'client@test.com',
        password: 'client123'
      },
      lawyer: {
        email: 'lawyer@test.com',
        password: 'lawyer123'
      }
    };

    if (email === testCredentials.client.email && password === testCredentials.client.password) {
      setMessage('Login successful!');
      localStorage.setItem('userType', 'client');
      setTimeout(() => {
        navigate('/client');
      }, 1500);
    } else if (email === testCredentials.lawyer.email && password === testCredentials.lawyer.password) {
      setMessage('Login successful!');
      localStorage.setItem('userType', 'lawyer');
      setTimeout(() => {
        navigate('/lawyer');
      }, 1500);
    } else {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Welcome Back</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  Login
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

          {/* Optional: Forgot Password Link */}
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