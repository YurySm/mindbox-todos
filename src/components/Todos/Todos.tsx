'use client'
import styles from './Todos.module.css'
import {Button, Checkbox, Input} from "@nextui-org/react";
import {useActions, useAppSelector} from "@/store/reduxHooks";
import {useEffect, useState} from "react";
import {ITodo} from "@/store/todos/data/data";

export function Todos () {
    const todos = useAppSelector((state) => state.todos);
    const {todoAdded, todoToggledComplete, clearCompleted} = useActions()

    const [filteredTodos, setFilteredTodos] = useState<ITodo[]>(todos)
    const [nameNewTodo, setNameNewTodo] = useState("")
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

    useEffect(() => {
        setFilteredTodos(todos)
        console.log(todos)
    }, [todos])

    useEffect(() => {
        switch (filter) {
            case 'all':
                setFilteredTodos(todos)
                break
            case "active":
                setFilteredTodos(todos.filter(t => !t.isComplete))
                break
            case "completed":
                setFilteredTodos(todos.filter(t => t.isComplete))
                break
        }
    }, [filter])


    return (
        <div
            className="flex items-center flex-col justify-items-center min-h-screen p-8 pb-20 gap-6 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-6xl leading-tight uppercase">todos</h1>
            <div className={'w-1/3 grid grid-cols-[6fr_1fr] gap-2'}>
                <Input
                    value={nameNewTodo}
                    onChange={(e) => setNameNewTodo(e.target.value)}
                    size="sm"
                    type={'text'}
                    variant={"bordered"}
                    label="add todo"/>

                <Button
                    isDisabled={nameNewTodo === ''}
                    radius="sm"
                    color="primary"
                    variant="shadow"
                    size="lg"
                    onClick={() => {
                        if (nameNewTodo !== '') {
                            todoAdded(nameNewTodo)
                            setNameNewTodo('')
                        }
                    }}
                >
                    Add
                </Button>
            </div>

            {
                filteredTodos.map(t => (
                    <div
                        key={t.id}
                        className={styles.todo__item}>

                        <Checkbox
                            size="lg"
                            lineThrough
                            isSelected={t.isComplete}
                            onValueChange={() => todoToggledComplete(t.id)}
                        >
                            {t.name}
                        </Checkbox>
                    </div>
                ))
            }

            <div className="w-1/3 grid grid-cols-[1fr_3fr_1fr] gap-2 justify-between">
                <span>{filteredTodos.length} items</span>

                <div className="flex flex-wrap gap-2 justify-center">
                    <Button
                        color="primary"
                        variant={filter === 'all' ? "shadow" : "bordered"}
                        size="sm"
                        onClick={() => setFilter('all')}
                    >
                        All
                    </Button>
                    <Button
                        color="primary"
                        variant={filter === 'active' ? "shadow" : "bordered"}
                        size="sm"
                        onClick={() => setFilter('active')}
                    >
                        Active
                    </Button>
                    <Button
                        color="primary"
                        variant={filter === 'completed' ? "shadow" : "bordered"}
                        size="sm"
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </Button>
                </div>

                <Button
                    color="primary"
                    variant="light"
                    size="sm"
                    onClick={() => clearCompleted()}
                >
                    Clear completed
                </Button>
            </div>
        </div>
    );
};