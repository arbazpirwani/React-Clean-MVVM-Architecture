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