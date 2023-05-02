/*
 * Copyright (c) 2023 Arbaz Pirwani
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

class SharedPreferences {

    static getString(key: string): string | null {
        return localStorage.getItem(key);
    }

    static setString(key: string, value: string): void {
        localStorage.setItem(key, value);
        window.dispatchEvent(new Event(key))
    }

    static setNumber(key: string, value: number): void {
        this.setString(key, value.toString());
    }

    static getNumber(key: string): number | null {
        const stringValue = this.getString(key);
        return stringValue ? parseFloat(stringValue) : null;
    }

    static setBoolean(key: string, value: boolean): void {
        this.setString(key, value.toString());
    }

    static getBoolean(key: string): boolean | null {
        const stringValue = this.getString(key);
        return stringValue ? stringValue === 'true' : null;
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
