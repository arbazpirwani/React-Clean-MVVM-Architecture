import {ErrorResponse} from "./ErrorResponse";

export interface Response<T> {
    isSuccessful: boolean;
    body?: T;
    errorBody?: ErrorResponse;
}