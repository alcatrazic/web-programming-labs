export {};
type LoadingState = { status: "loading" };
type SuccessState<T> = { status: "success"; data: T; loadedAt: Date };
type ErrorState = { status: "error"; message: string; code: number };

type FetchState<T> = LoadingState | SuccessState<T> | ErrorState;
function isLoadingState(state: FetchState<unknown>): state is LoadingState {
  return state.status === "loading";
}

function isSuccessState<T>(state: FetchState<T>): state is SuccessState<T> {
  return state.status === "success";
}

function isErrorState(state: FetchState<unknown>): state is ErrorState {
  return state.status === "error";
}
function renderState<T>(state: FetchState<T>, renderData: (data: T) => string): string {
  if (isLoadingState(state)) return "⏳ Завантаження...";
  if (isSuccessState(state)) return `✅ Завантажено о ${state.loadedAt.toLocaleTimeString()}: ${renderData(state.data)}`;
  if (isErrorState(state)) return `❌ Помилка [${state.code}]: ${state.message}`;
  return "Невідомий стан";
}
function processValue(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "(порожнє значення)";
  if (typeof value === "string") return `Рядок: '${value}' (${value.length} символів)`;
  if (typeof value === "number") return `Число: ${value} (${value % 2 === 0 ? "парне" : "непарне"})`;
  if (typeof value === "boolean") return `Булеве: ${value ? "так" : "ні"}`;
  return "(невідомий тип)";
}
type Status = "todo" | "in_progress" | "done" | "cancelled";

function getStatusLabel(status: Status): string {
  switch (status) {
    case "todo": return "Заплановано";
    case "in_progress": return "В процесі";
    case "done": return "Виконано";
    case "cancelled": return "Скасовано";
    default: {
      const _exhaustiveCheck: never = status;
      return _exhaustiveCheck;
    }
  }
}
console.log("=== Завдання 5: Type Guards та звуження типів ===");

const states: FetchState<string[]>[] = [
  { status: "loading" },
  { status: "success", data: ["Задача1", "Задача2"], loadedAt: new Date() },
  { status: "error", message: "Not found", code: 404 },
];

states.forEach(state => console.log(renderState(state, data => `${data.length} задач`)));

const values: (string | number | boolean | null | undefined)[] = [
  "TypeScript", 42, true, null, undefined, 0, ""
];
values.forEach(v => console.log(processValue(v)));
