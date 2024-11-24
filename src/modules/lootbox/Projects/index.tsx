import { FC } from "react";
import { Box, Typography } from "@mui/material";

import ProjectsTable from "./ProjectsTable";

const Projects: FC = () => {
  return (
    <Box py={{ miniMobile: 2, md: 4 }}>
      <Typography variant={"h4"} mb={4}>
        Lootbox Projects
      </Typography>
      <ProjectsTable />
    </Box>
  );
};

export default Projects;
