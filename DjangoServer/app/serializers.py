from rest_framework import serializers

from app.models import Player, Staff


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = (
            'id', 'full_name', 'name', 'birthday', 'height', 'nationality', 'position', 'best_foot', 'preferred_number',
            'player_img')


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = (
            'id', 'full_name', 'name', 'birthday', 'nationality', 'function', 'staff_img')
