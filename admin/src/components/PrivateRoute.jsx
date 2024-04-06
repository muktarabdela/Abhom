import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have an auth context/provider

const PrivateRoute = ({ element, Component }) => {
    const { isAuthenticated, checkAuth } = useAuth();
    console.log(isAuthenticated)
    return isAuthenticated ? <Component /> : <Navigate to="/auth" />;

};

export default PrivateRoute;