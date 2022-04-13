import { IToDo } from "../App";
import addSuffix from "../utils/addSuffix";

export default function ToDoList({
  toDoList,
}: {
  toDoList: IToDo[];
}): JSX.Element {
  console.log(toDoList);
  function formatDate(date: string) {
    const months = [
      "Jan",
      "Feb",
      "March",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const [month, day] = date.slice(0, 10).split("-").slice(1); //extracting out month & day from the input string, format: YYYY-MM-DDT23:00:00.000Z
    const monthInLetters = months.find((el, i) => i === Number(month) - 1); //finding the spelt out month
    return `${addSuffix(day)} ${monthInLetters}`;
  }

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
    </main>
  );
}
