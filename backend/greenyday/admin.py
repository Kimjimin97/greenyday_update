from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Item, Item_Img, Category, Event_Img, Nutrition, Ingredient


class ImageInline(admin.TabularInline):
    model = Item_Img
    fk_name = 'item_id'
    can_delete = False
    extra = 1

class NutritionInline(admin.TabularInline):
    model = Nutrition
    fk_name = 'item_id'
    can_delete = False
    extra = 1

class IngredientInline(admin.TabularInline):
    model = Ingredient
    fk_name = 'item_id'
    can_delete = False
    extra = 1
@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    inlines = (NutritionInline, IngredientInline, ImageInline)

    list_display = ['id', 'name', 'category_id', 'item_img']
    list_display_links = ['name']

    def item_img(self, obj):
        img = obj.itemimges.first()
        return mark_safe(f"<img src={img.photo.url} style='width: 100px;' />")

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_displat = '__all__'
    list_displat_links = ['name']



@admin.register(Event_Img)
class EventAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'event_img']
    list_display_links = ['name']

    def event_img(self, img):
        return mark_safe(f"<img src={img.photo.url} style='width: 100px;' />")

