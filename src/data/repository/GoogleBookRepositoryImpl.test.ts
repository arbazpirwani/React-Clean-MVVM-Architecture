import {GoogleBookRepositoryImpl} from './GoogleBookRepositoryImpl';
import {BookApiEntity} from '../entity/BookApiEntity';
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