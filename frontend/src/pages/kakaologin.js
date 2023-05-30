import { KAKAO_AUTH_URL } from "../oauth";
import { frontUrl } from "../config/config";

function kakaologin() {
  return (
    <div>
      <div class="w-full h-[100px]">
        <a href={KAKAO_AUTH_URL}>
          <img src="/kakao_login.png" class="center" />
        </a>
      </div>
    </div>
  );
}

export default kakaologin;
