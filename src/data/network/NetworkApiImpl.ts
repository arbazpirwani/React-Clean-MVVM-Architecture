import NetworkApi from "./NetworkApi";
import {Response} from "../api/Response";
import {ApiService} from "../api/ApiService";
import {API_ENDPOINTS} from "../constant/ApiConstants";
import {BookApiEntity, BookItemApiEntity} from "../entity/BookApiEntity";

export default class NetworkApiImpl implements NetworkApi {

    api: ApiService

    constructor(api: ApiService) {
        this.api = api
    }

    getBooksByQuery(query: string): Promise<Response<BookApiEntity>> {
        return this.api.get<BookApiEntity>(`${API_ENDPOINTS.VOLUME}/?q=${query}`)
    }

    getBookById(id: string): Promise<Response<BookItemApiEntity>> {
        return this.api.get<BookItemApiEntity>(`${API_ENDPOINTS.VOLUME}/${id}`)
    }


}