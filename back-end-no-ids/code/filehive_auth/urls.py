from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    VerifyAccountView,
    VerifyEmail,
    SendResetEmail,
    ResetPasswordView,
    ResetEmail,
    VerifyReset,
    GetUserView,
    UpdatePasswordView,
    UpdateUserInfoView,
    VerifyTokenView,
)
from .views import UpdatePasswordView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("auth/register", RegisterView.as_view()),
    path("auth/login", LoginView.as_view()),
    path(
        "auth/verify/<str:uidb64>/<str:token>",
        VerifyAccountView.as_view(),
        name="verify",
    ),
    path(
        "email-verified/<str:uidb64>/<str:token>",
        VerifyEmail.as_view(),
        name="email-verified",
    ),
    path("auth/receive-reset", SendResetEmail.as_view()),
    path(
        "auth/verify-reset/<str:uidb64>/<str:token>",
        VerifyReset.as_view(),
        name="verify-reset",
    ),
    path(
        "reset-password/<str:uidb64>/<str:token>",
        ResetEmail.as_view(),
        name="reset-password",
    ),
    path("auth/reset", ResetPasswordView.as_view(), name="reset"),
    path("update-password", UpdatePasswordView.as_view(), name="update-password"),
    path("auth/my", GetUserView.as_view(), name="my"),
    path("update-user", UpdateUserInfoView.as_view(), name="update-user"),
    path("verify-token", VerifyTokenView.as_view(), name="verify-token"),
]
