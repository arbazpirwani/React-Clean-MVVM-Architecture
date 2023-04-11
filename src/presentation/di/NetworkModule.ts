import {AxiosBuilder} from "../../data/api/AxiosBuilder";
import {GOOGLE_API_BASE_URL} from "../../data/constant/Constants";


export function provideGoogleBooksApiBuilder() {

    return new AxiosBuilder()
        .baseUrl(GOOGLE_API_BASE_URL)
        .timeout(10000)
        .responseType('json')
        .build();

}