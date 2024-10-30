// utils/taskHandler.ts
import { Task, TaskCreateDTO } from "../types/Task";
import { v4 as uuidv4 } from "uuid";

// Mock data
let tasks: Task[] = [
  {
    id: uuidv4(),
    type: "kratki_tekst",
    title: "Prvi zadatak",
    description: "Opis prvog zadatka",
    createdAt: new Date(),
  },
];

export const TaskHandler = {
  getTasks: (): Task[] => {
    return [...tasks];
  },

  getTaskById: (id: string): Task | undefined => {
    return tasks.find((task) => task.id === id);
  },

  createTask: (taskData: TaskCreateDTO): Task => {
    const newTask: Task = {
      id: uuidv4(),
      ...taskData,
      createdAt: new Date(),
    };
    tasks.push(newTask);
    return newTask;
  },

  updateTask: (
    id: string,
    taskData: Partial<TaskCreateDTO>
  ): Task | undefined => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return undefined;

    tasks[index] = { ...tasks[index], ...taskData };
    return tasks[index];
  },

  deleteTask: (id: string): boolean => {
    const initialLength = tasks.length;
    tasks = tasks.filter((task) => task.id !== id);
    return tasks.length !== initialLength;
  },
};
