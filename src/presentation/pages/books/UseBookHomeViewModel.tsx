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

import React, {useState} from "react";
import {ResponseState, State} from "domain/model/ResponseState";
import {GoogleBook} from 'domain/model/GoogleBook';
import debounce from "lodash/debounce";
import {provideGetBooksByQueryUseCase} from "presentation/di/BookModule";

export default function useBookHomeViewModel() {
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