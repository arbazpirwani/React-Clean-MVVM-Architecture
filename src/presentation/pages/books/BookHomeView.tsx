/*
 * Copyright (c) 2023 Arbaz Pirwani
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

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
    const [query] = useState('Typescript React');

    const [bookList, setBookList] = useState<GoogleBook[] | null>(null);
    const [shouldShowProgress, setShouldShowProgress] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [shouldShowError, setShouldShowError] = useState(false);

    useEffect(() => {
        if (!books) {
            getGoogleBooksByQuery(query);
            return
        }

        switch (books.responseState) {
            case State.Loading:
                setShouldShowProgress(true);
                break;
            case State.Success:
                setShouldShowProgress(false);
                setShouldShowError(false);
                setBookList(books.data!);
                break;
            case State.Fail:
                setShouldShowProgress(false);
                setShouldShowError(true);
                setErrorMessage(books.error?.message || null);
                break;
        }

    }, [books, getGoogleBooksByQuery, query]);

    function onSearchItemChange(event: React.ChangeEvent<HTMLInputElement>) {
        getGoogleBooksByQuery(event.target.value)
    }

    function logout() {
        SharedPreferences.clear()
    }

    return (
        <Container>
            {shouldShowError && <Alert severity="error">
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