import { useState } from "react";
import { IToDo } from "../App";
import { baseUrl } from "../utils/baseUrl";
import { changeDate } from "../utils/changeDate";
import fetchData from "../utils/fetchData";
import { INewToDo } from "./ToDoList";
import axios from "axios";

export default function AddNewToDo({
  setContentFieldIsEmpty,
  setToDoList,
}: {
  setContentFieldIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  setToDoList: React.Dispatch<React.SetStateAction<IToDo[]>>;
}) {
  const [newToDo, setNewToDo] = useState<INewToDo>({
    content: "",
    due: undefined,
  });

  const handleAddNewToDo = () => {
    if (newToDo.content.length === 0) {
      setContentFieldIsEmpty(true);
    } else {
      setContentFieldIsEmpty(false);
      axios.post(baseUrl + "/todolist", changeDate(newToDo)).then(() => {
        fetchData(setToDoList);
        setNewToDo({
          content: "",
          due: undefined,
        });
      });
    }
  };
  return (
    <>
      <input
        value={newToDo.content}
        type="text"
        onChange={(e) =>
          setNewToDo((prev) => ({ ...prev, content: e.target.value }))
        }
      ></input>
      <input
        value={
          newToDo.due === undefined
            ? ""
            : newToDo.due /*as only ("") resets the date AND because we can't send ("") to the server */
        }
        type="date"
        onChange={(e) => {
          setNewToDo((prev) => ({ ...prev, due: e.target.value }));
          console.log(e.target.value);
        }}
      ></input>
      <button onClick={handleAddNewToDo}>Add New</button>
    </>
  );
}
