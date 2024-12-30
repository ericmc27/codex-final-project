import React from "react"


export const CommonFields = ({ userData, handleChange }) => {
  return (
    <>
      <label className="form-label" htmlFor="name">Name</label>
      <input
        id="name"
        className="form-control"
        type="text" name="name"
        value={userData.name}
        onChange={handleChange}
        required
      />

      <label className="form-label" htmlFor="email">Email</label>
      <input
        id="email"
        className="form-control"
        type="email" name="email"
        value={userData.email}
        onChange={handleChange}
        required
      />

      <label className="form-label" htmlFor="password">Password</label>
      <input
        id="password"
        className="form-control"
        type="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        required
      />

      <label className="form-label" htmlFor="phone">Phone</label>
      <input
        id="phone"
        className="form-control"
        type="tel"
        name="phone"
        value={userData.phone}
        onChange={handleChange}
        required
      />

      <label className="form-label" htmlFor="address">Address</label>
      <input
        id="address"
        className="form-control"
        type="text"
        name="address"
        value={userData.address}
        onChange={handleChange}
        required
      />
    </>
  )
}

export const AreaOfNeed = ({ areaOfNeed, handleChange }) => {
  return (
    <>
      <label htmlFor="areaOfNeed">Which area of specialty do you need help with?</label>

      <select name="areaOfNeed" id="areaOfNeed" onChange={handleChange} required>
        <option value="" disabled>
          -- Select an area of need --
        </option>
        <option value="corporateBusiness">Corporate and Business Law</option>
        <option value="criminal">Criminal Law</option>
        <option value="family">Family Law</option>
        <option value="immigration">Immigration Law</option>
        <option value="intellectualProperty">Intellectual Property Law</option>
        <option value="personalInjury">Personal Injury Law</option>
        <option value="realEstate">Real Estate Law</option>
        <option value="employmentLabor">Employment and Labor Law</option>
        <option value="environmental">Environmental Law</option>
        <option value="tax">Tax Law</option>
        <option value="health">Health Law</option>
        <option value="bankruptcy">Bankruptcy Law</option>
        <option value="civilRights">Civil Rights Law</option>
        <option value="estateProbate">Estate Planning and Probate Law</option>
        <option value="tech">Technology and Cybersecurity Law</option>
        <option value="entertainmentSports">Entertainment and Sports Law</option>
        <option value="education">Education Law</option>
        <option value="maritime">Maritime and Admiralty Law</option>
        <option value="international">International Law</option>
        <option value="elder">Elder Law</option>
      </select>
    
      <div>
        <button type="submit">Signup</button>
      </div>
    </>
  )
}

export const LawyerFields = ({ lawyerFields, handleChange }) => {
  return (
    <>
      <label htmlFor="specialty">Select up to 5 areas where you specialize (hold Ctrl to select multiple): </label>

      <select name="specialty" id="specialty" multiple size="5" onChange={handleChange} required>
        <option value="" disabled>-- Select areas of specialty --</option>
        <option value="corporateBusiness">Corporate and Business Law</option>
        <option value="criminal">Criminal Law</option>
        <option value="family">Family Law</option>
        <option value="immigration">Immigration Law</option>
        <option value="intellectualProperty">Intellectual Property Law</option>
        <option value="personalInjury">Personal Injury Law</option>
        <option value="realEstate">Real Estate Law</option>
        <option value="employmentLabor">Employment and Labor Law</option>
        <option value="environmental">Environmental Law</option>
        <option value="tax">Tax Law</option>
        <option value="health">Health Law</option>
        <option value="bankruptcy">Bankruptcy Law</option>
        <option value="civilRights">Civil Rights Law</option>
        <option value="estateProbate">Estate Planning and Probate Law</option>
        <option value="tech">Technology and Cybersecurity Law</option>
        <option value="entertainmentSports">Entertainment and Sports Law</option>
        <option value="education">Education Law</option>
        <option value="maritime">Maritime and Admiralty Law</option>
        <option value="international">International Law</option>
        <option value="elder">Elder Law</option>
      </select>
      <br></br>

      <label className="form-label" htmlFor="barNumber">Bar ID Number</label>
      <input
        id="barNumber"
        className="form-control"
        type="text"
        name="barNumber"
        value={lawyerFields.barNumber}
        onChange={handleChange}
        required
      />

      <label className="form-label" htmlFor="lawFirm">Law Firm (if applicable)</label>
      <input
        id="lawFirm"
        className="form-control"
        type="text"
        name="lawFirm"
        value={lawyerFields.lawFirm}
        onChange={handleChange}
      />

      {/* ?? How to combat SQL Injection ?? */}
      <label className="form-label" htmlFor="professionalExperience">Professional Experience</label>
      <input
        id="professionalExperience"
        className="form-control"
        type="text"
        name="professionalExperience"
        value={lawyerFields.professionalExperience}
        onChange={handleChange}
        required
      />

      <fieldset>
        <label className="form-label" htmlFor="credentials">Upload Credentials</label>
        <input
          type="file"
          id="credentials"
          name="credentials"
          accept="image/png, image/jpeg"
          value={lawyerFields.credentials}
          onChange={handleChange}
          required
        />
        <div>
          <small id="file-help" className="form-text">
            Upload files in PNG or JPEG format. Max size: 5MB.
          </small>
        </div><br></br>
    
        <label className="form-label" htmlFor="photo">Upload Photo</label><br></br>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/png, image/jpeg"
          value={lawyerFields.photo}
          onChange={handleChange}
          required
        />
        <div>
          <small id="file-help" className="form-text">
            Upload files in PNG or JPEG format. Max size: 5MB.
          </small>
        </div>
      </fieldset>

      <div>
        <button type="submit">Signup</button>
      </div>


    </>
  )

}
