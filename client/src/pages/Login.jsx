import React, { useContext, useState } from 'react'
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, loginUsers } from '../store/userSlice';
import socket from '../store/socket';

const Login = () => {
    // const { users,setUsers } = useContext(LoginContext);
    const [loginError, setLoginError] = useState('');
    let navigate = useNavigate();
    let dispatch = useDispatch();
    // let x = socket.id
    const { loading, error } = useSelector(state => state.userReducer);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            socketId: "",

        },
        onSubmit:async  (values) => {
            values.socketId = socket.id;
            dispatch(loginUsers(values))
            dispatch(getUsers())

            if (!error) {
                navigate('/');
                await  dispatch(getUsers())

                // localStorage.setItem('token', succes.token);
                //  dispatch(getUsers(succes.token))
            } else {
                setLoginError('Invalid email or password');
            }


        },
    });

    return (
        <div className="login-page" style={{ backgroundColor: "black", color: "white" }}>
            <div className="login-box">
                <h1>Login</h1>
                <form onSubmit={formik.handleSubmit}>
                    <>

                        <div style={{ display: "flex", alignItems: "end", padding: "20px 0" }}>
                            <label htmlFor="email" style={{ minWidth: '150px', display: 'inline-block' }}>Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                style={{ border: "none", width: 230, padding: 10, backgroundColor: "transparent", borderBottom: "1px solid gray", color: "white" }}
                            />
                            <p style={{ color: "red" }}>{formik.errors?.email}</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "end", padding: "20px 0" }}>
                            <label htmlFor="password" style={{ minWidth: '150px', display: 'inline-block' }}>Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                style={{ border: "none", width: 230, padding: 10, backgroundColor: "transparent", borderBottom: "1px solid gray", color: "white" }}
                            />
                            <p style={{ color: "red" }}>{formik.errors?.password}</p>
                        </div>


                        <div>
                            {/* <button type="submit">Submit</button> */}
                            {loginError && <div style={{ color: "red" }}>{loginError}</div>}
                            <input type="submit" value="Submit" style={{ padding: "10px 50px", border: "none", color: "white", backgroundColor: "green", borderRadius: 5, margin: "20px auto", display: "block", cursor: "pointer" }} />
                        </div>
                    </>
                </form>
                <div>
                    <p>If you haven't account : <Link to="/register" style={{ color: "gray" }}> Create Account</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login