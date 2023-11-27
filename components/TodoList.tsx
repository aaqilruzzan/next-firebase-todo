"use client"
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import db  from '../utils/firebase';
import { Container, Divider, Typography } from '@mui/material';
import ToDo from './Todo';
import TodoInterface from '../interfaces/TodoInterface';

const TodoList = () => {
    const [todo, setTodo] = useState<TodoInterface[]>([]);

    useEffect(() => {
        const collectionRef = collection(db, 'todos');
        const q = query(collectionRef, orderBy('timestamp', 'asc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            console.log('Query Snapshot:', querySnapshot);

            setTodo(querySnapshot.docs.map(doc => {
                console.log('Document Data:', doc.data());

                return {
                    userId: doc.id,
                    title: doc.data().title,
                    description: doc.data().description,
                    status: doc.data().status,
                    timestamp: doc.data().timestamp?.toDate().getTime(),
                } as TodoInterface;
            }));
        }, (error) => {
            console.error('Error fetching data:', error);
        });

        return unsubscribe;
    }, []);

    const uncompletedtodos= todo.filter(todo => todo.status==false)
    const completedtodos= todo.filter(todo => todo.status==true)

    return (
        <Container disableGutters>
           {uncompletedtodos.map((todo) => (
               <ToDo
                    key={todo.userId}
                    userId={todo.userId}
                    title={todo.title}
                    description={todo.description}
                    status={todo.status}
                    timestamp={todo.timestamp}
                />
            ))}

            {completedtodos.length>0 && 
            <>
            <Typography variant='h5' sx={{mt:4,mb:2}}>Completed Todos</Typography>
            <Divider sx={{mb:2}}/>
            </>}

            {completedtodos.map((todo) => (
               <ToDo
                    key={todo.userId}
                    userId={todo.userId}
                    title={todo.title}
                    description={todo.description}
                    status={todo.status}
                    timestamp={todo.timestamp}
                />
            ))}
        </Container>
        
    );
};

export default TodoList;
