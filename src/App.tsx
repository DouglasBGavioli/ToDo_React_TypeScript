import React, { useState } from "react";
//Components
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

//CSS
import styles from "./App.module.css";

// Interfaces
import { ITask } from "./interfaces/Task";
import Modal from "./components/Modal";

function App() {
    //Lista de tarefas
    const [taskList, setTaskList] = useState<ITask[]>([]);
    const [taskToUpDate, setTaskToUpDate] = useState<ITask | null>(null);

    const deleteTask = (id: number) => {
        setTaskList(
            taskList.filter((task) => {
                return task.id !== id;
            })
        );
    };

    const hideOrShowModal = (display: boolean) => {
        const modal = document.querySelector("#modal");
        if (display) {
            modal!.classList.remove("hide");
        } else {
            modal!.classList.add("hide");
        }
    };

    const editTask = (task: ITask): void => {
        hideOrShowModal(true);
        setTaskToUpDate(task);
    };

    const updateTask = (id: number, title: string, difficulty: number) => {
        const updatedTask: ITask = { id, title, difficulty };
        const updatedItens = taskList.map((task) => {
            return task.id === updatedTask.id ? updatedTask : task;
        });
        setTaskList(updatedItens);

        hideOrShowModal(false);
    };
    return (
        <div>
            <Modal
                children={
                    <TaskForm
                        btnText="Editar Tarefa"
                        taskList={taskList}
                        task={taskToUpDate}
                        handleUpdate={updateTask}
                    />
                }
            />
            <Header />
            <main className={styles.main}>
                <TaskForm
                    btnText="Criar tarefa"
                    taskList={taskList}
                    setTaskList={setTaskList}
                />
                <TaskList
                    taskList={taskList}
                    handleDelete={deleteTask}
                    handleEdit={editTask}
                />
            </main>
            <Footer />
        </div>
    );
}

export default App;
