from django.contrib.auth.models import update_last_login
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) # db에서 긁어올 것이 아니라서

    def create(self, validated_data):
        if "is_kakao" not in validated_data:
            user = User.objects.create(
                email=validated_data['email'],
                nickname=validated_data['nickname'],
                phone=validated_data['phone'],
                username=validated_data['username'],
                birth=validated_data['birth'],
            )
            user.set_password(validated_data['password'])

        else:
            user = get_user_model().objects.create(
                email=validated_data['email'],
                nickname=validated_data['nickname'],
                is_kakao=validated_data['is_kakao'],
                phone=validated_data['phone'],
                username=validated_data['username'],
                birth=validated_data['birth'],
            )
            user.set_unusable_password()

        user.save()
        return user

    class Meta:
        model = User
        fields = ["email", "password", "nickname", "phone", 'username', 'birth', 'is_kakao']

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=64)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)
    def validate(self, data):
        email = data['email']
        password = data.get('password', None)
        user = authenticate(email=email, password=password)

        if user is None:
            results = {
                'email': 'None'
            }
            return results

        try:
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            update_last_login(None, user)

        except User.DoesNotExist:
            raise serializers.ValidationError(
                '입력하신 정보가 올바르지 않습니다.'
            )

        results = {
            "email" : email,
            "refresh_token" : refresh_token,
            "access_token" : access_token
        }
        return results