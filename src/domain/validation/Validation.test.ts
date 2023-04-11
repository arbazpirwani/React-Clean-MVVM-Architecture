import {Validation} from "./Validation";

describe('Validation', () => {
    describe('validateEmail', () => {
        it('should return an error message if email is empty', () => {
            const email = '';
            const result = Validation.validateEmail(email);
            expect(result).toEqual('Email is required');
        });

        it('should return an error message if email is invalid', () => {
            const email = 'invalid_email';
            const result = Validation.validateEmail(email);
            expect(result).toEqual('Invalid email address');
        });

        it('should return true if email is valid', () => {
            const email = 'valid_email@example.com';
            const result = Validation.validateEmail(email);
            expect(result).toEqual(true);
        });
    });
});