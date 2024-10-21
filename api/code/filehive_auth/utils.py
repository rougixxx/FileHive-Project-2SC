from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six

def user_directory_path(instance, filename):
    return f'user_{instance.id}/{filename}'


class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self,user,timestamp):
        return (six.text_type(user.pk)+six.text_type(timestamp)+six.text_type(user.is_active))
generate_token=TokenGenerator()
