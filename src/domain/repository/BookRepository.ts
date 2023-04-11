import {Response} from "../../data/api/Response";
import {BookApiEntity, BookItemApiEntity} from "../../data/entity/BookApiEntity";

export interface BookRepository {


    getGoogleBooksByQuery(query: string): Promise<Response<BookApiEntity>>;

    getBookById(id: string): Promise<Response<BookItemApiEntity>>;
}