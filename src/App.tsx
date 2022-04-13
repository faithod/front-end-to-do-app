import { useEffect, useState } from "react";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import fetchData from "./utils/fetchData";

export interface IToDo {
  id: number;
  content: string;
  due: string;
  complete: boolean;
  created_at: string;
}

function App(): JSX.Element {
  const [toDoList, setToDolist] = useState<IToDo[]>([]);
  useEffect(() => {
    fetchData("/todolist", setToDolist);
  }, []);

  return (
    <>
      <Header />
      <ToDoList toDoList={toDoList} />
    </>
  );
}

export default App;
