import { Box } from "@mui/system";

import { TaskTable } from "./components/TaskTable";
import { UserTable } from "./components/UserTable";
import { useAppSelector } from "../../app/hooks";

export const Home = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { users, tasks } = useAppSelector((state) => state.home);

  return (
    <Box sx={{ margin: 3 }}>
      {currentUser.role === "admin" && <UserTable users={users} />}
      {currentUser.role === "user" && <TaskTable tasks={tasks} />}
    </Box>
  );
};
