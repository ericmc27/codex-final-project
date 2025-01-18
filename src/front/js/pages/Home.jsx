import React from 'react'
import { Link } from "react-router-dom";
import '../../styles/home.css'
import backgroundImage from '../../../../public/LandingPage.jpg';

export const Home = () => {
    return (
        <>
            <div  
                style={{ 
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    // minHeight: '100vh' 
                }}>
                <div  style={{ padding: "30px", margin: "0px 35px 0px auto", height: "200px", width: "800px"}}>
                    <p style={{textAlign: "justify"}} className='fs-5'>Legal Sync is a streamlined platform designed to connect clients with the legal expertise they need. By helping users identify their specific legal requirements, our website simplifies the process of finding the right lawyer. Clients can explore various areas of law, from family matters to corporate issues, and match with experienced attorneys from our extensive database. Each lawyer in our network has clearly identified their areas of specialty, ensuring a tailored and effective solution for every legal challenge. Whether you're seeking advice, representation, or consultation, Legal Sync makes finding qualified legal assistance quick, easy, and reliable.</p>
               </div>
                
                <div className="fs-5" style={{ padding: "30px", margin: "220px 0px 0px auto", height: "200px", width: "800px"}}>
                    <div><label>Don't have an account? <Link className="text-decoration-none" to={"/signup"} state={{ userType: "Client" }}>Sign up</Link></label></div>
                    <div><label>Need to login? <Link className="text-decoration-none" to={"/login"} state={{ userType: "Client" }}>Log In</Link></label></div>
                </div>
            </div>
            



        </>
    )
}

export default Home;