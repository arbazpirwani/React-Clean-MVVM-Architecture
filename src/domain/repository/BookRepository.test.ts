import {BookRepository} from './BookRepository';

describe('BookRepository', () => {
    let bookRepository: BookRepository;

    beforeEach(() => {
        bookRepository = {
            getGoogleBooksByQuery: jest.fn(),
            getBookById: jest.fn(),
        };
    });

    it("should call getGoogleBooksByQuery with correct arguments", async () => {
        // Arrange
        const query = "Harry Potter";

        // Act
        await bookRepository.getGoogleBooksByQuery(query);

        // Assert
        expect(bookRepository.getGoogleBooksByQuery).toHaveBeenCalledWith(query);
    });

    it("should call getBookById with correct arguments", async () => {
        // Arrange
        const bookId = "12345";

        // Act
        await bookRepository.getBookById(bookId);

        // Assert
        expect(bookRepository.getBookById).toHaveBeenCalledWith(bookId);
    });


});