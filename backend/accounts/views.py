import rest_framework_simplejwt
from django.contrib.auth import get_user_model
from django.contrib.auth.models import update_last_login
import requests
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import SignupSerializer, LoginSerializer

KAKAO_REST_API_KEY = "3ec9ad497bc0ec9335ae6a557b415c0a"
# TODO 나중에 배포할 때 바꿔야함!
KAKAO_REDIRECT_URI = "https://greenyday.co.kr/oauth/callback/kakao"


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.data)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        print(serializer.data)
        return JsonResponse({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)
    if serializer.validated_data['email'] == "None":
        return JsonResponse({"message" : "올바르지 않은 회원 정보입니다."}, status=status.HTTP_400_BAD_REQUEST)

    response = {
        'refresh_token' : serializer.validated_data['refresh_token'],
        'access_token' : serializer.validated_data['access_token']
    }
    return JsonResponse(response, status=status.HTTP_200_OK)


@api_view(['POST'])
def logout(request):
    refresh_token = request.data["refresh_token"]
    try:
        token = RefreshToken(refresh_token)
        token.blacklist()
        return JsonResponse({"message" : "Successful Logout"}, status=status.HTTP_200_OK)
    except(rest_framework_simplejwt.exceptions.TokenError):
        return JsonResponse({"message" : "refresh_token is invalid or expired"}, status=status.HTTP_401_UNAUTHORIZED)


def kakao_login(request):
    client_id = KAKAO_REST_API_KEY
    code = request.GET.get('code')
    redirect_uri = KAKAO_REDIRECT_URI
    token_request = requests.get(f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={client_id}&redirect_uri={redirect_uri}&code={code}")

    token_json = token_request.json()

    kakao_access_token = token_json.get("access_token")
    profile_request = requests.post(
        "https://kapi.kakao.com/v2/user/me",
        headers={"Authorization": f"Bearer {kakao_access_token}"},
    )
    profile_json = profile_request.json()
    kakao_account = profile_json.get("kakao_account")
    email = kakao_account.get("email", None)
    if email is None:
        return JsonResponse({'err_msg': 'failed to get email'}, status=status.HTTP_400_BAD_REQUEST)
    nickname = kakao_account.get("profile").get("nickname")
    try:
        user = get_user_model().objects.get(email=email)

        if user.is_kakao:
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            update_last_login(None, user)
            results = {
                'refresh_token': refresh_token,
                'access_token': access_token,
            }
            return JsonResponse(results, status=status.HTTP_200_OK)
    except get_user_model().DoesNotExist:
        results = {
            'email': email,
            'nickname': nickname,
        }
        return JsonResponse(results, status=status.HTTP_200_OK)
    else:
        return JsonResponse({'message':'user already exist'}, status=status.HTTP_400_BAD_REQUEST)