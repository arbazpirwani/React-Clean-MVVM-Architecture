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
import {GoogleBook} from "../../../domain/model/GoogleBook";
import {State} from "../../../domain/model/ResponseState";
import BookDetail from "../../component/BookDetail";
import BookDetailViewModel from "./BookDetailViewModel";
import {useParams} from 'react-router-dom';
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import {AlertTitle, LinearProgress} from "@mui/material";
import {provideGetBookByIdUseCase} from "../../di/BookModule";
import Box from "@mui/material/Box";

export default function BookDetailView() {

    const {book, getBookById} = BookDetailViewModel(provideGetBookByIdUseCase());

    const {id} = useParams<{ id: string }>();
    const [selectedBook, setSelectedBook] = useState<GoogleBook | null>(null);
    const [shouldShowProgress, setShouldShowProgress] = useState(false);
    const [shouldShowError, setShouldShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!book) {
            getBookById(id!);
        } else {
            switch (book.responseState) {
                case State.Loading:
                    setShouldShowProgress(true);
                    break;
                case State.Success:
                    setShouldShowProgress(false);
                    setShouldShowError(false);
                    setSelectedBook(book.data!);
                    break;
                case State.Fail:
                    setShouldShowProgress(false);
                    setShouldShowError(true);
                    setErrorMessage(book.error?.message || null);
                    break;
            }
        }
    }, [book, getBookById, id]);

    return (
        <Container maxWidth="md">
            {shouldShowError && (
                <Box my={2}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {errorMessage} — <strong>check it out!</strong>
                    </Alert>
                </Box>
            )}
            {shouldShowProgress && (
                <Box my={2}>
                    <LinearProgress color="primary" variant={'query'}/>
                </Box>
            )}
            <Box my={4}>
                <BookDetail book={selectedBook}/>
            </Box>
        </Container>

    );
};