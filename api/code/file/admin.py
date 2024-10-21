from django.contrib import admin
from .models import File

# Register your models here.


class FileAdmin(admin.ModelAdmin):
    list_display = ('title', 'file', 'owner', 'download_url', 'date_created', 'updated_date', "file_type")
    list_editable = [ 'title, file', 'owner', 'file_type']
    list_display_links = ('title',)


admin.site.register(File)
