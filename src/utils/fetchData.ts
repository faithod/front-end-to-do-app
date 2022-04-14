import { IToDo } from "../App";
import { baseUrl } from "./baseUrl";

export default function fetchData(
  setState: React.Dispatch<React.SetStateAction<IToDo[]>>
): void {
  fetch(baseUrl + "/todolist")
    .then((res) => res.json())
    .then((data) => {
      setState(data.data);
    });
}
