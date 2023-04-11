import {State} from "../../model/ResponseState";
import {fromAPIEntityToDomain,} from "../../../data/entity/BookApiEntity";
import {bookApiEntity, requestQuery} from "../../../core/fixtures/BookFixtures";
import {GetBooksByQuery, GetBooksByQueryUseCase} from "./GetBooksByQuery";

describe("GetBooksByQuery", () => {

    const mockDomainGoogleBooks = fromAPIEntityToDomain(bookApiEntity)
    const mockRepository = {
        getBookById: jest.fn(),
        getGoogleBooksByQuery: jest.fn(),
    };

    let getBooksByQueryUseCase: GetBooksByQueryUseCase;

    beforeEach(() => {
        getBooksByQueryUseCase = new GetBooksByQuery(mockRepository);
    });

    it("should return a success response with book data when given a valid query", async () => {
        // Arrange
        mockRepository.getGoogleBooksByQuery.mockResolvedValueOnce({
            isSuccessful: true,
            body: bookApiEntity
        });

        // Act
        const response = await getBooksByQueryUseCase.invoke(requestQuery);

        // Assert
        expect(mockRepository.getGoogleBooksByQuery).toHaveBeenCalled()
        expect(mockRepository.getGoogleBooksByQuery).toHaveBeenCalledWith(requestQuery);
        expect(response.responseState).toEqual(State.Success);
        expect(response.data).toEqual(mockDomainGoogleBooks);
        expect(response.error).toBeUndefined();
    });

    it("should return a fail response with error message when given an invalid query", async () => {
        // Arrange
        mockRepository.getGoogleBooksByQuery.mockResolvedValueOnce({
            isSuccessful: false,
            body: undefined,
            errorBody: "Book not found",
        });
        // Act
        const response = await getBooksByQueryUseCase.invoke(requestQuery);

        // Assert
        expect(mockRepository.getGoogleBooksByQuery).toHaveBeenCalledWith(requestQuery);
        expect(response.responseState).toEqual(State.Fail);
        expect(response.error).toEqual("Book not found");
        expect(response.data).toBeUndefined()
    });

    it("should return an error response when there is an error fetching the book", async () => {
        // Arrange
        mockRepository.getGoogleBooksByQuery.mockRejectedValueOnce("Error fetching book");

        // Act
        const response = await getBooksByQueryUseCase.invoke(requestQuery);

        // Assert
        expect(mockRepository.getGoogleBooksByQuery).toHaveBeenCalledWith(requestQuery);
        expect(response.responseState).toEqual(State.Error);
        expect(response.data).toBeUndefined()
        expect(response.error).toBeUndefined()
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

});