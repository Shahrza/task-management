import { Route, Routes, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { SignIn } from "./features/sign-in";
import { Home } from "./features/home";
import { AppHeader } from "./components/layout/AppHeader";
import PrivateRoute from "./components/routing/PrivateRoute";

function App() {
  return (
    <>
      <AppHeader />
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
