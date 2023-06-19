
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ path, element }) => {
    const { user, loading } = useSelector(state => state.userReducer);
    console.log(user)
    if (!user.email) {
        return <Login />;
    }

    return element;

};

export const routes = [
    {
        path: '/',
        element: <ProtectedRoute element={<Home />} />,
    },
    {
        path: '/login',
        element: localStorage.getItem("token") ? <Navigate to={"/"} /> : <Login />,
    },
    {
        path: '/register',
        element: localStorage.getItem("token") ? <Navigate to={"/"} /> : <Register />,
    },

]