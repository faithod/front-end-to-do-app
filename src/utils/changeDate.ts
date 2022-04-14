//when a date is inserted into the table to_do_list
//the date is off by 1 - this function changes the request data that is about to be submitted
//and manually adds a day as a temporary fix //stackoverflow

import { INewToDo } from "../components/ToDoList";

export function changeDate(toDo: INewToDo): INewToDo {
  if (toDo.due) {
    //to add a day to date
    const date = new Date(toDo.due); //value is in format YYYY-MM-DD
    date.setDate(date.getDate() + 1);
    const outputDate = date.toISOString().slice(0, 10);

    //replace due property
    return { ...toDo, due: outputDate };
  }

  return toDo;
}
