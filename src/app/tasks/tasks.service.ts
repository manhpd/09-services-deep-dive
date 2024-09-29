import { inject, Injectable, signal } from "@angular/core";
import { Task } from "./task.model";
import { LoggingService } from "../logging.service";

@Injectable({
    providedIn: 'root'
})

export class TaskService {
    private _loggingService = inject(LoggingService);
    private tasks = signal<Task[]>([]);

    allTasks = this.tasks.asReadonly();

    addTask(taskData: {title: string, description: string}) {
        const newTask: Task = {
            ...taskData,
            id: Math.random().toString(),
            status: 'OPEN'
        }
        this.tasks.update((oldTasks) => 
             [...oldTasks, newTask]
        );
        this._loggingService.log(`Task with title ${newTask.title} has been added`);
    }

    updateTask(id: string, status: 'OPEN' | 'IN_PROGRESS' | 'DONE') {
        this.tasks.update((oldTasks) => 
            oldTasks.map((task) => 
                task.id === id ? {...task, status} : task
            )
        );
        this._loggingService.log(`Task with id ${id} has been updated with status ${status}`);
    }
}