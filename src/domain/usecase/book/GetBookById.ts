import {BookRepository} from "../../repository/BookRepository";
import {fromAPIEntityToDomainItem} from "../../../data/entity/BookApiEntity";
import {ResponseState, State} from "../../model/ResponseState";
import {GoogleBook} from "../../model/GoogleBook";

export interface GetBookByIdUseCase {
    invoke: (id: string) => Promise<ResponseState<GoogleBook>>
}

export class GetBookById implements GetBookByIdUseCase {
    private googleBookRepository: BookRepository

    constructor(repo: BookRepository) {
        this.googleBookRepository = repo;
    }

    async invoke(id: string): Promise<ResponseState<GoogleBook>> {
        try {
            let response = await this.googleBookRepository.getBookById(id)
            if (response.isSuccessful) {
                return {
                    responseState: State.Success,
                    data: fromAPIEntityToDomainItem(response.body!)
                }
            } else {
                return {responseState: State.Fail, error: response.errorBody!}
            }
        } catch (error) {
            return {responseState: State.Error}

        }


    }
}