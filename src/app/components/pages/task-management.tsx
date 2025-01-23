import React, { useState } from 'react';
import { Input, Button, List, message, Modal } from 'antd';

interface Task {
    id: number;
    name: string;
}

const TaskManagement = () => {
    const [tasks, setTasks] = useState<Task[]>([]); 
    const [task, setTask] = useState<string>(''); 
    const [editTask, setEditTask] = useState<Task | null>(null); 
    const [editTaskValue, setEditTaskValue] = useState<string>('');

    const addTask = () => {
        if (task) {
            setTasks([...tasks, { id: Date.now(), name: task }]);
            setTask('');
            message.success('Task added successfully');
        } else {
            message.warning('Please enter a task');
        }
    };

    const deleteTask = (id: any) => {
        setTasks(tasks.filter((t) => t.id !== id));
        message.success('Task deleted successfully');
    };

    const startEditTask = (taskToEdit: any) => {
        setEditTask(taskToEdit);
        setEditTaskValue(taskToEdit.name); 
    };

    const updateTask = () => {
        if (editTask && editTaskValue) {
            setTasks(
                tasks.map((task) =>
                    task.id === editTask.id ? { ...task, name: editTaskValue } : task
                )
            );
            setEditTask(null);
            setEditTaskValue('');
            message.success('Task updated successfully');
        } else {
            message.warning('Please enter a task name');
        }
    };


    return (
        <div style={{ padding: '20px' }}>
            <h2>Task Manager</h2>
            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="Enter a task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    style={{ width: '80%', marginRight: '10px' }}
                />
                <Button type="primary" onClick={addTask}>
                    Add Task
                </Button>
            </div>
            <List
                bordered
                dataSource={tasks}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Button
                                type="link"
                                onClick={() => startEditTask(item)}
                            >
                                Edit
                            </Button>,
                            <Button
                                type="link"
                                danger
                                onClick={() => deleteTask(item.id)}
                            >
                                Delete
                            </Button>,
                        ]}
                    >
                        {item.name}
                    </List.Item>
                )}
            />

            <Modal
                title="Edit Task"
                visible={editTask !== null}
                onCancel={() => setEditTask(null)}
                footer={[
                    <Button key="back" onClick={() => setEditTask(null)}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={updateTask}
                    >
                        Update Task
                    </Button>,
                ]}
            >
                <Input
                    value={editTaskValue}
                    onChange={(e) => setEditTaskValue(e.target.value)}
                    placeholder="Update task name"
                />
            </Modal>
        </div>
    );
};

export default TaskManagement;
