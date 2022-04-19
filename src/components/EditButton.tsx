import { INewToDo } from "./ToDoList";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function EditButton({
  id,
  content,
  due,
  setEditingId,
  setUpdatedToDo,
}: {
  id: number;
  content: string;
  due: string;
  setEditingId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setUpdatedToDo: React.Dispatch<React.SetStateAction<INewToDo>>;
}) {
  return (
    <IconButton
      onClick={() => {
        setEditingId(id);
        setUpdatedToDo({
          content: content,
          due: due ? due.slice(0, 10) : undefined,
        });
        console.log(due);
      }}
    >
      <EditIcon />
    </IconButton>
  );
}
