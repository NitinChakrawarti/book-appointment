
// import { Navigate, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// // import { hideLoading, showLoading } from "../redux/features/alertSlice";
// import axios from "axios";
// import { setuser } from "../redux/features/userslice";
// import { useEffect, useState } from "react";
// import Spinner from './spinner'

// export default function ProtectedRoute({ children }) {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { user } = useSelector(state => state.user);
//     const cookies = document.cookie;
//     const [loading, setLoading] = useState(false); // Manage loading state
//     const [userd, setUserd] = useState();

//     const getUser = async () => {
//         if (!cookies.includes("logintoken=")) {
//             navigate("/login");
//             return;
//         }
//         try {
//             // dispatch(showLoading());
//             setLoading(true);
//             const response = await axios.post(
//                 `${import.meta.env.VITE_BASE_URL}/user/getuser`,
//                 {},
//                 { withCredentials: true }
//             );
//             if (response.data.sucess) {
//                 setLoading(false);
//                 setUserd(response.data.user);
//                 navigate("/");
//             } else {
//                 setLoading(false);
//                 navigate("/register");
//             }
//         } catch (error) {
//             setLoading(false);
//             console.error("Error fetching user:", error);
//             navigate("/register");
//         } finally {
//             // dispatch(hideLoading());
//             setLoading(false);
//         }
//     };
//     dispatch(setuser(userd));
//     useEffect(() => {
//         if (!user) {
//             getUser();
//         } else {
//             setLoading(false);
//         }
//     }, [userd, loading]);

//     if (loading) {
//         return <Spinner />;
//     }

//     if (!cookies.includes("logintoken=")) {
//         return <Navigate to="/register" />;
//     }

//     return children;
// }











import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setuser } from "../redux/features/userslice";
import { useEffect, useState } from "react";
import Spinner from './spinner';

export default function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    const cookies = document.cookie;
    const [loading, setLoading] = useState(true); // Start with loading state

    const getUser = async () => {
        if (!cookies.includes("logintoken=")) {
            navigate("/login");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/user/getuser`,
                {},
                { withCredentials: true }
            );
            if (response.data.sucess) {
                dispatch(setuser(response.data.user));
            } else {
                navigate("/register");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            navigate("/register");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            getUser();
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]); // Only re-run if `user` changes

    if (loading) {
        return <Spinner />;
    }

    if (!cookies.includes("logintoken=")) {
        return <Navigate to="/register" />;
    }

    return children;
}
