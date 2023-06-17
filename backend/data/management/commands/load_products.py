from dataclasses import dataclass

import requests
from django.core.files.base import ContentFile
from django.core.management import BaseCommand
from tqdm import tqdm

from greenyday.models import Category, Item, Nutrition, Item_Img, Event_Img, Ingredient

BASE_URL = "https://greenyday.co.kr/dev/api/items/"


@dataclass
class Item_data:
    pk: int
    name: str
    calorie: int
    price: int
    description: str
    nutritions: dict
    ingredients: dict
    itemimges: list
    category: dict
class Command(BaseCommand):
    help = "Load products from JSON file."

    def handle(self, *args, **options):
        item_dict_list = requests.get(BASE_URL).json()
        item_list = [Item_data(**item_dict) for item_dict in item_dict_list]
        category_name_set = {item.category['name'] for item in item_list}

        category_dict = dict()

        for category_name in category_name_set:
            category, __ = Category.objects.get_or_create(name=category_name)
            category_dict[category.name] = category

        for item in tqdm(item_list):
            category: Category = category_dict[item.category['name']]
            product, is_created = Item.objects.get_or_create(
                category_id=category,
                name=item.name,
                calorie=item.calorie,
                price=item.price,
                description=item.description,
            )

            if is_created:
                nutritions, __ = Nutrition.objects.get_or_create(item_id=product, **item.nutritions)
                ingredients, __ = Ingredient.objects.get_or_create(item_id=product, **item.ingredients)

            if product.name == item.name:
                for photo_list in item.itemimges:
                    filename = photo_list['photo'].rsplit("/", 1)[-1]
                    photo_data = requests.get(photo_list['photo']).content

                    photo, __ = Item_Img.objects.get_or_create(
                        item_id=product,
                        name=f'{product.name}_사진',
                    )

                    photo.photo.save(
                        name=filename,
                        content=ContentFile(photo_data),
                        save=True,
                    )