import React from "react"


export const CommonFields = ({ userData, handleChange }) => {
  return (
    <>
      <label className="form-label mt-2" htmlFor="name">Name</label>
      <input
        id="name"
        className="form-control"
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        required
        style={{width:"300px"}}
      />

      <label className="form-label mt-2" htmlFor="email">Email</label>
      <input
        id="email"
        className="form-control"
        type="email" name="email"
        value={userData.email}
        onChange={handleChange}
        required
        style={{width:"300px"}}
      />

      <label className="form-label mt-2" htmlFor="password">Password</label>
      <input
        id="password"
        className="form-control"
        type="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        required
        style={{width:"300px"}}
      />

      <label className="form-label mt-2" htmlFor="phone">Phone</label>
      <input
        id="phone"
        className="form-control"
        type="tel"
        name="phone"
        value={userData.phone}
        onChange={handleChange}
        required
        style={{width:"300px"}}
      />

      <label className="form-label mt-2" htmlFor="address">Address</label>
      <input
        id="address"
        className="form-control"
        type="text"
        name="address"
        value={userData.address}
        onChange={handleChange}
        required
        style={{width:"300px"}}
      />
    </>
  )
}

export const AreaOfNeed = ({ userData, handleChange }) => {
  return (
    <>
      <label className="mt-3 mb-1" htmlFor="areaOfNeed">I NEED HELP WITH</label>

      <select name="areaOfNeed" id="areaOfNeed" value={userData.areaOfNeed} onChange={handleChange} required>
        <option value="" disabled>-- Select an area of need --</option>
        <option value="Corporate and Business">Corporate and Business Law</option>
        <option value="Criminal">Criminal Law</option>
        <option value="Family">Family Law</option>
        <option value="Immigration">Immigration Law</option>
        <option value="Intellectual Property">Intellectual Property Law</option>
        <option value="Personal Injury">Personal Injury Law</option>
        <option value="Real Estate">Real Estate Law</option>
        <option value="Employment and Labor">Employment and Labor Law</option>
        <option value="Environmental">Environmental Law</option>
        <option value="Tax">Tax Law</option>
        <option value="Health">Health Law</option>
        <option value="Bankruptcy">Bankruptcy Law</option>
        <option value="Civil Rights">Civil Rights Law</option>
        <option value="Estate Planning and Probate">Estate Planning and Probate Law</option>
        <option value="Technology and Cybersecurity">Technology and Cybersecurity Law</option>
        <option value="Entertainment and Sports">Entertainment and Sports Law</option>
        <option value="Education">Education Law</option>
        <option value="Maritime">Maritime and Admiralty Law</option>
        <option value="International">International Law</option>
        <option value="Elder">Elder Law</option>
      </select>
    </>
  )
}

export const LawyerFields = ({ userData, handleChange }) => {
  return (
    <>
      <label className="mt-3 mb-1" htmlFor="specialty">Specialization</label>

      <select name="specialty" id="specialty" value={userData.specialty} onChange={handleChange} required>
      <option value="" disabled>-- Select specialization --</option>
        <option value="Corporate and Business">Corporate and Business Law</option>
        <option value="Criminal">Criminal Law</option>
        <option value="Family">Family Law</option>
        <option value="Immigration">Immigration Law</option>
        <option value="Intellectual Property">Intellectual Property Law</option>
        <option value="Personal Injury">Personal Injury Law</option>
        <option value="Real Estate">Real Estate Law</option>
        <option value="Employment and Labor">Employment and Labor Law</option>
        <option value="Environmental">Environmental Law</option>
        <option value="Tax">Tax Law</option>
        <option value="Health">Health Law</option>
        <option value="Bankruptcy">Bankruptcy Law</option>
        <option value="Civil Rights">Civil Rights Law</option>
        <option value="Estate Planning and Probate">Estate Planning and Probate Law</option>
        <option value="Technology and Cybersecurity">Technology and Cybersecurity Law</option>
        <option value="Entertainment and Sports">Entertainment and Sports Law</option>
        <option value="Education">Education Law</option>
        <option value="Maritime">Maritime and Admiralty Law</option>
        <option value="International">International Law</option>
        <option value="Elder">Elder Law</option>
      </select>

      {/* <label className="form-label" htmlFor="barNumber">Bar ID Number</label>
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
      </div> */}


    </>
  )

}
