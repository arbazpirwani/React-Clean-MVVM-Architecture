import React, {useState} from "react";
import {ResponseState, State} from "../../../domain/model/ResponseState";
import {GoogleBook} from "../../../domain/model/GoogleBook";
import {GetBookByIdUseCase} from "../../../domain/usecase/book/GetBookById";

export default function BookDetailViewModel(getBookByIdUseCase: GetBookByIdUseCase) {
    const [book, setBook] = useState<ResponseState<GoogleBook>>();

    function getBookById(id: string) {
        setBook({responseState: State.Loading});
        getBookByIdUseCase.invoke(id).then((responseState) => {
            setBook(responseState);
        })
    }

    return {
        book,
        getBookById
    };
}