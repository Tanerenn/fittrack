from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import KiloViewSet, SuViewSet, HedefViewSet

router = DefaultRouter()
router.register(r'kilo-kayitlari', KiloViewSet)
router.register(r'su-takibi', SuViewSet)
router.register(r'hedef', HedefViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]