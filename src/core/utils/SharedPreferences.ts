class SharedPreferences {

    static getString(key: string): string | null {
        return localStorage.getItem(key);
    }

    static setString(key: string, value: string): void {
        localStorage.setItem(key, value);
        window.dispatchEvent(new Event(key))
    }

    private static clearByKey(key: string) {
        localStorage.removeItem(key);
        window.dispatchEvent(new Event(key))

    }
    static clear() {
        for (let localStorageKey in localStorage) {
            this.clearByKey(localStorageKey)
        }
    }
}

export default SharedPreferences;
