import React from "react";

export const commonFields = (
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

  export const lawyerFields = (
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

  export const clientFields = (
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