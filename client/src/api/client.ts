import axios from "axios";

export interface Company {
    ID: string;
    TITLE: string;
    PHONE?: { VALUE: string }[];
    EMAIL?: { VALUE: string }[];
    ASSIGNED_BY_ID: string;
}

export class ServerClient {
    private readonly serverUrl: string;
    constructor(serverURL: string) {
        this.serverUrl = serverURL.replace(/\/$/, ""); // удаляем слеш если он есть в конце
    }

    getCompanies = async (
        page: number,
        limit: number,
        search?: string
    ): Promise<{ companies: Company[]; total: number }> => {
        interface ServerResponse {
            success: boolean;
            data: Company[];
            total: number;
            error?: string;
        }

        const res = await axios.get<ServerResponse>(
            `${this.serverUrl}/api/getCompanies`,
            {
                params: { page, limit, search },
            }
        );

        if (res.status !== 200) {
            console.error(
                `Ошибка ${res.status}. Не удалось получить данные с сервера`
            );
            return Promise.reject(
                new Error(`Server responded with status ${res.status}`)
            );
        }

        const responseData = res.data;

        const companies = Array.isArray(responseData?.data)
            ? responseData.data
            : [];
        const total =
            typeof responseData?.total === "number" ? responseData.total : 0;

        return { companies, total };
    };
}
