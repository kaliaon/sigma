from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Quest, UserQuest, Roadmap, RoadmapNode
from .serializers import QuestSerializer, UserQuestSerializer, RoadmapSerializer
from .gemini_service import generate_roadmap, generate_domain_roadmap

class RoadmapViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = RoadmapSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Roadmap.objects.filter(user=self.request.user, is_active=True)

    @action(detail=False, methods=['post'], url_path='generate')
    def generate(self, request):
        domain = request.data.get('domain')
        if not domain:
            return Response({'error': 'Domain is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check existing
        existing = Roadmap.objects.filter(user=request.user, domain=domain, is_active=True).first()
        if existing:
            return Response(RoadmapSerializer(existing).data)

        # Generate new
        steps = generate_domain_roadmap(request.user.profile, domain)
        if not steps:
            return Response({'error': 'Failed to generate roadmap'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        roadmap = Roadmap.objects.create(user=request.user, domain=domain)
        for step in steps:
            RoadmapNode.objects.create(
                roadmap=roadmap,
                title=step['title'],
                description=step['description'],
                order=step['order'],
                xp_reward=step.get('xp_reward', 50),
                coin_reward=step.get('coin_reward', 10),
                status='AVAILABLE' if step['order'] == 1 else 'LOCKED'
            )
        
        return Response(RoadmapSerializer(roadmap).data)

    @action(detail=False, methods=['post'], url_path='start-node')
    def start_node(self, request):
        node_id = request.data.get('node_id')
        if not node_id:
            return Response({'error': 'Node ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            node = RoadmapNode.objects.get(id=node_id, roadmap__user=request.user)
        except RoadmapNode.DoesNotExist:
            return Response({'error': 'Node not found'}, status=status.HTTP_404_NOT_FOUND)

        if node.status == 'LOCKED':
            return Response({'error': 'Node is locked'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Mark other active nodes in this roadmap as completed or just pause them?
        # For now, let's just mark this one as IN_PROGRESS
        # Ideally, we should check if another node is IN_PROGRESS and pause it or error out.
        # Let's simple switch status
        node.status = 'IN_PROGRESS'
        node.save()
        
        return Response(RoadmapNodeSerializer(node).data)

    @action(detail=False, methods=['post'], url_path='complete-node')
    def complete_node(self, request):
        node_id = request.data.get('node_id')
        if not node_id:
            return Response({'error': 'Node ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            node = RoadmapNode.objects.get(id=node_id, roadmap__user=request.user)
        except RoadmapNode.DoesNotExist:
            return Response({'error': 'Node not found'}, status=status.HTTP_404_NOT_FOUND)

        if node.status != 'IN_PROGRESS':
            # Allow completing if it's already completed? Maybe idempotent?
            if node.status == 'COMPLETED':
                return Response(RoadmapNodeSerializer(node).data)
            return Response({'error': 'Node is not in progress'}, status=status.HTTP_400_BAD_REQUEST)

        # Complete Node
        node.status = 'COMPLETED'
        node.save()

        # Award Rewards
        profile = request.user.profile
        profile.xp += node.xp_reward
        # profile.coins += node.coin_reward # Assuming coins exist? No, Profile model only has xp. 
        # Wait, serializer has coin_reward. Let's check Profile again. 
        # Step 412: Profile has `xp`, but NOT `coins`. `level` exists.
        # So ignore coins for now or add them? 
        # Plan didn't specify adding coins to profile. I'll stick to XP.
        profile.save()
        
        # Unlock next node
        next_node = RoadmapNode.objects.filter(
            roadmap=node.roadmap, 
            order=node.order + 1
        ).first()
        
        if next_node:
            next_node.status = 'AVAILABLE'
            next_node.save()
            
        return Response(RoadmapNodeSerializer(node).data)

class QuestViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Quest.objects.all()
    serializer_class = QuestSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def start(self, request, pk=None):
        quest = self.get_object()
        user_quest, created = UserQuest.objects.get_or_create(
            user=request.user,
            quest=quest,
            defaults={'status': 'ACTIVE'}
        )
        if not created and user_quest.status == 'COMPLETED':
            return Response({'detail': 'Quest already completed'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserQuestSerializer(user_quest)
        return Response(serializer.data)

class UserQuestViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserQuestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserQuest.objects.filter(user=self.request.user)
