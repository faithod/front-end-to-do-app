import { useState } from "react";
import { IToDo } from "../App";
import { baseUrl } from "../utils/baseUrl";
import fetchData from "../utils/fetchData";
import { formatDate } from "../utils/formatDate";
import axios from "axios";
import { changeDate } from "../utils/changeDate";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddNewToDo from "./AddNewToDo";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import { Input } from "@mui/material";
import DatePicker from "./DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Select from "./Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const label = { inputProps: { "aria-label": "Checkbox" } };

export interface INewToDo {
  content: string;
  due: undefined | string;
}

export default function ToDoList({
  toDoList,
  setToDoList,
}: {
  toDoList: IToDo[];
  setToDoList: React.Dispatch<React.SetStateAction<IToDo[]>>;
}): JSX.Element {
  const [contentFieldIsEmpty, setContentFieldIsEmpty] = useState([
    false,
    false,
  ]); //for the 2 seperate fields: update field, add new to-do field
  const [editingId, setEditingId] = useState<number>();
  const [updatedToDo, setUpdatedToDo] = useState<INewToDo>({
    content: "",
    due: undefined,
  });
  const [filterValue, setFilterValue] = useState("");

  const handleUpdateToDo = (id: number) => {
    if (updatedToDo.content.length === 0) {
      setContentFieldIsEmpty((prev) => [true, prev[1]]); //[true,false]
    } else {
      setContentFieldIsEmpty((prev) => [false, prev[1]]);
      setEditingId(undefined);
      axios
        .patch(baseUrl + `/todolist/${id}`, changeDate(updatedToDo))
        .then(() => {
          fetchData(setToDoList);
        });
    }
  };

  const handleChangeComplete = (id: number, completeValue: boolean) => {
    axios
      .patch(baseUrl + `/todolist/${id}`, {
        complete: (!completeValue).toString(),
      }) //sending {complete: false} to the server only works when i send it as a string for some reason > ('false')
      .then(() => {
        fetchData(setToDoList);
      });
  };

  function filterToDoList(toDoList: IToDo[], value: string) {
    if (value === "completed") {
      return toDoList.filter((el) => el.complete === true);
    } else if (value === "uncomplete") {
      return toDoList.filter((el) => el.complete !== true);
    } /*ADD LATER: else if (value==="overdue") {
          filteredToDo = toDoList.filter(el=>el.due);
        }*/ else {
      return toDoList;
    }
  }

  const filteredToDoList = filterToDoList(toDoList, filterValue);

  return (
    <Container
      maxWidth="sm"
      component="main"
      sx={{
        p: 7,
        backgroundColor: "#e3f2fd",
        my: 5,
        borderRadius: 20,
      }}
      // position: "absolute",
      //   top: 0,
      //   bottom: 0,
      //   left: 0,
      //   right: 0,
      //   margin: "auto",
      //   width: 700,
      //   height: 700,
      disableGutters
    >
      <Typography
        variant="h3"
        component="h1"
        align="center"
        color="text.primary"
        fontFamily="sans-serif"
        fontWeight={800}
        gutterBottom
      >
        What do you need to do this week?
      </Typography>
      <Box sx={{ display: "flex", backgroundColor: "#e3f2fd" }}>
        <Select
          selectType={"Sort"}
          toDoList={toDoList}
          setToDoList={setToDoList}
        />

        <Select selectType={"Filter"} setFilterValue={setFilterValue} />
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: 5 }}>
        <Table aria-label="to-do table">
          <TableBody>
            {filteredToDoList.map((item, i) => {
              const checked = item.complete;
              return (
                <TableRow key={i}>
                  {editingId === item.id ? (
                    <>
                      <TableCell>
                        <Input
                          value={updatedToDo.content}
                          error={
                            contentFieldIsEmpty[0] ? true : undefined
                          } /*conditinally adding this prop (so that the text field turns red when it is empty)*/
                          type="text"
                          autoFocus={true}
                          onChange={(e) =>
                            setUpdatedToDo((prev) => ({
                              ...prev,
                              content: e.target.value,
                            }))
                          }
                        ></Input>
                      </TableCell>
                      <TableCell>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            date={updatedToDo.due}
                            setState={setUpdatedToDo}
                          />
                        </LocalizationProvider>
                      </TableCell>
                      <TableCell align="right" sx={{ width: 155 }}>
                        <IconButton onClick={() => handleUpdateToDo(item.id)}>
                          <DoneIcon />
                        </IconButton>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell sx={{ width: 140 }}>{item.content}</TableCell>
                      <TableCell sx={{ color: "#546e7a" }}>
                        {item.due && formatDate(item.due)}
                      </TableCell>
                      <TableCell align="right">
                        <Checkbox
                          {...label}
                          name="completed"
                          checked={checked ? true : false}
                          onChange={() =>
                            handleChangeComplete(item.id, item.complete)
                          }
                        />
                        <EditButton
                          content={item.content}
                          due={item.due}
                          id={item.id}
                          setEditingId={setEditingId}
                          setUpdatedToDo={setUpdatedToDo}
                        />
                        <DeleteButton id={item.id} setToDoList={setToDoList} />
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <AddNewToDo
        setContentFieldIsEmpty={setContentFieldIsEmpty}
        setToDoList={setToDoList}
        contentFieldIsEmpty={contentFieldIsEmpty}
      />
    </Container>
  );
}
