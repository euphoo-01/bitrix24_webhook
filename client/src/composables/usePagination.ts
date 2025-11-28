import { ref, computed, watch, type Ref } from "vue";

export function usePagination(
    totalItems: Ref<number>,
    initialLimit: number = 100
) {
    const page = ref(1);
    const limit = ref(initialLimit);

    const totalPages = computed(() => {
        if (totalItems.value === 0) return 1;
        return Math.ceil(totalItems.value / limit.value);
    });

    // tсли из-за изменения фильтров или лимита текущая страница оказывается за пределами возможного, сбрасываем ее на последнюю доступную.
    watch([totalItems, limit], () => {
        if (page.value > totalPages.value) {
            page.value = totalPages.value || 1;
        }
    });

    const nextPage = () => {
        if (page.value < totalPages.value) {
            page.value++;
        }
    };

    const prevPage = () => {
        if (page.value > 1) {
            page.value--;
        }
    };

    const lastPage = () => {
        page.value = totalPages.value;
    };

    const firstPage = () => {
        page.value = 1;
    };

    return {
        page,
        limit,
        totalPages,
        nextPage,
        prevPage,
        lastPage,
        firstPage,
    };
}
