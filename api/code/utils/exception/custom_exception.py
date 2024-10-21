from utils.response.base_response import BaseResponse

from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    if isinstance(exc, Exception):
        data = getattr(exc, "default_code", None)
        status_code = getattr(exc, "status_code", None)
        message = getattr(exc, "default_detail", None)

        if data is not None and status_code is not None and message is not None:
            return BaseResponse(
                data=data,
                status_code=status_code,
                error=True,
                message=message,
            )
    return exception_handler(exc, context)
