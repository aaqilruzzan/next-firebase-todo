"use client"
import { Alert, Container, Snackbar } from '@mui/material'

import TodoList from '../../components/TodoList'
import TodoForm from '../../components/TodoForm'
import { useState } from 'react';
import { TodoContext } from './TodoContext';
import SideMenu from '../../components/SideMenu';



export default function Home() {
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [todos, setTodos] = useState({ title: "", description: "" });

  const showAlert = (
    type: "success" | "error" | "info" | "warning",
    message: string
  ): void => {
    setAlertType(type);
    setAlertMessage(message);
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };


  return (
    // @ts-ignore
    <TodoContext.Provider value={{ showAlert ,todos,setTodos} as TodoContextType} >
      <Container maxWidth="sm">
      <SideMenu/>
        <TodoForm />
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}
        anchorOrigin={{vertical:'bottom',horizontal:'center'}}>
          <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
        <TodoList />
      </Container>
    </TodoContext.Provider>
  );
}
