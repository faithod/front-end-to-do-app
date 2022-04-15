import fetchData from "./fetchData";
import { IToDo } from "../App";

//create test for this

export function sortToDoList(
  value: string,
  toDoList: IToDo[],
  setToDoList: React.Dispatch<React.SetStateAction<IToDo[]>>
): void {
  //toDoList is already sorted by creation date
  if (value === "due-date") {
    const sortedArray = toDoList
      .filter((el) => el.due !== null)
      .sort((a, b) => Date.parse(a.due) - Date.parse(b.due));
    const elementsWithNullDates = toDoList.filter((el) => el.due === null);
    setToDoList(sortedArray.concat(elementsWithNullDates)); //putting the elements with null dates at the end
  } else if (value === "creation-date") {
    fetchData(setToDoList);
  }
}
