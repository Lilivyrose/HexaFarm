import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

const ProtectedRoute = () => {
  const session = supabase.auth.getSession();

  // If there's no session, redirect to signin
  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  // If there is a session, render the child routes
  return <Outlet />;
};

export default ProtectedRoute; 