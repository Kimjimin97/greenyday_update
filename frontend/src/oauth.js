import { frontUrl } from "./config/config";

const CLIENT_ID = "3ec9ad497bc0ec9335ae6a557b415c0a";
const REDIRECT_URI = frontUrl + "/oauth/callback/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

// https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Fwww.baenaon.com%252Foauth%252Fcallback%252Fkakao%26through_account%3Dtrue%26client_id%3D3ec9ad497bc0ec9335ae6a557b415c0a
