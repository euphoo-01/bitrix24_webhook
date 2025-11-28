import { customRef } from "vue";

export function useDebouncedRef<T>(value: T, delay = 500) {
    let timeout: number;
    return customRef<T>((track, trigger) => {
        return {
            get() {
                track();
                return value;
            },
            set(newValue: T) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    value = newValue;
                    trigger();
                }, delay);
            },
        };
    });
}
