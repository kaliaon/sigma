from rest_framework import serializers
from .models import Quest, UserQuest, Roadmap, RoadmapNode

class QuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = '__all__'

class UserQuestSerializer(serializers.ModelSerializer):
    quest = QuestSerializer(read_only=True)
    
    class Meta:
        model = UserQuest
        fields = '__all__'

class RoadmapNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadmapNode
        fields = '__all__'

class RoadmapSerializer(serializers.ModelSerializer):
    nodes = RoadmapNodeSerializer(many=True, read_only=True)
    
    class Meta:
        model = Roadmap
        fields = '__all__'
