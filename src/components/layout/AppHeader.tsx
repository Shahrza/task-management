import { useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { OrganizationDialog } from "../OrganizationDialog";
import { UserDialog } from "../UserDialog";
import { TaskDialog } from "../TaskDialog";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUser } from "../../features/sign-in/authSlice";

export const AppHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentUser } = useAppSelector((state) => state.auth);

  const [orgDialog, setOrgDialog] = useState(false);
  const [userDialog, setUserDialog] = useState(false);
  const [taskDialog, setTaskDialog] = useState(false);

  const handleOpenOrgDialog = () => {
    setOrgDialog(true);
  };

  const handleCloseOrgDialog = () => {
    setOrgDialog(false);
  };

  const handleOpenUserDialog = () => {
    setUserDialog(true);
  };

  const handleCloseUserDialog = () => {
    setUserDialog(false);
  };

  const handleOpenTaskDialog = () => {
    setTaskDialog(true);
  };

  const handleCloseTaskDialog = () => {
    setTaskDialog(false);
  };

  const logout = () => {
    dispatch(setUser(null));
    navigate("/", { replace: true });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task management
          </Typography>
          {!currentUser && (
            <Button color="inherit" onClick={handleOpenOrgDialog}>
              Create organization
            </Button>
          )}
          {currentUser?.role === "admin" && (
            <Button color="inherit" onClick={handleOpenUserDialog}>
              Add user
            </Button>
          )}
          {currentUser?.role === "user" && (
            <Button color="inherit" onClick={handleOpenTaskDialog}>
              Add task
            </Button>
          )}
          {!!currentUser && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <OrganizationDialog
        open={orgDialog}
        handleCloseDialog={handleCloseOrgDialog}
      />
      <UserDialog open={userDialog} handleCloseDialog={handleCloseUserDialog} />
      <TaskDialog open={taskDialog} handleCloseDialog={handleCloseTaskDialog} />
    </Box>
  );
};
