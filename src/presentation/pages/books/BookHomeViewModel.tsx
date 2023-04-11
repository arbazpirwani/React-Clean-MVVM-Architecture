import React, {useState} from "react";
import {ResponseState, State} from "../../../domain/model/ResponseState";
import {GoogleBook} from "../../../domain/model/GoogleBook";
import debounce from "lodash/debounce";
import {provideGetBooksByQueryUseCase} from "../../di/BookModule";

export default function BookHomeViewModel() {
    const [books, setBooks] = useState<ResponseState<GoogleBook[]>>();

    const GetGoogleBooksByQueryUseCase = provideGetBooksByQueryUseCase()

    const debouncedSearch = debounce((query: string) => {
        setBooks({responseState: State.Loading});
        GetGoogleBooksByQueryUseCase.invoke(query).then((responseState) => {
            setBooks(responseState);
        })
    }, 500);

    function getGoogleBooksByQuery(query: string) {
        if (query.length > 2) {
            debouncedSearch(query)
        }
    }

    return {
        books,
        getGoogleBooksByQuery
    };
}