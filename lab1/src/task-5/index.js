import { LIBRARY_NAME, books } from "./data.js";
import BookCollection, { getBooksByGenre, getAveragePages, getOldestBook } from "./utils.js";

console.log("=== Задание 5: Модули ===");
console.log("Бібліотека:", LIBRARY_NAME);
console.log("Всього книг:", books.length);

console.log("Книги жанру 'programming':", getBooksByGenre(books, "programming"));
console.log("Середня кількість сторінок:", getAveragePages(books));
console.log("Найстаріша книга:", getOldestBook(books));

const collection = new BookCollection(books);
collection.addBook({ title: "Новий роман", author: "Автор", year: 2023, pages: 300, genre: "novel" });
console.log("Після додавання книги, кількість:", collection.count);
console.log("Книги від старих до нових:", collection.getSortedByYear());
