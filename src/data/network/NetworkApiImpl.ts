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

import NetworkApi from "./NetworkApi";
import {Response} from "../api/Response";
import {ApiService} from "../api/ApiService";
import {API_ENDPOINTS} from "../constant/ApiConstants";
import {BookApiEntity, BookItemApiEntity} from "../entity/interfaces/BookApiEntityInterfaces";

export default class NetworkApiImpl implements NetworkApi {

    apiService: ApiService

    constructor(apiService: ApiService) {
        this.apiService = apiService
    }

    getBooksByQuery(query: string): Promise<Response<BookApiEntity>> {
        return this.apiService.get<BookApiEntity>(`${API_ENDPOINTS.VOLUME}/?q=${query}`)
    }

    getBookById(id: string): Promise<Response<BookItemApiEntity>> {
        return this.apiService.get<BookItemApiEntity>(`${API_ENDPOINTS.VOLUME}/${id}`)
    }


}