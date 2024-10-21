from rest_framework.response import Response


class BaseResponse(Response):
    def __init__(
        self, data=None, status_code=None, message=None, error=False, **kwargs
    ):

        data = {
            "status_code": status_code,
            "data": data,
            "message": message,
            "error": error,
        }
        super().__init__(data, **kwargs, status=status_code)
