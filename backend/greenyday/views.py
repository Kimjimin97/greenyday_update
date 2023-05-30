from rest_framework.permissions import AllowAny
from .models import Item, Category, Item_Img, Event_Img
from django.http import JsonResponse
from rest_framework import status, generics, viewsets
from .serializers import ItemSerializer, ItemCreateSerializer, EventSerializer
from django_filters.rest_framework import DjangoFilterBackend

def test(request):
    return JsonResponse({'message' : 'hi'}, status=status.HTTP_200_OK)

class ItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category_id__name']

class ItemCreate(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemCreateSerializer
    http_method_names = ['post', 'update']
    # TODO 관리자 권한으로 변경해야함.
    permission_classes = [AllowAny]

class EventCreate(viewsets.ModelViewSet):
    queryset = Event_Img.objects.all()
    serializer_class = EventSerializer
    # TODO 관리자 권한으로 변경해야함.
    permission_classes = [AllowAny]

class MainList(generics.ListAPIView):
    permission_classes = [AllowAny]

    def get(self, request):
        event = Event_Img.objects.all()
        events = []
        for i in event:
            events.append({
                'pk' : i.pk,
                'name' : i.name,
                'image' : i.photo.url
            })
        item = Item.objects.order_by("?")[:4]
        items = []
        for i in item:
            category = Category.objects.get(pk=i.category_id)
            image = Item_Img.objects.filter(item_id=i.pk)
            images = []
            for img in image:
                images.append(img.photo.url)
            items.append({
                'pk': i.pk,
                'category': category.name,
                'name': i.name,
                'calorie': i.calorie,
                'price': i.price,
                'description': i.description,
                'image': images
            })
        return JsonResponse({'events' : events, 'items': items}, status=status.HTTP_200_OK)
