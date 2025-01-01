// import { Navigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { hideLoading, showLoading } from "../redux/features/alertSlice";
// import axios from "axios";
// import { setuser } from "../redux/features/userslice";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";

// export default function ProtectedRoute({ children }) {

//     const dispatch = useDispatch();
//     const { user } = useSelector(state => state.user);
//     const cookies = document.cookie;

//     const getUser = async () => {
//         if (!cookies.includes('logintoken=')) {
//             setError('Redirecting to login...');
//             setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
//             return;
//         }
//         else {
//             try {
//                 dispatch(showLoading())
//                 const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/getuser`, {}, {
//                     withCredentials: true,
//                 })
//                 if (response.data.sucess) {
//                     const userdata = response.data.user;
//                     dispatch(setuser(userdata));
//                     dispatch(hideLoading());
//                 }
//                 else {
//                     <Navigate to="/login" />
//                 }
//             } catch (error) {
//                 dispatch(hideLoading());
//                 console.log(error);
//             }
//         }
//     }

//     useEffect(() => {
//         getUser();
//     }, [user]);

//     if (!cookies.includes('logintoken=')) {
//         return <Navigate to="/register" />
//     }
//     else {
//         return children;
//     }
// }


import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { setuser } from "../redux/features/userslice";
import { useEffect, useState } from "react";
import Spinner from './spinner'

export default function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    const cookies = document.cookie;
    const [loading, setLoading] = useState(true); // Manage loading state

    const getUser = async () => {
        if (!cookies.includes("logintoken=")) {
            navigate("/login");
            return;
        }
        try {
            dispatch(showLoading());
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/user/getuser`,
                {},
                { withCredentials: true }
            );
            if (response.data.sucess) {
                dispatch(setuser(response.data.user));
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            navigate("/login");
        } finally {
            dispatch(hideLoading());
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!user) {
            getUser();
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (!cookies.includes("logintoken=")) {
        return <Navigate to="/register" />;
    }

    return children;
}
