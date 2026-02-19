export {}; // чтобы файл считался модулем

// Типы и интерфейсы, как в Task 1
type Status = "todo" | "in_progress" | "done" | "cancelled";
type Priority = "low" | "medium" | "high" | "critical";

interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string | null;
  createdAt: Date;
  dueDate: Date | null;
}

// Класс TaskManager
class TaskManager {
  #tasks: Task[] = [];
  #nextId: number = 1;

  constructor(initialTasks: Task[] = []) {
    this.#tasks = [...initialTasks];
    this.#nextId = initialTasks.length + 1;
  }

  addTask(dto: Omit<Task, "id" | "createdAt">): Task {
    const task: Task = {
      ...dto,
      id: this.#nextId++,
      createdAt: new Date(),
    };
    this.#tasks.push(task);
    return task;
  }

  updateTask(id: number, updates: Partial<Omit<Task, "id" | "createdAt">>): Task | null {
    const task = this.#tasks.find(t => t.id === id);
    if (!task) return null;
    Object.assign(task, updates);
    return task;
  }

  deleteTask(id: number): boolean {
    const index = this.#tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.#tasks.splice(index, 1);
    return true;
  }

  getById(id: number): Task | undefined {
    return this.#tasks.find(t => t.id === id);
  }

  get tasks(): Task[] {
    return [...this.#tasks];
  }

  get count(): number {
    return this.#tasks.length;
  }
}

// Расширяем TaskManager для фильтров
class FilteredTaskManager extends TaskManager {
  getByStatus(status: Status): Task[] {
    return this.tasks.filter(t => t.status === status);
  }

  getByPriority(priority: Priority): Task[] {
    return this.tasks.filter(t => t.priority === priority);
  }

  getByAssignee(assignee: string): Task[] {
    return this.tasks.filter(t => t.assignee === assignee);
  }

  getOverdue(): Task[] {
    const now = new Date();
    return this.tasks.filter(t => t.dueDate && t.dueDate < now && t.status !== "done" && t.status !== "cancelled");
  }
}

// --- Демонстрация ---
console.log("=== Завдання 3: Класи та модифікатори доступу ===");

const manager = new FilteredTaskManager();

const task1 = manager.addTask({
  title: "Розробити API",
  description: "REST API для задач",
  status: "in_progress",
  priority: "high",
  assignee: "Іван",
  dueDate: new Date("2025-02-01"),
});

const task2 = manager.addTask({
  title: "Написати тести",
  description: "Unit тести для логіки",
  status: "todo",
  priority: "medium",
  assignee: null,
  dueDate: new Date("2025-02-15"),
});

const task3 = manager.addTask({
  title: "Налаштувати БД",
  description: "PostgreSQL, міграції",
  status: "done",
  priority: "critical",
  assignee: "Олена",
  dueDate: new Date("2025-01-20"),
});

console.log("Додано:", task1);
console.log("Кількість задач:", manager.count);

console.log("Задачи по статусу 'todo':", manager.getByStatus("todo"));
console.log("Задачи по приоритету 'high':", manager.getByPriority("high"));
console.log("Задачи без назначенного исполнителя:", manager.getByAssignee("Іван"));
console.log("Просроченные задачи:", manager.getOverdue());

manager.updateTask(task2.id, { status: "in_progress", assignee: "Петро" });
console.log("После обновления task2:", manager.getById(task2.id));

manager.deleteTask(task3.id);
console.log("После удаления task3, все задачи:", manager.tasks);
