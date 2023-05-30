from django.db import models

class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class MEta:
        abstract = True
class Category(TimestampedModel):
    name = models.CharField(max_length=50, unique=True)
    def __str__(self):
        return self.name

class Item(TimestampedModel):
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, unique=True)
    calorie = models.IntegerField()
    price = models.IntegerField()
    description = models.TextField()


    def __str__(self):
        return self.name

class Item_Img(TimestampedModel):
    item_id = models.ForeignKey(Item, related_name='itemimges', on_delete=models.CASCADE)
    name = models.CharField(max_length=50, unique=True)
    photo = models.ImageField(upload_to="greenyday/menu/%Y/%m/%d")

class Event_Img(TimestampedModel):
    name = models.CharField(max_length=50, unique=True)
    photo = models.ImageField(upload_to="greenyday/menu/%Y/%m/%d")

class Nutrition(models.Model):
    item_id = models.OneToOneField(Item, related_name='nutritions', on_delete=models.CASCADE)
    protein = models.FloatField(default=0)
    carbohydrate = models.FloatField(default=0)
    fat = models.FloatField(default=0)

class Ingredient(models.Model):
    item_id = models.OneToOneField(Item, related_name='ingredients', on_delete=models.CASCADE)
    description = models.TextField()

