import { useState } from "react";
import { IToDo } from "../App";
import { formatDate } from "../utils/formatDate";

interface INewToDo {
  content: string;
  due: string;
}

export default function ToDoList({
  toDoList,
}: {
  toDoList: IToDo[];
}): JSX.Element {
  console.log(toDoList);
  const [newToDo, setNewToDo] = useState<INewToDo>({
    content: "",
    due: "",
  });

  console.log(newToDo);

  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>Content</th>
            <th>complete</th>
            <th>edit</th>
            <th>delete</th>
            <th>due</th>
          </tr>
        </thead>
        <tbody>
          {toDoList.map((item, i) => (
            <tr key={i}>
              <td>{item.content}</td>
              <td>
                <input type="checkbox" name="completed" />
              </td>
              <td>
                <button>edit</button>
              </td>
              <td>
                <button>delete</button>
              </td>
              <td>{formatDate(item.due)}</td>
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
        onChange={(e) =>
          setNewToDo((prev) => ({ ...prev, due: e.target.value }))
        }
      ></input>
      <button>Add New</button>
    </main>
  );
}
