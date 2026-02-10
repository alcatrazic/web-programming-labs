console.log("=== Завдання 1: Деструктуризація та Spread/Rest ===");

// 1.1. getFullName
export function getFullName(user) {
  const { firstName, lastName, middleName = "" } = user;
  const initials = middleName
    ? `${firstName[0]}. ${middleName[0]}.`
    : `${firstName[0]}.`;
  return `${lastName} ${initials}`;
}

// 1.2. mergeObjects
export function mergeObjects(...objects) {
  return Object.assign({}, ...objects);
}

// 1.3. removeDuplicates
export function removeDuplicates(...arrays) {
  return [...new Set(arrays.flat())];
}

// 1.4. createUpdatedUser
export function createUpdatedUser(user, updates) {
  return {
    ...user,
    ...updates,
    address: user.address && updates.address
      ? { ...user.address, ...updates.address }
      : updates.address || user.address,
  };
}

// Примеры
console.log("1.1:", getFullName({ firstName: "Петро", lastName: "Іванов", middleName: "Сергійович" }));
console.log("1.1:", getFullName({ firstName: "Анна", lastName: "Коваль" }));
console.log("1.2:", mergeObjects({ a: 1 }, { b: 2 }, { a: 3, c: 4 }));
console.log("1.3:", removeDuplicates([1,2,3], [2,3,4], [4,5]));
const user = { name: "John", age: 25, address: { city: "Kyiv", zip: "01001" } };
console.log("1.4:", createUpdatedUser(user, { age: 26, address: { zip: "02002" } }));
