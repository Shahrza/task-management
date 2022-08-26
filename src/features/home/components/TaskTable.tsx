import React from "react";
import { TableCell, TableRow, Chip } from "@mui/material";
import { format } from "date-fns";

import { AppTable } from "../../../components/common/AppTable";
import { ITask } from "../../../types";

const headers = [
  { key: "title", value: "Title" },
  { key: "deadline", value: "Deadline" },
  { key: "status", value: "Status" },
  { key: "assignee", value: "Assignee" },
  { key: "description", value: "Description" },
];

interface Props {
  tasks: ITask[];
}

export const TaskTable: React.FC<Props> = ({ tasks }) => {
  return (
    <AppTable headers={headers}>
      {tasks.map((item) => (
        <TableRow key={item.title}>
          <TableCell>{item.title}</TableCell>
          <TableCell>{format(new Date(item.deadline), "dd-MM-yyyy")}</TableCell>
          <TableCell>{item.status}</TableCell>
          <TableCell>
            {item.assignee.length &&
              item.assignee.map((assignee) => (
                <Chip sx={{ marginRight: 1 }} label={assignee} key={assignee} />
              ))}
          </TableCell>
          <TableCell>{item.description}</TableCell>
        </TableRow>
      ))}
    </AppTable>
  );
};
