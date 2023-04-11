import {BookApiEntity, BookItemApiEntity} from "../../data/entity/BookApiEntity";

export const requestBookId = 'qtcIkAEACAAJ';
export const requestQuery = 'Kotlin';

export const bookItemApiEntity: BookItemApiEntity = {
    id: requestBookId,
    kind: '',
    etag: '',
    volumeInfo: {
        id: requestBookId,
        title: 'Sample Book',
        subtitle: 'Sample Book',
        description: 'This is a sample book',
        authors: ['John Doe'],
        publisher: 'Sample Publisher',
        pageCount: 4,
    },
};


export const bookApiEntity: BookApiEntity = {
    items: [bookItemApiEntity]
}

