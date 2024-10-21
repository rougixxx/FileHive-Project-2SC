from django.contrib import admin
from .models import User



class UserAdmin(admin.ModelAdmin):
  
    list_editable = ['is_verified', 'is_active', 'is_superuser', 'warnings_count']
    list_display = ['email','first_name', 'last_name', 'is_verified', 'is_active' , 'is_superuser', 'warnings_count']



admin.site.register(User, UserAdmin)
