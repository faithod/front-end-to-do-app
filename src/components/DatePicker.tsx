import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { INewToDo } from "./ToDoList";

export default function DatePicker({
  date,
  setState,
}: {
  date: string | undefined;
  setState: React.Dispatch<React.SetStateAction<INewToDo>>;
}): JSX.Element {
  return (
    <DesktopDatePicker
      clearable
      inputFormat="dd/MM/yyyy"
      label="due"
      value={
        date === undefined ? null : date
      } /*as only null resets the mui date - should i change all undefined values to null? */
      onChange={(value: Date | null) => {
        console.log(typeof value);
        if (value && value.toString() !== "Invalid Date") {
          setState((prev) => ({
            ...prev,
            due: value
              .toISOString() //this mui input doesnt have an event, but a value that is a date object
              .slice(0, 10), //going from Sat Apr 23 2022 01:00:00 GMT+0100 (British Summer Time) to '2022-04-23'
          }));
        } else {
          setState((prev) => ({
            ...prev,
            due: undefined,
          }));
        }
      }}
      renderInput={(params) => (
        <TextField size="small" sx={{ width: 150 }} {...params} />
      )}
    />
  );
}
