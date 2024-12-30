import React from 'react'

export const LoginInputs = ({ clientData, lawyerData, handleChange, userType }) => {
    return (
        <>
            <h2 style={{ margin: "24px auto 15px auto" }}>{userType}</h2>
            <label id='email' style={{ marginLeft: "45px", marginBottom: "7px" }}>Email address</label>
            <input
                style={{ width: "350px", margin: "0px auto 0px auto" }}
                type='email' className="form-control"
                placeholder='Enter your email'
                name='email'
                value={userType === "Client" ? clientData.email : lawyerData.email}
                onChange={(e)=>(handleChange(e, userType))}
            />

            <label id='password' style={{ marginLeft: "45px", marginBottom: "7px", marginTop: "25px" }}>Password</label>
            <input
                style={{ width: "350px", margin: "0px auto 0px auto" }}
                type='password' className="form-control"
                placeholder='Enter your password'
                name='password'
                value={userType === "Client" ? clientData.password : lawyerData.password}
                onChange={(e)=>(handleChange(e, userType))}
            />

           
        </>
    )
}