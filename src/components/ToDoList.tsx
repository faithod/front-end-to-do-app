import { IToDo } from "../App";

export default function ToDoList({
  toDoList,
}: {
  toDoList: IToDo[];
}): JSX.Element {
  console.log(toDoList);
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
              <td>{item.due}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
