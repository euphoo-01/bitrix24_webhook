import { ref, watchEffect, type Ref } from "vue";
import { type Company, ServerClient } from "../api/client";

const serverURL = "http://localhost:3000/";
const client = new ServerClient(serverURL);

export function useCompanies(
    page: Ref<number>,
    limit: Ref<number>,
    searchTerm: Ref<string>
) {
    const companies = ref<Company[]>([]);
    const total = ref<number>(0);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    watchEffect(async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await client.getCompanies(
                page.value,
                limit.value,
                searchTerm.value
            );
            companies.value = response.companies;
            total.value = response.total;
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            error.value = errorMessage || "Не удалось загрузить компании.";
            companies.value = [];
            total.value = 0;
        } finally {
            loading.value = false;
        }
    });

    return { companies, total, loading, error };
}
