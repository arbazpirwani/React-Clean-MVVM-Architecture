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

import {BookRepository} from "domain/repository/BookRepository";
import {fromAPIEntityToDomain} from "data/entity/BookApiEntity";
import {ResponseState, State} from "domain/model/ResponseState";
import {GoogleBook} from "domain/model/GoogleBook";

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
            }
            return {responseState: State.Fail, error: response.errorBody!}

        } catch (error) {
            console.log(error)
            return {responseState: State.Error}

        }


    }
}