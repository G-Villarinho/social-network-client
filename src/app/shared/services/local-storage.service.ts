import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService<T> {
    setItem(key: string, value: T) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string): T | null {
        const value = localStorage.getItem(key);
        if (!value) {
            return null;
        }
        return JSON.parse(value);
    }

    updateItem(key: string, value: T) {
        if (localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }
}
