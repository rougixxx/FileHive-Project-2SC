from rest_framework import serializers
from rest_framework.serializers import FileField
from utils.response.base_response import BaseResponse
from .models import File
from filehive_auth.serializers import UserSerializer
from filehive_auth.models import User
from drf_spectacular.utils import extend_schema_serializer


class CustomValidationError(serializers.ValidationError):
    default_detail = "Title field is required."
    default_code = ""


@extend_schema_serializer(exclude_fields=["owner", "file_type", "file_size"])
class FileSerializer(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = (
            "id",
            "title",
            "file",
            "file_type",
            "owner",
            "date_created",
            "updated_date",
            "file_size",
        )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        owner_id = response.get("owner")
        owner = User.objects.get(id=owner_id)
        response["owner"] = UserSerializer(owner).data
        return response

    # def validate(self, attrs):
    #     if "title" not in attrs or not attrs["title"]:
    #         raise serializers.ValidationError({"title": "Title field is required."})
    #     return attrs

    def update(self, instance, validated_data):
        # Make sure 'title' field is present and not empty
        if "title" not in validated_data or not validated_data["title"]:
            raise CustomValidationError({"title": "Title field is required."})
        # Remove owner field from validated data
        validated_data.pop("owner", None)
        validated_data.pop("file_size", None)

        return super().update(instance, validated_data)

    def create(self, validated_data):
        # Ensure 'id' field is not provided by the user
        validated_data.pop("id", None)
        return super().create(validated_data)
