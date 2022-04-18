import fetchData from "./fetchData";
import { IToDo } from "../App";

export function sortToDoList(
  value: string,
  toDoList: IToDo[],
  setToDoList: React.Dispatch<React.SetStateAction<IToDo[]>>
): void {
  console.log(toDoList);
  //toDoList is already sorted by creation date/id
  if (value === "due-date") {
    const sortedArray = toDoList
      .filter((el) => el.due !== null)
      .sort((a, b) => Date.parse(a.due) - Date.parse(b.due));
    const elementsWithNullDates = toDoList.filter((el) => el.due === null);
    console.log(sortedArray, elementsWithNullDates);
    setToDoList([...sortedArray, ...elementsWithNullDates]); //putting the elements with null dates at the end
  } else if (value === "reset") {
    fetchData(setToDoList);
  }
}

//can't create test because of setState argument
