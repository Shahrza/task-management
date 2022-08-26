import React from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";

const PrivateRoute: React.FC<any> = ({ children }) => {
  const { currentUser } = useAppSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }
  return children;
};

export default PrivateRoute;
