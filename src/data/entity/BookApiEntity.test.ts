import {
    availableImageLink,
    BookApiEntity,
    BookItemApiEntity,
    fromAPIEntityToDomain,
    fromAPIEntityToDomainItem
} from './BookApiEntity';
import {bookItemApiEntity} from "../../core/fixtures/BookFixtures";


describe('bookUtils', () => {
    describe('fromAPIEntityToDomain', () => {
        it('should convert API entity to domain entity', () => {
            // Arrange
            const apiEntity: BookApiEntity = {
                items: [
                    {
                        id: '1',
                        kind: '',
                        etag: '',
                        volumeInfo: {
                            id: '1',
                            title: 'Book Title',
                            subtitle: 'Book Subtitle',
                            description: 'Book Description',
                            authors: ['Author 1', 'Author 2'],
                            publisher: 'Book Publisher',
                            imageLinks: {
                                extraLarge: 'https://example.com/book.png',
                            },
                            pageCount: 100,
                        },
                    },
                ],
            };

            // Act
            const result = fromAPIEntityToDomain(apiEntity);

            // Assert
            expect(result).toEqual([
                {
                    id: '1',
                    title: 'Book Title',
                    subtitle: 'Book Subtitle',
                    description: 'Book Description',
                    authors: ['Author 1', 'Author 2'],
                    publisher: 'Book Publisher',
                    imageLink: 'https://example.com/book.png',
                    pageCount: 100,
                },
            ]);
        });
    });

    describe('fromAPIEntityToDomainItem', () => {
        it('should convert API item entity to domain entity', () => {
            // Arrange
            const apiEntity: BookItemApiEntity = {
                id: '1',
                kind: '',
                etag: '',
                volumeInfo: {
                    id: '1',
                    title: 'Book Title',
                    subtitle: 'Book Subtitle',
                    description: 'Book Description',
                    authors: ['Author 1', 'Author 2'],
                    publisher: 'Book Publisher',
                    imageLinks: {
                        extraLarge: 'https://example.com/book.png',
                    },
                    pageCount: 100,
                },
            };

            // Act
            const result = fromAPIEntityToDomainItem(apiEntity);

            // Assert
            expect(result).toEqual({
                id: '1',
                title: 'Book Title',
                subtitle: 'Book Subtitle',
                description: 'Book Description',
                authors: ['Author 1', 'Author 2'],
                publisher: 'Book Publisher',
                imageLink: 'https://example.com/book.png',
                pageCount: 100,
            });
        });
    });

    describe('availableImageLink', () => {
        it('returns the extraLarge image link when available', () => {
            bookItemApiEntity.volumeInfo.imageLinks = {
                extraLarge: 'https://example.com/imageExtraLarge.jpg',
                large: 'https://example.com/imageLarge.jpg',
                medium: 'https://example.com/imageMedium.jpg',
                small: 'https://example.com/imageSmall.jpg',
                thumbnail: 'https://example.com/imageThumbnail.jpg',
                smallThumbnail: 'https://example.com/imageSmallThumbnail.jpg',
            }

            expect(availableImageLink(bookItemApiEntity.volumeInfo)).toEqual(
                'https://example.com/imageExtraLarge.jpg'
            );
        });

        it('returns the large image link when extraLarge link is not available', () => {

            bookItemApiEntity.volumeInfo.imageLinks = {
                large: 'https://example.com/imageLarge.jpg',
                medium: 'https://example.com/imageMedium.jpg',
                small: 'https://example.com/imageSmall.jpg',
                thumbnail: 'https://example.com/imageThumbnail.jpg',
                smallThumbnail: 'https://example.com/imageSmallThumbnail.jpg',
            }


            expect(availableImageLink(bookItemApiEntity.volumeInfo)).toEqual(
                'https://example.com/imageLarge.jpg'
            );
        });

        it('returns the medium image link when large and extraLarge links are not available', () => {
            bookItemApiEntity.volumeInfo.imageLinks = {
                medium: 'https://example.com/imageMedium.jpg',
                small: 'https://example.com/imageSmall.jpg',
                thumbnail: 'https://example.com/imageThumbnail.jpg',
                smallThumbnail: 'https://example.com/imageSmallThumbnail.jpg',
            }

            expect(availableImageLink(bookItemApiEntity.volumeInfo)).toEqual(
                'https://example.com/imageMedium.jpg'
            );
        });

        it('returns the small image link when medium, large and extraLarge links are not available', () => {
            bookItemApiEntity.volumeInfo.imageLinks = {
                small: 'https://example.com/imageSmall.jpg',
                thumbnail: 'https://example.com/imageThumbnail.jpg',
                smallThumbnail: 'https://example.com/imageSmallThumbnail.jpg',
            }

            expect(availableImageLink(bookItemApiEntity.volumeInfo)).toEqual(
                'https://example.com/imageSmall.jpg'
            );
        });

        it('returns the thumbnail image link when small, medium, large and extraLarge links are not available', () => {
            bookItemApiEntity.volumeInfo.imageLinks = {

                thumbnail: 'https://example.com/imageThumbnail.jpg',
                smallThumbnail: 'https://example.com/imageSmallThumbnail.jpg',
            }

            expect(availableImageLink(bookItemApiEntity.volumeInfo)).toEqual(
                'https://example.com/imageThumbnail.jpg'
            );
        });

        it('returns the smallThumbnail image link when thumbnail, small, medium, large and extraLarge links are not available', () => {
            bookItemApiEntity.volumeInfo.imageLinks = {
                smallThumbnail: 'https://example.com/imageSmallThumbnail.jpg',
            }

            expect(availableImageLink(bookItemApiEntity.volumeInfo)).toEqual(
                'https://example.com/imageSmallThumbnail.jpg'
            );
        });

    });
});