import React from "react";
import TodoInterface from "../../interfaces/TodoInterface";

interface TodoContextProps {
    showAlert: (type: string, message: string) => void;
    todos: TodoInterface[]; 
    setTodos: (todos: TodoInterface) => void; 
  }
  
  export const TodoContext = React.createContext<TodoContextProps | null>(null);
  