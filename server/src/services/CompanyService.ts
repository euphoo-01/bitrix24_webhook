import type { BitrixClient } from "../entities/BitrixClient";
import type { Company } from "../entities/Bitrix";
import { response } from "express";

export class CompanyService {
	private readonly client: BitrixClient;

	constructor(client: BitrixClient) {
		this.client = client;
	}

	async getAllCompanies(limit = 10000): Promise<Company[]> {
		const companies: Company[] = [];
		let start = 0;
		const pageSize = 50;

		while (companies.length < limit) {
			const res = await this.client.call("crm.company.list", {
				select: ["ID", "TITLE", "PHONE", "EMAIL", "ASSIGNED_BY_ID"],
				start,
			});
			companies.push(...res.result);

			if (!res.next || companies.length >= limit) break;
			start = res.next;
		}

		return companies;
	}
}
