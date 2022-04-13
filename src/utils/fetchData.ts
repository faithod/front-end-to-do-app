import { IToDo } from "../App";
import { baseUrl } from "./baseUrl";

export default function fetchData(
  endpoint: string,
  setState: React.Dispatch<React.SetStateAction<IToDo[]>>
): void {
  fetch(baseUrl + endpoint)
    .then((res) => res.json())
    .then((data) => setState(data.data));
}
