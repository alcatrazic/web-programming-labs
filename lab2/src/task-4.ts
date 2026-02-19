export {};
abstract class BaseNotifier {
  constructor(protected readonly name: string) {}

  abstract send(to: string, subject: string, body: string): void;

  notify(to: string, subject: string, body: string): void {
    console.log(`[${this.name}] Надсилання сповіщення...`);
    this.send(to, subject, body);
    console.log(`[${this.name}] Сповіщення надіслано`);
  }
}
class EmailNotifier extends BaseNotifier {
  constructor(private readonly smtpServer: string) {
    super("Email");
  }

  send(to: string, subject: string, body: string): void {
    console.log(`📧 Email → ${to}: "${subject}" | Тіло: ${body.slice(0, 50)} через ${this.smtpServer}`);
  }
}
class SmsNotifier extends BaseNotifier {
  constructor(private readonly phonePrefix: string = "+380") {
    super("SMS");
  }

  send(to: string, subject: string, body: string): void {
    console.log(`📱 SMS → ${this.phonePrefix}${to}: "${body.slice(0, 160)}"`);
  }
}
function sendBulkNotification(notifiers: BaseNotifier[], to: string, subject: string, body: string): void {
  notifiers.forEach(notifier => notifier.notify(to, subject, body));
}
console.log("=== Завдання 4: Наслідування та поліморфізм ===");

const notifiers: BaseNotifier[] = [
  new EmailNotifier("smtp.gmail.com"),
  new SmsNotifier(),
];

sendBulkNotification(
  notifiers,
  "user@example.com",
  "Нова задача призначена",
  "Вам призначено задачу 'Розробити API' з пріоритетом high. Дедлайн: 01.02.2025",
);
