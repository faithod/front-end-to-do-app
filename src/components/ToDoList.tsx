import { useState } from "react";
import { IToDo } from "../App";
import { baseUrl } from "../utils/baseUrl";
import fetchData from "../utils/fetchData";
import { formatDate } from "../utils/formatDate";
import axios from "axios";
import { changeDate } from "../utils/changeDate";
import { sortToDoList } from "../utils/sortToDoList";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
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

const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
  console.log(toDoList);

  const [contentFieldIsEmpty, setContentFieldIsEmpty] = useState(false);
  const [editingId, setEditingId] = useState<number>();
  const [updatedToDo, setUpdatedToDo] = useState<INewToDo>({
    content: "",
    due: undefined,
  });
  const [filterValue, setFilterValue] = useState("");

  const handleUpdateToDo = (id: number) => {
    console.log(updatedToDo);
    if (updatedToDo.content.length === 0) {
      setContentFieldIsEmpty(true);
    } else {
      setContentFieldIsEmpty(false);
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
      .patch(baseUrl + `/todolist/${id}`, { complete: !completeValue })
      .then(() => {
        fetchData(setToDoList);
      });
  };

  function filterToDoList(toDoList: IToDo[], value: string) {
    if (value === "complete") {
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
      sx={{ pt: 7, pb: 6, backgroundColor: "secondary.dark" }}
      disableGutters
    >
      <Select
        selectType={"Sort"}
        toDoList={toDoList}
        setToDoList={setToDoList}
      />
      <Select selectType={"Filter"} setFilterValue={setFilterValue} />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Content</TableCell>
              <TableCell align="right">due</TableCell>
              <TableCell align="right">complete, edit, delete</TableCell>
            </TableRow>
          </TableHead>
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
                          type="text"
                          onChange={(e) =>
                            setUpdatedToDo((prev) => ({
                              ...prev,
                              content: e.target.value,
                            }))
                          }
                        ></Input>
                      </TableCell>
                      <TableCell align="right">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            date={updatedToDo.due}
                            setState={setUpdatedToDo}
                          />
                        </LocalizationProvider>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleUpdateToDo(item.id)}>
                          <DoneIcon />
                        </IconButton>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{item.content}</TableCell>
                      <TableCell align="right">
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
      />
      {contentFieldIsEmpty && <p>field is empty</p>}
    </Container>
  );
}
