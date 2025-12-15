from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuestViewSet, UserQuestViewSet, RoadmapViewSet

router = DefaultRouter()
router.register(r'quests', QuestViewSet)
router.register(r'my-quests', UserQuestViewSet, basename='my-quests')
router.register(r'roadmap', RoadmapViewSet, basename='roadmap')

urlpatterns = [
    path('', include(router.urls)),
]
