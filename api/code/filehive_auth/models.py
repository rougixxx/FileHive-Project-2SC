from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from .utils import user_directory_path


# overrding the user creation with super user
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_verified = False

        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_verified", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        if extra_fields.get("is_verified") is not True:
            raise ValueError("Superuser must have is_verified=True.")

        return self.create_user(email, password, **extra_fields)


# creating a custom User Model:


class User(AbstractUser):
    # username = models.CharField(max_length=50, help_text='Required. 50 characters or fewer. Letters, digits, and spaces only.', validators=[],)
    username = None

    email = models.EmailField(
        unique=True,
        blank=False,
        error_messages={"unique": "A user with that email already exists."},
    )
    is_verified = models.BooleanField(
        default=False
    )  # to mark if the user has verified their email

    #    is_active,first_name,last_name is provided by the AbstractUser class

    profilePicture = models.ImageField(
        upload_to=user_directory_path, blank=True
    )  # don't forget to set the mdeia location
    # adding Warning col
    warnings_count = models.IntegerField(default=0)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    class Meta:
        db_table = "Users"
        verbose_name = "User"
        verbose_name_plural = "users"

    def __str__(self):
        if self.is_superuser:
            return f"User_admin"
        else:

            return f"User_{self.id}_{self.get_full_name()}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
