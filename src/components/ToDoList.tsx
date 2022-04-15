import { useState } from "react";
import { IToDo } from "../App";
import { baseUrl } from "../utils/baseUrl";
import fetchData from "../utils/fetchData";
import { formatDate } from "../utils/formatDate";
import axios from "axios";
import { changeDate } from "../utils/changeDate";
import { sortedToDoList } from "../utils/sortedToDoList";
import Container from "@mui/material/Container";

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
  const [newToDo, setNewToDo] = useState<INewToDo>({
    content: "",
    due: undefined,
  });
  const [contentFieldIsEmpty, setContentFieldIsEmpty] = useState(false);
  const [editingId, setEditingId] = useState<number>();
  const [updatedToDo, setUpdatedToDo] = useState<INewToDo>({
    content: "",
    due: undefined,
  });
  const [filterValue, setFilterValue] = useState("");

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

  const handleDeleteToDo = (id: number) => {
    axios.delete(baseUrl + `/todolist/${id}`).then(() => {
      fetchData(setToDoList);
    });
  };

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
      <select
        name="sort-by"
        onChange={(e) => sortedToDoList(e.target.value, toDoList, setToDoList)}
      >
        <option value="" disabled selected>
          Sort By
        </option>
        <option value="due-date">due date</option>
        <option value="reset">reset</option>
      </select>

      <select name="filter-by" onChange={(e) => setFilterValue(e.target.value)}>
        <option value="" disabled selected>
          Filter By
        </option>
        <option value="complete">completed</option>
        <option value="uncomplete">uncomplete</option>
        {/* <option value="overdue">overdue</option> */}
        <option value="reset">reset filters</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Content</th>
            <th>complete</th>
            <th>due</th>
            <th>delete</th>
            <th>edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredToDoList.map((item, i) => (
            <tr key={i}>
              {editingId === item.id ? (
                <td>
                  <input
                    value={updatedToDo.content}
                    type="text"
                    onChange={(e) =>
                      setUpdatedToDo((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                  ></input>
                  <input
                    value={updatedToDo.due}
                    type="date"
                    onChange={(e) => {
                      setUpdatedToDo((prev) => ({
                        ...prev,
                        due: e.target.value,
                      }));
                      console.log(e.target.value);
                    }}
                  ></input>
                  <button onClick={() => handleUpdateToDo(item.id)}>
                    Update
                  </button>
                </td>
              ) : (
                <>
                  <td>{item.content}</td>
                  <td>
                    <input
                      type="checkbox"
                      name="completed"
                      onChange={() =>
                        handleChangeComplete(item.id, item.complete)
                      }
                    />
                  </td>
                  <td>{item.due && formatDate(item.due)}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setUpdatedToDo({
                          content: item.content,
                          due: item.due ? item.due.slice(0, 10) : "",
                        });
                        console.log(item.due);
                      }}
                    >
                      edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteToDo(item.id)}>
                      delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

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
      {contentFieldIsEmpty && <p>field is empty</p>}
    </Container>
  );
}
