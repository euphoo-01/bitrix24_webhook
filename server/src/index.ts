import express from "express";
import { configDotenv } from "dotenv";
import { CompanyController } from "./controllers/CompanyController";
import { CompanyService } from "./services/CompanyService";
import { BitrixClient } from "./entities/BitrixClient";

const app = express();
const port = 3000;

configDotenv();

const webhookURL = process.env.BITRIX_WEBHOOK;

if (!webhookURL) {
	console.error("Переменная BITRIX_WEBHOOK не установлена!");
	process.exit(1);
}

const client = new BitrixClient(webhookURL);
const service = new CompanyService(client);
const controller = new CompanyController(service);

app.get("/api/getAllCompanies", controller.getAllCompanies);

app.listen(port, () => {
	console.log(`Сервер успешно запущен на порту: ${port}`);
});
