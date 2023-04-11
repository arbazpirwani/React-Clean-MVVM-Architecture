import React, {useEffect, useState} from "react";
import BookHomeViewModel from "./BookHomeViewModel";
import {State} from "../../../domain/model/ResponseState";
import {AlertTitle, Divider, LinearProgress,} from "@mui/material";
import Alert from "@mui/material/Alert";
import {GoogleBook} from "../../../domain/model/GoogleBook";
import BookList from "../../component/adpater/BookList";
import Container from "@mui/material/Container";
import SearchInput from "../../component/SearchInput";
import Button from "@mui/material/Button";
import SharedPreferences from "../../../core/utils/SharedPreferences";

export default function BookHomeView() {

    const {books, getGoogleBooksByQuery} = BookHomeViewModel();
    const [query] = useState('Typescript React')


    let bookList: GoogleBook[] | null = null
    let shouldShowProgress
    let errorMessage

    useEffect(() => {
        getGoogleBooksByQuery(query)
    }, []);

    function observeBooks() {
        switch (books?.responseState) {
            case State.Loading:
                shouldShowProgress = true
                return;
            case State.Success:
                bookList = books.data!
                return
            case State.Fail:
                errorMessage = books?.error?.message
                return;
        }
    }

    function onSearchItemChange(event: React.ChangeEvent<HTMLInputElement>) {
        getGoogleBooksByQuery(event.target.value)
    }

    observeBooks()

    function logout() {
        SharedPreferences.clear()
    }

    return (
        <Container>
            {errorMessage && <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errorMessage} — <strong>check it out!</strong>
            </Alert>}
            {shouldShowProgress && <LinearProgress color="primary" variant={'query'}/>}
            <SearchInput defaultValue={query} onChange={onSearchItemChange}/>
            <Divider variant="fullWidth" sx={{border: '1px solid light-grey', margin: 2}}/>
            <BookList books={bookList}/>
            <Button variant="text" color="error" onClick={logout}>Logout</Button>
        </Container>

    );
}
