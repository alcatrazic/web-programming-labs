"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TaskManager_tasks, _TaskManager_nextId;
Object.defineProperty(exports, "__esModule", { value: true });
// Класс TaskManager
class TaskManager {
    constructor(initialTasks = []) {
        _TaskManager_tasks.set(this, []);
        _TaskManager_nextId.set(this, 1);
        __classPrivateFieldSet(this, _TaskManager_tasks, [...initialTasks], "f");
        __classPrivateFieldSet(this, _TaskManager_nextId, initialTasks.length + 1, "f");
    }
    addTask(dto) {
        var _a, _b;
        const task = {
            ...dto,
            id: (__classPrivateFieldSet(this, _TaskManager_nextId, (_b = __classPrivateFieldGet(this, _TaskManager_nextId, "f"), _a = _b++, _b), "f"), _a),
            createdAt: new Date(),
        };
        __classPrivateFieldGet(this, _TaskManager_tasks, "f").push(task);
        return task;
    }
    updateTask(id, updates) {
        const task = __classPrivateFieldGet(this, _TaskManager_tasks, "f").find(t => t.id === id);
        if (!task)
            return null;
        Object.assign(task, updates);
        return task;
    }
    deleteTask(id) {
        const index = __classPrivateFieldGet(this, _TaskManager_tasks, "f").findIndex(t => t.id === id);
        if (index === -1)
            return false;
        __classPrivateFieldGet(this, _TaskManager_tasks, "f").splice(index, 1);
        return true;
    }
    getById(id) {
        return __classPrivateFieldGet(this, _TaskManager_tasks, "f").find(t => t.id === id);
    }
    get tasks() {
        return [...__classPrivateFieldGet(this, _TaskManager_tasks, "f")];
    }
    get count() {
        return __classPrivateFieldGet(this, _TaskManager_tasks, "f").length;
    }
}
_TaskManager_tasks = new WeakMap(), _TaskManager_nextId = new WeakMap();
// Расширяем TaskManager для фильтров
class FilteredTaskManager extends TaskManager {
    getByStatus(status) {
        return this.tasks.filter(t => t.status === status);
    }
    getByPriority(priority) {
        return this.tasks.filter(t => t.priority === priority);
    }
    getByAssignee(assignee) {
        return this.tasks.filter(t => t.assignee === assignee);
    }
    getOverdue() {
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
//# sourceMappingURL=task-3.js.map