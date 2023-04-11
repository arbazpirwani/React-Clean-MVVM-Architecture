import {Response} from "../api/Response";
import {BookApiEntity, BookItemApiEntity} from "../entity/BookApiEntity";


export default interface NetworkApi {

    getBooksByQuery(query: string): Promise<Response<BookApiEntity>>;
    getBookById(id: string): Promise<Response<BookItemApiEntity>>;
}