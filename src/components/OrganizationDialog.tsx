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
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch } from "../app/hooks";
import { addOrganization } from "../features/home/homeSlice";

interface IForm {
  id: string;
  organizationName: string;
  phoneNumber: string;
  address: string;
  userName: string;
  email: string;
  password: string;
}

interface Props {
  open: boolean;
  handleCloseDialog(): void;
}

export const OrganizationDialog: React.FC<Props> = ({
  open,
  handleCloseDialog,
}) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (form) => {
    const data = { ...form, id: uuidv4() };
    dispatch(addOrganization(data));
    onClose();
  };

  const onClose = () => {
    reset();
    handleCloseDialog();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create organization</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            {...register("organizationName", {
              required: "Organization name is required",
            })}
            margin="normal"
            type="text"
            fullWidth
            label="Organization name"
            autoFocus
            error={!!errors.organizationName}
            helperText={errors.organizationName?.message}
          />
          <TextField
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            margin="normal"
            type="number"
            fullWidth
            label="Phone number"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
          <TextField
            {...register("address", { required: "Address is required" })}
            margin="normal"
            type="text"
            fullWidth
            label="Address"
            error={!!errors.address}
            helperText={errors.address?.message}
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
            name="email"
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
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
