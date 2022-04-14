import { useState } from "react";
import { IToDo } from "../App";
import { baseUrl } from "../utils/baseUrl";
import fetchData from "../utils/fetchData";
import { formatDate } from "../utils/formatDate";
import axios from "axios";
import { changeDate } from "../utils/changeDate";

export interface INewToDo {
  content: string;
  due: undefined | string;
}

export default function ToDoList({
  toDoList,
  setToDolist,
}: {
  toDoList: IToDo[];
  setToDolist: React.Dispatch<React.SetStateAction<IToDo[]>>;
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

  console.log(newToDo);
  const handleAddNewToDo = () => {
    if (newToDo.content.length === 0) {
      setContentFieldIsEmpty(true);
    } else {
      axios.post(baseUrl + "/todolist", changeDate(newToDo)).then(() => {
        fetchData(setToDolist);
        setNewToDo({
          content: "",
          due: undefined,
        });
      });
    }
  };

  const handleDeleteToDo = (id: number) => {
    axios.delete(baseUrl + `/todolist/${id}`).then(() => {
      fetchData(setToDolist);
    });
  };

  const handleUpdateToDo = (id: number) => {
    console.log(updatedToDo);
    axios.put(baseUrl + `/todolist/${id}`, changeDate(updatedToDo)).then(() => {
      fetchData(setToDolist);
    });
  };
  //order by id to keep the order the same??
  return (
    <main>
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
          {toDoList.map((item, i) => (
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
                  <button
                    onClick={() => {
                      handleUpdateToDo(item.id);
                      setEditingId(undefined);
                    }}
                  >
                    Update
                  </button>
                </td>
              ) : (
                <>
                  <td>{item.content}</td>
                  <td>
                    <input type="checkbox" name="completed" />
                  </td>
                  <td>{item.due && formatDate(item.due)}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setUpdatedToDo({
                          content: item.content,
                          due: item.due.slice(0, 10),
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
        value={newToDo.due}
        type="date"
        onChange={(e) => {
          setNewToDo((prev) => ({ ...prev, due: e.target.value }));
          console.log(e.target.value);
        }}
      ></input>
      <button onClick={handleAddNewToDo}>Add New</button>
      {contentFieldIsEmpty && <p>field is empty</p>}
    </main>
  );
}
