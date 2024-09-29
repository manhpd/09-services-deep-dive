import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../tasks.service';
import { TASK_STATUS_OPTIONS, TaskStatusOptions } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [{
    provide: TASK_STATUS_OPTIONS,
    useValue: TaskStatusOptions
  }]
})
export class TasksListComponent {
  private _taskService = inject(TaskService);

  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  tasks = computed(() => {
      switch (this.selectedFilter()) {
          case 'all':
              return this._taskService.allTasks();
          case 'open':
              return this._taskService.allTasks().filter((task) => task.status === 'OPEN');
          case 'in-progress':
              return this._taskService.allTasks().filter((task) => task.status === 'IN_PROGRESS');
          case 'done':
              return this._taskService.allTasks().filter((task) => task.status === 'DONE');
          default:
              return this._taskService.allTasks();
      }
  });

  selectedFilter = signal<string>('all');
  

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
