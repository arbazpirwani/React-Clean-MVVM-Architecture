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

import axios, {AxiosInstance} from "axios";
import {Response} from "./Response";

interface ApiEndpoint {
    url: string;
    method: "get" | "post" | "put" | "delete";
}

export class ApiService {
    private readonly axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance
    }

    public async request<T>(endpoint: ApiEndpoint, requestData?: any): Promise<Response<T>> {
        const {url, method} = endpoint;
        try {
            const response = await this.axiosInstance.request<T>({
                url,
                method,
                data: requestData,
            });
            return {isSuccessful: true, body: response.data};
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    return {
                        isSuccessful: false, errorBody: {
                            statusCode: error.response.status,
                            message:error.message
                        }
                    }
                } else if (error.request) {
                    return {
                        isSuccessful: false,
                        errorBody: {
                            statusCode: error.request.status,
                            message: error.message
                        }
                    };
                } else {
                    return {isSuccessful: false, errorBody: {statusCode: 0, message: error.message}};
                }
            } else {
                return {isSuccessful: false, errorBody: {statusCode: 300, message: "Unexpected"}};
            }

        }
    }

    public async get<T>(url: string): Promise<Response<T>> {
        return this.request<T>({url, method: "get"});
    }

    public async post<T>(url: string, data: any): Promise<Response<T>> {
        return this.request<T>({url, method: "post"}, data);
    }

    public async put<T>(url: string, data: any): Promise<Response<T>> {
        return this.request<T>({url, method: "put"}, data);
    }

    public async delete<T>(url: string): Promise<Response<T>> {
        return this.request<T>({url, method: "delete"});
    }
}

