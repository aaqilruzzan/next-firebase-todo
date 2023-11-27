"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import  db  from "../utils/firebase";
import { TodoContext } from "@/app/TodoContext";
import TodoInterface from "../interfaces/TodoInterface";

const Todo = ({ userId, timestamp, title, description, status }: TodoInterface) => {
  
  const todoContext = useContext(TodoContext);

  if (!todoContext) {
     // Context will always be provided this is just for typescript
    return null;
  }

  const { showAlert, todos, setTodos } = todoContext;

  const deleteTodo = async (
    userId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    const docRef = doc(db, "todos", userId);
    await deleteDoc(docRef);
    showAlert("error", "Todo Deleted Successfully");
  };

  const oncheckbox = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const isChecked = e.target.checked;
    const docRef = doc(db, "todos", userId);
    await updateDoc(docRef, {
      status: isChecked,
      timestamp: serverTimestamp(),
    });
    showAlert(
      "info",
      `Todo ${isChecked ? "Completed" : "Uncompleted"} Successfully`
    );
  };
  return (
    <>
      <ListItem
        sx={{
          mt: 3,
          boxshadow: 8 * 4,
          textDecoration: status ? "line-through" : "none",
          borderBottom: "1px solid #A8A7A5",
          borderRadius: 2,
        }}
        secondaryAction={
          <>
            <IconButton
              sx={{ color: "red" }}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                deleteTodo(userId, e)
              }
            >
              <DeleteIcon />
            </IconButton>
            <Checkbox
              key={userId}
              checked={status}
              onChange={oncheckbox}
        
            />
          </>
        }
      >
        <ListItemText
          primary={
            <Typography variant="h5" fontWeight="bold" color={"black"}>
              {title}
            </Typography>
          }
          secondary={
            <Typography color={"black"}>
              {moment(timestamp).format("MMMM Do YYYY, h:mm A")}
            </Typography>
          }
        ></ListItemText>
      </ListItem>

      <Card
        sx={{
          minWidth: 275,
          textDecoration: status ? "line-through" : "none",
        }}
      >
        <CardContent>
          <Typography
            sx={{ mt: 1.5, fontSize: 18, color: "black" }}
            variant="body2"
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions>
        {status ? (
            null 
          ) : (
        <Button
            size="small"
            onClick={() => {
              setTodos({ userId, timestamp, title, description, status });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
        Click to Update
      </Button>
)}
        </CardActions>
      </Card>
    </>
  );
};

export default Todo;
