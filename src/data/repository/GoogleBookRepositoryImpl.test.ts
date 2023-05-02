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

import {GoogleBookRepositoryImpl} from './GoogleBookRepositoryImpl';
import {BookApiEntity} from '../entity/interfaces/BookApiEntityInterfaces';
import {Response} from '../api/Response';
import {bookItemApiEntity, requestBookId} from "../../core/fixtures/BookFixtures";


const testResponseSuccess = {
    isSuccessful: true,
    body: bookItemApiEntity,
};
const testResponseFail: Response<BookApiEntity> = {
    isSuccessful: false,
    errorBody: {
        statusCode: 404,
        message: 'Test error'
    },
};

describe('GoogleBookRepositoryImpl', () => {

    const mockNetworkApi = {
        getBooksByQuery: jest.fn(),
        getBookById: jest.fn(),
    };

    let repository: GoogleBookRepositoryImpl;

    beforeEach(() => {
        repository = new GoogleBookRepositoryImpl(mockNetworkApi);
    });

    describe('getGoogleBooksByQuery', () => {

        const requestBookQuery = "Kotlin Test Query"

        it('should return successful response', async () => {
            // Arrange
            mockNetworkApi.getBooksByQuery.mockResolvedValueOnce(testResponseSuccess);

            // Act
            const response = await repository.getGoogleBooksByQuery(requestBookQuery);

            // Assert
            expect(mockNetworkApi.getBooksByQuery).toHaveBeenCalledWith(requestBookQuery);
            expect(response).toEqual(testResponseSuccess);
        });

        it('should return failed response', async () => {
            // Arrange
            mockNetworkApi.getBooksByQuery.mockResolvedValueOnce(testResponseFail);

            // Act
            const response = await repository.getGoogleBooksByQuery(requestBookQuery);

            // Assert
            expect(mockNetworkApi.getBooksByQuery).toHaveBeenCalledWith(requestBookQuery);
            expect(response.isSuccessful).toBe(false);
            expect(response).toEqual(testResponseFail);
        });

    });

    describe('getBookById', () => {


        it('should return successful response', async () => {
            // Arrange
            mockNetworkApi.getBookById.mockResolvedValueOnce(testResponseSuccess);

            // Act
            const response = await repository.getBookById(requestBookId);

            // Assert
            expect(mockNetworkApi.getBookById).toHaveBeenCalledWith(requestBookId);
            expect(response).toEqual(testResponseSuccess);
        });

        it('should return failed response', async () => {
            // Arrange
            mockNetworkApi.getBookById.mockResolvedValueOnce(testResponseFail);

            // Act
            const response = await repository.getBookById(requestBookId);

            // Assert
            expect(mockNetworkApi.getBookById).toHaveBeenCalledWith(requestBookId);
            expect(response).toEqual(testResponseFail);
        });

    });

    afterEach(() => {
        jest.resetAllMocks();
    });
});