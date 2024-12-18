import React, { useState } from "react";

const Signup = () => {
  const [isLawyer, setIsLawyer] = useState(false);

  return (
    <div className="container mt-5">
      <form className="d-flex flex-column align-items-center">
        <div className="mb-4 text-center">
          <h3 className="mb-3">I am a:</h3>
          <div className="form-check form-switch d-flex align-items-center justify-content-center">
            <input
              className="form-check-input mx-2"
              style={{ width: "60px", height: "30px" }}
              type="checkbox"
              role="switch"
              id="roleSwitch"
              checked={isLawyer}
              onChange={() => setIsLawyer(!isLawyer)}
            />
            <label className="form-check-label fs-4" htmlFor="roleSwitch">
              {isLawyer ? "Lawyer" : "Client"}
            </label>
          </div>
        </div>

        <div className="w-100 max-width-500 px-3">
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Full Name"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email Address"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Password"
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              className="form-control form-control-lg"
              placeholder="Phone Number"
            />
          </div>
          <button
            type="submit"
            className="btn btn-danger btn-lg w-100 py-3 fs-4"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup