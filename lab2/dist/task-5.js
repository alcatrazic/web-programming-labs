"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLoadingState(state) {
    return state.status === "loading";
}
function isSuccessState(state) {
    return state.status === "success";
}
function isErrorState(state) {
    return state.status === "error";
}
function renderState(state, renderData) {
    if (isLoadingState(state))
        return "⏳ Завантаження...";
    if (isSuccessState(state))
        return `✅ Завантажено о ${state.loadedAt.toLocaleTimeString()}: ${renderData(state.data)}`;
    if (isErrorState(state))
        return `❌ Помилка [${state.code}]: ${state.message}`;
    return "Невідомий стан";
}
function processValue(value) {
    if (value === null || value === undefined)
        return "(порожнє значення)";
    if (typeof value === "string")
        return `Рядок: '${value}' (${value.length} символів)`;
    if (typeof value === "number")
        return `Число: ${value} (${value % 2 === 0 ? "парне" : "непарне"})`;
    if (typeof value === "boolean")
        return `Булеве: ${value ? "так" : "ні"}`;
    return "(невідомий тип)";
}
function getStatusLabel(status) {
    switch (status) {
        case "todo": return "Заплановано";
        case "in_progress": return "В процесі";
        case "done": return "Виконано";
        case "cancelled": return "Скасовано";
        default: {
            const _exhaustiveCheck = status;
            return _exhaustiveCheck;
        }
    }
}
console.log("=== Завдання 5: Type Guards та звуження типів ===");
const states = [
    { status: "loading" },
    { status: "success", data: ["Задача1", "Задача2"], loadedAt: new Date() },
    { status: "error", message: "Not found", code: 404 },
];
states.forEach(state => console.log(renderState(state, data => `${data.length} задач`)));
const values = [
    "TypeScript", 42, true, null, undefined, 0, ""
];
values.forEach(v => console.log(processValue(v)));
//# sourceMappingURL=task-5.js.map