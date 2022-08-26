import React from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAppDispatch } from "../app/hooks";
import { addUser } from "../features/home/homeSlice";

interface Props {
  open: boolean;
  handleCloseDialog(): void;
}

interface IForm {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export const UserDialog: React.FC<Props> = ({ open, handleCloseDialog }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (form) => {
    const data = { ...form, id: uuidv4() };
    dispatch(addUser(data));
    onClose();
  };

  const onClose = () => {
    reset();
    handleCloseDialog();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add user</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            {...register("firstName", { required: "Firstname is required" })}
            margin="normal"
            type="text"
            fullWidth
            label="Firstname"
            autoFocus
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            {...register("lastName", {
              required: "Lastname is required",
            })}
            margin="normal"
            type="text"
            fullWidth
            label="Lastname"
            autoFocus
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            {...register("userName", { required: "Username is required" })}
            margin="normal"
            type="text"
            fullWidth
            label="Username"
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />
          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            margin="normal"
            type="email"
            fullWidth
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          type="submit"
        >
          Add user
        </Button>
      </DialogActions>
    </Dialog>
  );
};
