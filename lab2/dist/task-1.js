"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTaskStats(tasks) {
    const now = new Date();
    const byStatus = {
        todo: 0,
        in_progress: 0,
        done: 0,
        cancelled: 0,
    };
    let overdue = 0;
    tasks.forEach((task) => {
        byStatus[task.status]++;
        if (task.dueDate &&
            task.dueDate < now &&
            task.status !== "done" &&
            task.status !== "cancelled") {
            overdue++;
        }
    });
    return {
        total: tasks.length,
        byStatus,
        overdue,
    };
}
function formatTask(task) {
    return `[#${task.id}] ${task.title} (${task.priority}, ${task.status})`;
}
const tasks = [
    {
        id: 1,
        title: "Налаштувати CI/CD",
        description: "Встановити GitHub Actions",
        status: "in_progress",
        priority: "high",
        assignee: "Іван",
        createdAt: new Date("2025-01-10"),
        dueDate: new Date("2025-02-01"),
    },
    {
        id: 2,
        title: "Написати тести",
        description: "Unit-тести для функцій",
        status: "todo",
        priority: "medium",
        assignee: null,
        createdAt: new Date("2025-01-12"),
        dueDate: new Date("2025-02-15"),
    },
    {
        id: 3,
        title: "Налаштувати БД",
        description: "Підключити PostgreSQL",
        status: "done",
        priority: "critical",
        assignee: "Олена",
        createdAt: new Date("2025-01-05"),
        dueDate: new Date("2025-01-20"),
    },
    {
        id: 4,
        title: "Оновити документацію",
        description: "Swagger API",
        status: "todo",
        priority: "low",
        assignee: null,
        createdAt: new Date("2025-01-15"),
        dueDate: null,
    },
    {
        id: 5,
        title: "Code review",
        description: "Перевірка PR",
        status: "cancelled",
        priority: "medium",
        assignee: "Андрій",
        createdAt: new Date("2025-01-18"),
        dueDate: new Date("2025-01-25"),
    },
];
console.log("=== Завдання 1: Базові типи, інтерфейси та type aliases ===");
console.log("Task Stats:", getTaskStats(tasks));
tasks.forEach((t) => console.log(formatTask(t)));
//# sourceMappingURL=task-1.js.map