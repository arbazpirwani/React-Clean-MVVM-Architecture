import {BookRepository} from "../../domain/repository/BookRepository";
import NetworkApi from "../network/NetworkApi";
import {Response} from "../api/Response";
import {BookApiEntity, BookItemApiEntity} from "../entity/BookApiEntity";

export class GoogleBookRepositoryImpl implements BookRepository {
    apiService: NetworkApi;

    constructor(datasource: NetworkApi) {
        this.apiService = datasource;
    }

    getGoogleBooksByQuery(query: string): Promise<Response<BookApiEntity>> {
        return this.apiService.getBooksByQuery(query);
    }

    getBookById(id: string): Promise<Response<BookItemApiEntity>> {
        return this.apiService.getBookById(id);
    }
}