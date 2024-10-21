from django.db import models
from django.utils import timezone

from filehive_auth.models import User

# from user.models import User

# from bson.objectid import ObjectId        file=models.FileField(upload_to =f'files/%y/%m/%d/{_id}')


# Create your models here.
class File(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=254)
    file = models.FileField(upload_to=f"files/%y/%m/%d/")
    file_type = models.CharField(max_length=30)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    download_url = models.URLField
    date_created = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    file_size = models.CharField(max_length=30, default="1kb")
    class Meta:
        # Specify the custom collection name
        db_table = "file"

    def __str__(self):
        return self.title
