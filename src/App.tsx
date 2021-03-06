import { useEffect, useState } from "react";
import ToDoList from "./components/ToDoList";
import fetchData from "./utils/fetchData";
import CssBaseline from "@mui/material/CssBaseline";

export interface IToDo {
  id: number;
  content: string;
  due: string;
  complete: boolean;
  created_at: string;
}

function App(): JSX.Element {
  const [toDoList, setToDoList] = useState<IToDo[]>([]);
  useEffect(() => {
    fetchData(setToDoList);
  }, []);

  return (
    <>
      <CssBaseline />
      <ToDoList toDoList={toDoList} setToDoList={setToDoList} />
    </>
  );
}

export default App;
