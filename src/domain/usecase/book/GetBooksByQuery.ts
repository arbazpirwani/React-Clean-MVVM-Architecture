import {BookRepository} from "../../repository/BookRepository";
import {fromAPIEntityToDomain} from "../../../data/entity/BookApiEntity";
import {ResponseState, State} from "../../model/ResponseState";
import {GoogleBook} from "../../model/GoogleBook";

export interface GetBooksByQueryUseCase {
    invoke: (query: string) => Promise<ResponseState<GoogleBook[]>>
}

export class GetBooksByQuery implements GetBooksByQueryUseCase {
    private googleBookRepository: BookRepository

    constructor(repo: BookRepository) {
        this.googleBookRepository = repo;
    }

    async invoke(query: string): Promise<ResponseState<GoogleBook[]>> {
        try {
            let response = await this.googleBookRepository.getGoogleBooksByQuery(query)
            if (response.isSuccessful) {
                return {
                    responseState: State.Success,
                    data: fromAPIEntityToDomain(response.body!)
                }
            } else {
                return {responseState: State.Fail, error: response.errorBody!}
            }
        } catch (error) {
            console.log(error)
            return {responseState: State.Error}

        }


    }
}