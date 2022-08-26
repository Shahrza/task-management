import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { useAppDispatch } from "../app/hooks";
import { addTask } from "../features/home/homeSlice";

interface Props {
  open: boolean;
  handleCloseDialog(): void;
}

interface IForm {
  title: string;
  deadline: Date;
  status: string;
  assignee: string[];
  description: string;
}

// It should come from API
const statuses = [
  {
    value: 1,
    label: "Todo",
  },
  {
    value: 2,
    label: "In progress",
  },
  {
    value: 3,
    label: "Done",
  },
];

// It should come from API
const assignees = [
  {
    value: 1,
    label: "John",
  },
  {
    value: 2,
    label: "Jane",
  },
  {
    value: 3,
    label: "Jack",
  },
];

export const TaskDialog: React.FC<Props> = ({ open, handleCloseDialog }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = async (form) => {
    const data = { ...form, deadline: form.deadline.toString(), id: uuidv4() };
    dispatch(addTask(data));
    onClose();
  };

  const onClose = () => {
    reset();
    handleCloseDialog();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add task</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            {...register("title", { required: "Title is required" })}
            margin="normal"
            type="text"
            fullWidth
            label="Title"
            autoFocus
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="deadline"
              rules={{
                required: "Deadline is required",
              }}
              defaultValue={new Date()}
              control={control}
              render={({ field }) => (
                <DesktopDatePicker
                  {...field}
                  label="Deadline"
                  inputFormat="MM/dd/yyyy"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      fullWidth
                      error={!!errors.deadline}
                      helperText={errors.deadline?.message}
                    />
                  )}
                />
              )}
            />
          </LocalizationProvider>
          <Controller
            name="status"
            rules={{
              required: "Status is required",
            }}
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                value={statuses.find((item) => item.label === field.value)}
                onChange={(_, option) => {
                  if (option) {
                    const status = option?.label;
                    setValue("status", status);
                  }
                }}
                options={statuses}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Status"
                    margin="normal"
                    error={!!errors.status}
                    helperText={errors.status?.message}
                  />
                )}
              />
            )}
          />
          <Controller
            name="assignee"
            rules={{
              required: "Assignee is required",
            }}
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                value={
                  field?.value?.length
                    ? assignees.filter((item) =>
                        field.value.includes(item.label)
                      )
                    : []
                }
                onChange={(_, options) => {
                  const assignees = options.map((item) => item.label);
                  setValue("assignee", assignees);
                }}
                options={assignees}
                multiple
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assignee"
                    margin="normal"
                    error={!!errors.assignee}
                    helperText={errors.assignee?.message}
                  />
                )}
              />
            )}
          />
          <TextField
            {...register("description")}
            margin="normal"
            type="text"
            fullWidth
            multiline
            label="Description"
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
          Add task
        </Button>
      </DialogActions>
    </Dialog>
  );
};
