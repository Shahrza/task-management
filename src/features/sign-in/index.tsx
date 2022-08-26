import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Snackbar,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

import Users from "../../data/users.json";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUser } from "./authSlice";

interface IForm {
  userName: string;
  password: string;
}

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentUser } = useAppSelector((state) => state.auth);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = async ({ userName }) => {
    const data = await Users.find((user) => user.userName === userName);
    if (data) {
      dispatch(setUser(data));
      navigate("/home", { replace: true });
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  // Normally it should be access token instead of user
  if (currentUser) return <Navigate to="/" />;

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              my: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                {...register("userName", { required: "Username is required" })}
                autoFocus
                autoComplete="void"
                margin="normal"
                type="text"
                fullWidth
                label="Username"
                error={!!errors.userName}
                helperText={errors.userName?.message}
              />
              <TextField
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^[a-z0-9]+$/i,
                    message: "Password should be alphanumeric",
                  },
                  minLength: {
                    value: 6,
                    message: "Password should be at least 6 character",
                  },
                })}
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Typography variant="caption">
                username: janedoe pass: has no password - admin
                <br />
                username: johndoe pass: has no password - user
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        message="Username or password is not correct"
      />
    </>
  );
};
