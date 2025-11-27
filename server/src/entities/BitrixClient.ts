import axios from "axios";
import type { BitrixResponse } from "./Bitrix";

export class BitrixClient {
	private readonly baseURL: string;

	constructor(webhookURL: string) {
		this.baseURL = webhookURL.replace(/\/+$/, ""); // удаляем / из конца, если он есть
	}

	async call<T = any>(
		method: string,
		parameters = {}
	): Promise<BitrixResponse<T>> {
		const { data } = await axios.post<BitrixResponse<T>>(
			`${this.baseURL}/${method}`,
			parameters
		);
		return data;
	}
}
