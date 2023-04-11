import SharedPreferences from "../../../core/utils/SharedPreferences";
import {STORAGE_KEYS} from "../../../data/constant/Constants";

export default function LoginViewModel() {

    function login(email: string, password: string) {
        console.log("In view Model " + email)
        SharedPreferences.setString(STORAGE_KEYS.TOKEN, 'local token')
    }

    return {login}
}