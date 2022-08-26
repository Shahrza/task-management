import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

type Header = {
  key: string;
  value: string;
};
interface Props {
  headers: Header[];
  children: React.ReactNode;
}

export const AppTable = ({ headers, children }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ background: "#555", color: "#fff" }}>
          <TableRow>
            {headers.map((header) => (
              <TableCell
                sx={{ color: "#fff", fontWeight: "bold" }}
                key={header.key}
              >
                {header.value}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {React.Children.count(children) === 0 && (
            <TableRow>
              <TableCell>No data found</TableCell>
            </TableRow>
          )}
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
