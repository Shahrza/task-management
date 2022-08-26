import React from "react";
import { TableCell, TableRow } from "@mui/material";

import { AppTable } from "../../../components/common/AppTable";
import { IUser } from "../../../types";

const headers = [
  { key: "firstname", value: "First name" },
  { key: "lastName", value: "Last name" },
  { key: "userName", value: "User name" },
  { key: "email", value: "Email" },
];

interface Props {
  users: IUser[];
}

export const UserTable: React.FC<Props> = ({ users }) => {
  return (
    <AppTable headers={headers}>
      {users.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.firstName}</TableCell>
          <TableCell>{item.lastName}</TableCell>
          <TableCell>{item.userName}</TableCell>
          <TableCell>{item.email}</TableCell>
        </TableRow>
      ))}
    </AppTable>
  );
};
