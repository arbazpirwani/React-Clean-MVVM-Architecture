import React, {useEffect} from "react";
import {GoogleBook} from "../../../domain/model/GoogleBook";
import {State} from "../../../domain/model/ResponseState";
import BookDetail from "../../component/BookDetail";
import BookDetailViewModel from "./BookDetailViewModel";
import {useParams} from 'react-router-dom';
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import {AlertTitle, LinearProgress} from "@mui/material";
import {provideGetBookByIdUseCase} from "../../di/BookModule";

export default function BookDetailView() {

    const {book, getBookById} = BookDetailViewModel(provideGetBookByIdUseCase());

    const {id} = useParams<{ id: string }>();
    let selectedBook: GoogleBook | null = null

    let shouldShowProgress
    let shouldShowError
    let errorMessage

    useEffect(() => {
        getBookById(id!)
    }, []);

    function observeBooks() {
        switch (book?.responseState) {
            case State.Loading:
                shouldShowProgress = true
                return;
            case State.Success:
                selectedBook = book.data!
                return
            case State.Fail:
                shouldShowError = true
                errorMessage = book?.error?.message
                return;
        }
    }


    observeBooks()

    return (
        <Container>
            {shouldShowError && <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errorMessage} — <strong>check it out!</strong>
            </Alert>}
            {shouldShowProgress && <LinearProgress color="primary" variant={'query'}/>}
            <BookDetail book={selectedBook}/>
        </Container>

    );
};