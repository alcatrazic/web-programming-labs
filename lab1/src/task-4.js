console.log("=== Задание 4: async/await ===");

// 4.1 delay
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 4.2 simulateFetch
export function simulateFetch(url) {
  return new Promise((resolve, reject) => {
    const time = 200 + Math.random() * 300;
    setTimeout(() => {
      if (!url.startsWith("https")) {
        reject(new Error(`Invalid URL: ${url}`));
      } else {
        if (Math.random() < 0.7) {
          resolve({ url, status: 200, data: "OK" });
        } else {
          reject(new Error("Server error: 500"));
        }
      }
    }, time);
  });
}

// 4.3 fetchWithRetry
export async function fetchWithRetry(url, attempts) {
  for (let i = 1; i <= attempts; i++) {
    try {
      console.log(`Попытка ${i} для ${url}`);
      const result = await simulateFetch(url);
      return result;
    } catch (error) {
      console.warn(error.message);
      if (i === attempts) throw error;
      await delay(500);
    }
  }
}

// 4.4 fetchMultiple
export async function fetchMultiple(urls) {
  const results = await Promise.allSettled(urls.map(u => simulateFetch(u)));
  const successful = results.filter(r => r.status === "fulfilled").map(r => r.value);
  const failed = results.filter(r => r.status === "rejected").map(r => r.reason.message);
  return { successful, failed };
}

// Демонстрация
(async function main() {
  console.time("delay");
  await delay(1000);
  console.timeEnd("delay");

  try {
    const res = await simulateFetch("https://jsonplaceholder.typicode.com/posts");
    console.log("Успех:", res);
  } catch (e) {
    console.error(e.message);
  }

  try {
    const res = await fetchWithRetry("https://jsonplaceholder.typicode.com/posts", 5);
    console.log("fetchWithRetry результат:", res);
  } catch (e) {
    console.error("Все попытки неудачные:", e.message);
  }

  const results = await fetchMultiple([
    "https://jsonplaceholder.typicode.com/posts",
    "http://invalid-url",
    "https://jsonplaceholder.typicode.com/users"
  ]);
  console.log("fetchMultiple результаты:", results);
})();
