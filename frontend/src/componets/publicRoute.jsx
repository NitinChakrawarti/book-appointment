import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
    const cookies = document.cookie;
    if (cookies.includes('logintoken=')) {
        return <Navigate to="/" />
    }
    else {
        return children;
    }
}
