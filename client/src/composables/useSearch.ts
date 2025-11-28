import { ref, watch } from "vue";

export function useSearch(delay: number = 500) {
    const immediateSearchTerm = ref("");

    const debouncedSearchTerm = ref("");

    let timeoutId: number | null = null;

    watch(immediateSearchTerm, (newValue) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            debouncedSearchTerm.value = newValue;
        }, delay);
    });

    return {
        immediateSearchTerm,
        debouncedSearchTerm,
    };
}
