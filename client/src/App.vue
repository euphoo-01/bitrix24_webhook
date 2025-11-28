<script setup lang="ts">
import { ref, watch } from "vue";
import CompaniesList from "./components/CompaniesList.vue";
import { useSearch } from "./composables/useSearch";
import { usePagination } from "./composables/usePagination";
import { useCompanies } from "./composables/useCompanies";

const { immediateSearchTerm, debouncedSearchTerm } = useSearch(500);

const totalCompanies = ref(0);
const { page, limit, totalPages, nextPage, prevPage } = usePagination(
    totalCompanies,
    10
);

const {
    companies,
    total: fetchedTotal,
    loading,
    error,
} = useCompanies(page, limit, debouncedSearchTerm);

watch(fetchedTotal, (newTotal) => {
    totalCompanies.value = newTotal;
});
</script>

<template>
    <main class="container">
        <h1>Список компаний</h1>

        <div class="controls">
            <input
                type="text"
                v-model="immediateSearchTerm"
                placeholder="Поиск по названию..."
            />
        </div>

        <div class="pagination" v-if="!loading && !error && totalCompanies > 0">
            <button @click="prevPage" :disabled="page <= 1">Назад</button>
            <span>Страница {{ page }} из {{ totalPages }}</span>
            <button @click="nextPage" :disabled="page >= totalPages">
                Вперед
            </button>
        </div>

        <CompaniesList
            :companies="companies"
            :loading="loading"
            :error="error"
        />

        <div
            class="pagination"
            v-if="!loading && !error && totalCompanies > limit"
        >
            <button @click="prevPage" :disabled="page <= 1">Назад</button>
            <span>Страница {{ page }} из {{ totalPages }}</span>
            <button @click="nextPage" :disabled="page >= totalPages">
                Вперед
            </button>
        </div>
    </main>
</template>

<style scoped>
.container {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
}

.controls {
    margin-bottom: 1rem;
}

.controls input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
}

.pagination button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    margin: 0 0.5rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.pagination button:not(:disabled):hover {
    background-color: #0056b3;
}

.pagination span {
    margin: 0 1rem;
    font-weight: bold;
    color: #555;
}
</style>
