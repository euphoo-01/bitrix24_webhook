import { Request, Response } from "express";
import { CompanyService } from "../services/CompanyService";

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

	getCompaniesByFilterAndPage = async (req: Request, res: Response) => {
		try {
			const { page, limit, search } = req.query;
			if (!page || !limit) {
				res.status(400).json({
					success: false,
					error: "Невалидные query параметры",
				});
			}

			const { companies, total } =
				await this.service.getCompaniesByFilterAndPage(
					Number(page),
					Number(limit),
					String(search)
				);
			res.status(200).json({ success: true, total, companies });
		} catch (e) {
			res.status(500).json({
				success: false,
				error: e instanceof Error ? e.message : "Unknown",
			});
		}
	};
}
