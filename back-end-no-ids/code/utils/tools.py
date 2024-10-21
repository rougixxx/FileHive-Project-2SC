from jwt import *
from django.conf import settings
import magic



def convert_file_size(size_bytes):
    if size_bytes < 1024:
        return f"{size_bytes}"
    file_size_kb = size_bytes / 1024.0
    if file_size_kb >= 1024:
        file_size_mb = file_size_kb / 1024.0
        if file_size_mb >= 1024:
            file_size_gb = file_size_mb / 1024.0
            return f"{file_size_gb:.2f} Gb"
        else:
            return f"{file_size_mb:.2f} Mb"
    else:
        return f"{file_size_kb:.2f} Kb"



def extract_owner_id_from_token(auth_header):
    try:
        token = auth_header.split()[1]
        payload = decode(
            token,
            settings.SIMPLE_JWT["SIGNING_KEY"],
            algorithms=[settings.SIMPLE_JWT["ALGORITHM"]],
        )
        return payload.get("user_id", None)
    except Exception as e:
        return None

def validate_file_type(file, ext):
    allowed_types = ["rar", "zip", "png", "jpg", "jpeg", "svg", "pdf", "pe32", "pe32+"]
    file_magic = magic.Magic()
    file_info = file_magic.from_buffer(file.read())
    file_type = file_info.split()[0].lower()
    #pe32+ is for 64bit exe  
    if file_type not in allowed_types:
                return False
  
    if ext in allowed_types:
            if ext == "jpg":
                if file_type == "jpeg":
                    return True
                else:
                    return False
            if ext == "exe":
                if file_type == "pe32" or file_type == "pe32+":
                    return True
                else: 
                    return False
            if file_type == ext:
                return True
    #  in case there is no extetion with the file
    else:
            if file_type == "pe32" or file_type == "pe32+":
                return "exe"
            if file_type == "jpeg":
                return "jpg"
            else: 
                return file_type
   


def check_user_counts(user):
    user.warnings_count += 1
    if user.warnings_count == 3: 
        user.is_active = False
        user.warnings_count = 0
        user.save()
        # return "Your account has been banned due to multiple warnings."
        return "banned"
    else:
        user.save()
        return f"You have {3-user.warnings_count} warnings left before your account is banned."
