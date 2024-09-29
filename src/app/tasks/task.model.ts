import { InjectionToken } from "@angular/core";

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export const TASK_STATUS_OPTIONS = new InjectionToken<{value: string, taskStatus: string, label: string}[]>('task-status-options');

export const TaskStatusOptions: {value: string, taskStatus: string, label: string}[] = [
  { value: 'open', label: 'Open', taskStatus: 'OPEN' },
  { value: 'in-progress', label: 'Working on it', taskStatus: 'IN_PROGRESS' },
  { value: 'done', label: 'Completed', taskStatus: 'DONE' },
];
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
