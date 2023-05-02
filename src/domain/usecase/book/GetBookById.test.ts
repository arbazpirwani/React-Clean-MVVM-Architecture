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

import {GetBookById} from "./GetBookById";
import {State} from "../../model/ResponseState";
import {fromAPIEntityToDomainItem} from "../../../data/entity/BookApiEntity";
import {bookItemApiEntity, requestBookId} from "../../../core/fixtures/BookFixtures";

describe("GetBookById", () => {

    const mockDomainGoogleBook = fromAPIEntityToDomainItem(bookItemApiEntity)

    const mockRepository = {
        getBookById: jest.fn(),
        getGoogleBooksByQuery: jest.fn(),
    };

    let getBookById: GetBookById;


    beforeEach(() => {
        getBookById = new GetBookById(mockRepository);
    });


    it("should return a success response with book data when given a valid id", async () => {
        // Arrange
        mockRepository.getBookById.mockResolvedValueOnce({
            isSuccessful: true,
            body: bookItemApiEntity
        });

        // Act
        const response = await getBookById.invoke(requestBookId);

        // Assert
        expect(mockRepository.getBookById).toHaveBeenCalled()
        expect(mockRepository.getBookById).toHaveBeenCalledWith(requestBookId);
        expect(response.responseState).toEqual(State.Success);
        expect(response.data).toEqual(mockDomainGoogleBook);
        expect(response.error).toBeUndefined();
    });

    it("should return a fail response with error message when given an invalid id", async () => {
        // Arrange
        mockRepository.getBookById.mockResolvedValueOnce({
            isSuccessful: false,
            body: undefined,
            errorBody: "Book not found",
        });
        // Act
        const response = await getBookById.invoke(requestBookId);

        // Assert
        expect(mockRepository.getBookById).toHaveBeenCalledWith(requestBookId);
        expect(response.responseState).toEqual(State.Fail);
        expect(response.error).toEqual("Book not found");
        expect(response.data).toBeUndefined()
    });

    it("should return an error response when there is an error fetching the book", async () => {
        // Arrange
        mockRepository.getBookById.mockRejectedValueOnce("Error fetching book");

        // Act
        const response = await getBookById.invoke(requestBookId);

        // Assert
        expect(mockRepository.getBookById).toHaveBeenCalledWith(requestBookId);
        expect(response.responseState).toEqual(State.Error);
        expect(response.data).toBeUndefined()
        expect(response.error).toBeUndefined()
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

});