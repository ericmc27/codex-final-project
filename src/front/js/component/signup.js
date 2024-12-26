import React from "react"

export const CommonFields = ({userData, handleChange}) => {
  return (
    <>
      <label className="form-label" htmlFor="name">Name</label>
      <input id="name" className="form-control" type="text" name="name" value={userData.name} onChange={handleChange}/>

      <label className="form-label" htmlFor="email">Email</label>
      <input id="email" className="form-control" type="email" name="email" value={userData.email} onChange={handleChange}/>

      <label className="form-label" htmlFor="password">Password</label>
      <input id="password" className="form-control" type="password" name="password" value={userData.password} onChange={handleChange}/>

      <label className="form-label" htmlFor="phone">Phone</label>
      <input id="phone" className="form-control" type="tel" name="phone" value={userData.phone} onChange={handleChange}/>

      <label className="form-label" htmlFor="address">Address</label>
      <input id="address" className="form-control" type="text" name="address" value={userData.address} onChange={handleChange}/>
      
      <button type="submit">Signup</button>
    </>
  )
} 

