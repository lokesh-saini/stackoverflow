import React from 'react'
import { NavLink } from 'react-router-dom';
import Stack from '../images/stack.png';


const Navbar = () => (
    <div style={{marginBottom: '20px'}}>
        <NavbarUnAuth />
    </div> 
)

const NavbarUnAuth = () => (
 <div className="ui secondary pointing menu">
    <button className="item" style={{padding: '6px'}}><NavLink to="/" exact><img src={Stack} style={{maxWidth: '100px'}} alt ="stack"></img></NavLink></button>
    <div className="item">
        <div className="ui icon input">
            <input type="text" placeholder="Search..." />
            <i className="search link icon"></i>
        </div>
    </div>
    <div className="right menu">
    <div className="item">
        <div className="ui button"><NavLink to="/signin" exact>SignIn</NavLink></div>
    </div>
    <div className="item">
        <div className="ui button"><NavLink style={{color: 'white'}} to="/signup" exact>SignUp</NavLink></div>
    </div>
    {/* <button className="ui item">Logout</button> */}
    </div>
 </div>
)

export default Navbar
