"use client";

import { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const ProjectsTable: FC = () => {
  const rows = [
    {
      name: "Project A",
      owner: "0x441b6779E9939ADE7149c266ef8490c3b6C4354B",
      assets: [],
    },
    {
      name: "Project B",
      owner: "0x7Dc8bF8F428a1B73cf9a7888428de8def86B7d03",
      assets: [],
    },
    {
      name: "Project C",
      owner: "0x1821BFca14747700b0CeD0a5082E470AC76Ce406",
      assets: [],
    },
    {
      name: "Project D",
      owner: "0xAce47Be11510baE841012E5c9fFBC571402a4A26",
      assets: [],
    },
    {
      name: "Project E",
      owner: "0x12Eb5CC21e17be83cdE4D93be21D4Fb1AdafaAe0",
      assets: [],
    },
    {
      name: "Project F",
      owner: "0x08b00E5957854085878796AF81F26266Ef6B0428",
      assets: [],
    },
    {
      name: "Project G",
      owner: "0x4A0dC48eC7eC73DcC17Fd00C5CA9E2BbE8d25e50",
      assets: [],
    },
  ];

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>NAME</TableCell>
            <TableCell>BALANCE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              {/*<TableCell align="right">{row.calories}</TableCell>*/}
              {/*<TableCell align="right">{row.fat}</TableCell>*/}
              {/*<TableCell align="right">{row.carbs}</TableCell>*/}
              {/*<TableCell align="right">{row.protein}</TableCell>*/}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsTable;
