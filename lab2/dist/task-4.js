"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseNotifier {
    constructor(name) {
        this.name = name;
    }
    notify(to, subject, body) {
        console.log(`[${this.name}] Надсилання сповіщення...`);
        this.send(to, subject, body);
        console.log(`[${this.name}] Сповіщення надіслано`);
    }
}
class EmailNotifier extends BaseNotifier {
    constructor(smtpServer) {
        super("Email");
        this.smtpServer = smtpServer;
    }
    send(to, subject, body) {
        console.log(`📧 Email → ${to}: "${subject}" | Тіло: ${body.slice(0, 50)} через ${this.smtpServer}`);
    }
}
class SmsNotifier extends BaseNotifier {
    constructor(phonePrefix = "+380") {
        super("SMS");
        this.phonePrefix = phonePrefix;
    }
    send(to, subject, body) {
        console.log(`📱 SMS → ${this.phonePrefix}${to}: "${body.slice(0, 160)}"`);
    }
}
function sendBulkNotification(notifiers, to, subject, body) {
    notifiers.forEach(notifier => notifier.notify(to, subject, body));
}
console.log("=== Завдання 4: Наслідування та поліморфізм ===");
const notifiers = [
    new EmailNotifier("smtp.gmail.com"),
    new SmsNotifier(),
];
sendBulkNotification(notifiers, "user@example.com", "Нова задача призначена", "Вам призначено задачу 'Розробити API' з пріоритетом high. Дедлайн: 01.02.2025");
//# sourceMappingURL=task-4.js.map