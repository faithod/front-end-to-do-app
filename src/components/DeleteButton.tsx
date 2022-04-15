import axios from "axios";
import { IToDo } from "../App";
import { baseUrl } from "../utils/baseUrl";
import fetchData from "../utils/fetchData";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

export default function DeleteButton({
  id,
  setToDoList,
}: {
  id: number;
  setToDoList: React.Dispatch<React.SetStateAction<IToDo[]>>;
}) {
  const handleDeleteToDo = (id: number) => {
    axios.delete(baseUrl + `/todolist/${id}`).then(() => {
      fetchData(setToDoList);
    });
  };
  return (
    <IconButton aria-label="delete" onClick={() => handleDeleteToDo(id)}>
      <ClearIcon />
    </IconButton>
  );
}
