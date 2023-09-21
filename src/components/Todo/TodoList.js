import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Button, IconButton, TextField } from '@mui/material';
import { addTodo, deleteTodo, getTodos, updateTodo } from '../../api/todoManager';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

export const TodoList = ({ token }) => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ content: '' });

    useEffect(() => {
        getTodos(token)
            .then(setTodos)
    }, [token]);


    const handleCheck = (id) => {
        const todoToUpdate = todos.find((todo) => todo.id === id);
        const updatedTodo = { 
            ...todoToUpdate, 
            done: !todoToUpdate.done,
        };
        updateTodo(updatedTodo, token)
            .then(() => {
            setTodos(
                todos.map((todo) =>
                todo.id === id ? updatedTodo : todo
            )
            );
        })
};
    
    const handleAddTodo = (e) => {
        e.preventDefault();
        addTodo(newTodo, token)
            .then((newTodo) => {
                setTodos([newTodo, ...todos]);
                setNewTodo({
                    content: '',
                });
            })
    };

    const handleDelete = (e, id) => {
        e.preventDefault();
        deleteTodo(id, token)
            .then(() => {
                setTodos(todos.filter((todo) => todo.id !== id));
            })
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
            Todo List
            </Typography>
            <Grid container direction="column" spacing={2} sx={{ maxWidth: '100%', overflowX: 'hidden' }}>
            <Grid item>
                <TextField
                    variant="outlined"
                    margin='normal'
                    label="New item"
                    value={newTodo.content}
                    onChange={(e) => {
                        const copy = { ...newTodo };
                        copy.content = e.target.value;
                        setNewTodo(copy)
                    }}
                />
                <br />
            <Button variant="contained" color="primary" onClick={handleAddTodo}>
            Add
            </Button>
        </Grid>
            {todos
                .filter((todo) => !todo.done)
                .map((todo) => (
                <Grid item key={todo.id}>
                    <Checkbox
                    checked={todo.done}
                    onChange={() => handleCheck(todo.id)}
                />
                <Typography variant="body1" display="inline">
                    {todo.content}
                </Typography>
                <IconButton aria-label="Delete" onClick={(e) => handleDelete(e, todo.id)}>
                    <HighlightOffOutlinedIcon />
                </IconButton>
                </Grid>
            ))}
            <Divider />
            {todos
                .filter((todo) => todo.done)
                .map((todo) => (
                <Grid item key={todo.id}>
                <Checkbox
                    checked={todo.done}
                    onChange={() => handleCheck(todo.id)}
                />
                <Typography
                    variant="body1"
                    display="inline"
                    sx={{
                        color: 'grey',
                        textDecoration: 'line-through',
                    }}
                >
                    {todo.content}
                </Typography>
                <IconButton aria-label="Delete" onClick={(e) => handleDelete(e, todo.id)}>
                    <HighlightOffOutlinedIcon />
                </IconButton>
                </Grid>
            ))}
        </Grid>
        </div>
    );
};
