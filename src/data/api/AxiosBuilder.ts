import axios, {AxiosRequestConfig} from "axios";
import {ApiService} from "./ApiService";

interface ApiConfig {
    baseURL: string;
    timeout?: number;
    headers?: any;
    responseType?: 'json' | 'arraybuffer' | 'blob' | 'document' | 'text' | 'stream';
}
export class AxiosBuilder {
    private readonly config: AxiosRequestConfig;
    constructor(config?: ApiConfig) {
        this.config = {
            baseURL: config?.baseURL ?? '',
            timeout: config?.timeout ?? 10000,
            headers: config?.headers ?? {},
            responseType: config?.responseType ?? 'json',
        };
    }

    baseUrl(url: string): AxiosBuilder {
        this.config.baseURL = url;
        return this;
    }

    timeout(timeout: number): AxiosBuilder {
        this.config.timeout = timeout;
        return this;
    }

    headers(headers: any): AxiosBuilder {
        this.config.headers = headers;
        return this;
    }

    responseType(responseType: 'json' | 'arraybuffer' | 'blob' | 'document' | 'text' | 'stream'): AxiosBuilder {
        this.config.responseType = responseType;
        return this;
    }
    build(): ApiService {
        return new ApiService(axios.create(this.config))
    }
}