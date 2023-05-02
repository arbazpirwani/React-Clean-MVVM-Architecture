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

import {
    availableImageLink,
    fromAPIEntityToDomain,
    fromAPIEntityToDomainItem
} from './BookApiEntity';
import {
    BookApiEntity,
    BookItemApiEntity
} from './interfaces/BookApiEntityInterfaces'
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