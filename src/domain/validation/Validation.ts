export class Validation {
    static validateEmail(email: string): boolean | string {
        if (!email) {
            return "Email is required";
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return "Invalid email address";
        }
        return true;
    }

}