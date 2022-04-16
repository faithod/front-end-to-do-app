import { useState } from "react";
import { IToDo } from "../App";
import { baseUrl } from "../utils/baseUrl";
import { changeDate } from "../utils/changeDate";
import fetchData from "../utils/fetchData";
import { INewToDo } from "./ToDoList";
import axios from "axios";
import Container from "@mui/material/Container";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

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
    <Container
      maxWidth="sm"
      component="div"
      sx={{
        p: 7,
        backgroundColor: "yellow",
      }}
      disableGutters
    >
      <BootstrapInput
        value={newToDo.content}
        type="text"
        onChange={(e) =>
          setNewToDo((prev) => ({ ...prev, content: e.target.value }))
        }
      />
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
    </Container>
  );
}
