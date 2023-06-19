import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, loginUsers, logout } from '../store/userSlice';

const Navbar = () => {
    const { user, loading } = useSelector(state => state.userReducer);
    let dispatch = useDispatch();
    console.log(user)
   
    let logoutt = () => {
        dispatch(logout())
    }
    return (
        <div style={{ backgroundColor: "black", color: "white", display: "flex", justifyContent: "space-between", padding: "20px 100px" }}>
            <div>{user.name ? user.name : ""}</div>
            <div onClick={logoutt}>{user.name ? "Logout" : "Login"}</div>
        </div>
    )
}

export default Navbar
