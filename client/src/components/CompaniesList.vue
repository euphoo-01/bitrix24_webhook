<script setup lang="ts">
import { type Company } from "../api/client";

defineProps<{
    companies: Company[];
    loading: boolean;
    error: string | null;
}>();

const getFirstValue = (field: { VALUE: string }[] | undefined): string => {
    const firstItem = field?.[0];

    if (firstItem && firstItem.VALUE) {
        return firstItem.VALUE;
    }
    return "Не указан";
};
</script>

<template>
    <div class="list-wrapper">
        <div v-if="loading" class="state-info">Загрузка...</div>
        <div v-else-if="error" class="state-info error">
            Ошибка: {{ error }}
        </div>

        <ul v-else-if="companies.length > 0" class="list">
            <li
                v-for="company in companies"
                :key="company.ID"
                class="company-card"
            >
                <h3>{{ company.ID }}. {{ company.TITLE }}</h3>
                <p>
                    <strong>Email:</strong> {{ getFirstValue(company.EMAIL) }}
                </p>
                <p>
                    <strong>Телефон:</strong> {{ getFirstValue(company.PHONE) }}
                </p>
                <p>
                    <strong>Ответственный ID:</strong>
                    {{ company.ASSIGNED_BY_ID }}
                </p>
            </li>
        </ul>

        <div v-else class="state-info">Компании не найдены.</div>
    </div>
</template>

<style scoped>
.list-wrapper {
    position: relative;
    min-height: 200px;
}

.state-info {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
    color: #666;
}

.error {
    color: #d9534f;
}

.list {
    list-style: none;
    padding: 0;
}

.company-card {
    background: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    transition: box-shadow 0.2s ease-in-out;
}

.company-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.company-card h3 {
    margin-top: 0;
    color: #333;
}

.company-card p {
    color: #555;
    line-height: 1.6;
}
</style>
