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
import DatePicker from "./DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

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
  contentFieldIsEmpty,
}: {
  setContentFieldIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  setToDoList: React.Dispatch<React.SetStateAction<IToDo[]>>;
  contentFieldIsEmpty: boolean;
}) {
  const [newToDo, setNewToDo] = useState<INewToDo>({
    content: "",
    due: undefined /*cant send ("") to the server */,
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
      <Container
        maxWidth="sm"
        component="div"
        sx={{
          pt: 7,
          pl: 7,
          pr: 7,
          backgroundColor: "yellow",
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
          value={newToDo.content}
          onChange={(e) =>
            setNewToDo((prev) => ({ ...prev, content: e.target.value }))
          }
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker date={newToDo.due} setState={setNewToDo} />
        </LocalizationProvider>
        <Fab color="primary" aria-label="add" onClick={handleAddNewToDo}>
          <AddIcon />
        </Fab>
      </Container>
      {contentFieldIsEmpty && (
        <Typography variant="body1" gutterBottom sx={{ pl: 11 }}>
          field is empty
        </Typography>
      )}
    </>
  );
}
