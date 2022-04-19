import { useState } from "react";
import { IToDo } from "../App";
import { baseUrl } from "../utils/baseUrl";
import { changeDate } from "../utils/changeDate";
import fetchData from "../utils/fetchData";
import { INewToDo } from "./ToDoList";
import axios from "axios";
import Container from "@mui/material/Container";
import DatePicker from "./DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

export default function AddNewToDo({
  setContentFieldIsEmpty,
  setToDoList,
  contentFieldIsEmpty,
}: {
  setContentFieldIsEmpty: React.Dispatch<React.SetStateAction<boolean[]>>;
  setToDoList: React.Dispatch<React.SetStateAction<IToDo[]>>;
  contentFieldIsEmpty: boolean[];
}): JSX.Element {
  const [newToDo, setNewToDo] = useState<INewToDo>({
    content: "",
    due: undefined /*cant send ("") to the server */,
  });

  const handleAddNewToDo = () => {
    if (newToDo.content.length === 0) {
      setContentFieldIsEmpty((prev) => [prev[1], true]); //[false,true]
    } else {
      setContentFieldIsEmpty((prev) => [prev[1], false]); //[false,false]
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
      <Container
        maxWidth="sm"
        component="div"
        sx={{
          pt: 6,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
        disableGutters
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          sx={{ width: 220 }}
          autoFocus={true}
          value={newToDo.content}
          error={
            contentFieldIsEmpty[1] ? true : undefined
          } /*conditinally adding this prop (so that the text field turns red when it is empty)*/
          onChange={(e) =>
            setNewToDo((prev) => ({ ...prev, content: e.target.value }))
          }
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker date={newToDo.due} setState={setNewToDo} />
        </LocalizationProvider>
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleAddNewToDo}
          size="small"
        >
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
}
