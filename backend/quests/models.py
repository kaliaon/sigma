from django.db import models
from django.contrib.auth.models import User

class Quest(models.Model):
    QUEST_TYPES = (
        ('DAILY', 'Daily'),
        ('WEEKLY', 'Weekly'),
        ('EPIC', 'Epic'),
    )
    DOMAINS = (
        ('HEALTH', 'Health'),
        ('FINANCE', 'Finance'),
        ('LEARNING', 'Learning'),
        ('RELATIONSHIPS', 'Relationships'),
        ('MENTAL', 'Mental Growth'),
    )
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    quest_type = models.CharField(max_length=20, choices=QUEST_TYPES)
    domain = models.CharField(max_length=20, choices=DOMAINS)
    xp_reward = models.IntegerField(default=10)
    coin_reward = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class UserQuest(models.Model):
    STATUS_CHOICES = (
        ('ACTIVE', 'Active'),
        ('COMPLETED', 'Completed'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quest = models.ForeignKey(Quest, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ACTIVE')
    progress = models.IntegerField(default=0)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.quest.title}"

class Roadmap(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    domain = models.CharField(max_length=20, choices=Quest.DOMAINS)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.domain} Roadmap"

class RoadmapNode(models.Model):
    STATUS_CHOICES = (
        ('LOCKED', 'LOCKED'),
        ('AVAILABLE', 'AVAILABLE'),
        ('IN_PROGRESS', 'IN_PROGRESS'),
        ('COMPLETED', 'COMPLETED'),
    )
    roadmap = models.ForeignKey(Roadmap, related_name='nodes', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='LOCKED')
    order = models.IntegerField()
    xp_reward = models.IntegerField(default=50)
    coin_reward = models.IntegerField(default=10)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.roadmap.domain} - Step {self.order}: {self.title}"
