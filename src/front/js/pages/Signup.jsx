import React from "react";
import "../../styles/signup.css";

const Signup = () => {
  return (
    <>
      <form className="signupForm">
        <div className="selectRole">
          <p>I am a: </p>
          <input type="radio" className="role" id="client" name="role" value="client" checked />
          <label for="client">Client</label>
          <input type="radio" className="role" id="lawyer" name="role" value="lawyer" />
          <label for="lawyer">Lawyer</label>
        </div>
        <div className="enterInfo">
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <input type="phone" placeholder="Phone Number" />
          <button>Signup</button>
        </div>
      </form>


    </>
  );
}

export default Signup