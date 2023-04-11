import NetworkApiImpl from "../../data/network/NetworkApiImpl";
import NetworkApi from "../../data/network/NetworkApi";
import {GetBooksByQuery, GetBooksByQueryUseCase} from "../../domain/usecase/book/GetBooksByQuery";
import {GoogleBookRepositoryImpl} from "../../data/repository/GoogleBookRepositoryImpl";
import {provideGoogleBooksApiBuilder} from "./NetworkModule";
import {BookRepository} from "../../domain/repository/BookRepository";
import {GetBookById, GetBookByIdUseCase} from "../../domain/usecase/book/GetBookById";

function provideNetworkApi(): NetworkApi {
    return new NetworkApiImpl(provideGoogleBooksApiBuilder())
}

function provideGoogleBookRepository(): BookRepository {
    return new GoogleBookRepositoryImpl(provideNetworkApi())
}

export function provideGetBooksByQueryUseCase(): GetBooksByQueryUseCase {
    return new GetBooksByQuery(provideGoogleBookRepository())
}

export function provideGetBookByIdUseCase(): GetBookByIdUseCase {
    return new GetBookById(provideGoogleBookRepository())
}
