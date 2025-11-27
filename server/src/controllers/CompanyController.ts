import { Request, Response } from "express";
import { CompanyService } from "../services/CompanyService";

// TODO: Метод для получения компаний по страницам
// TODO: Метод для получения компаний по страницам и фильтру (ключевому слову)

export class CompanyController {
	private readonly service: CompanyService;

	constructor(service: CompanyService) {
		this.service = service;
	}

	getAllCompanies = async (_: Request, res: Response) => {
		try {
			const companies = await this.service.getAllCompanies(10000);
			console.log("Получены компании: ", companies);
			res.status(200).json({ success: true, total: 10000, data: companies });
		} catch (e) {
			res.status(500).json({
				success: false,
				error: e instanceof Error ? e.message : "Unknown",
			});
		}
	};
}
