from django.contrib.auth import get_user_model
from rest_framework import serializers
from app.models import *;
from app.models import Player, Staff, Team, Competition, Match, ClubPlaysIn, StaffManages, CompetitionsMatches, \
    PlayerPlaysFor, NormalUser, FavouritePlayer, FavouriteTeam, FavouriteCompetition, CommentPlayer, CommentMatch, \
    CommentCompetition, CommentTeam


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'full_name', 'name', 'birthday', 'height', 'nationality', 'position', 'best_foot',
                  'preferred_number', 'player_img')


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ('id', 'full_name', 'name', 'birthday', 'nationality', 'funcao', 'staff_img')


class TeamSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True)

    class Meta:
        model = Team
        fields = ('id', 'full_name', 'name', 'abreviated_name', 'founding_year', 'club_badge_img', 'city', 'country', 'players',
                  'formation')


class CompetitionSerializer(serializers.ModelSerializer):
    teams = TeamSerializer(many=True)

    class Meta:
        model = Competition
        fields = ('id', 'full_name', 'competition_badge_img', 'teams', 'region')


class MatchSerializer(serializers.ModelSerializer):
    home_team=TeamSerializer()
    away_team=TeamSerializer()
    class Meta:
        model = Match
        fields = ('id', 'ngame', 'description', 'home_team', 'away_team', 'competition', 'home_goals', 'away_goals')


class ClubPlaysInSerializer(serializers.ModelSerializer):
    competition = CompetitionSerializer()
    class Meta:
        model = ClubPlaysIn
        fields = ('id', 'team', 'competition', 'season')


class StaffManagesInSerializer(serializers.ModelSerializer):
    staff = StaffSerializer()

    class Meta:
        model = StaffManages
        fields = ('id', 'staff', 'team', 'season')


class PlayerPlaysForInSerializer(serializers.ModelSerializer):
    player = PlayerSerializer()
    team=TeamSerializer()
    class Meta:
        model = PlayerPlaysFor
        fields = ('id', 'player', 'team', 'season')


class CompetitionsMatchesSerializer(serializers.ModelSerializer):
    match=MatchSerializer()
    class Meta:
        model = CompetitionsMatches
        fields = ('id', 'competition', 'match', 'season')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'date_joined')



class FavouritePlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavouritePlayer
        fields = ('id', 'player', 'user')


class FavouriteTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavouriteTeam
        fields = ('id', 'team', 'user')


class FavouriteCompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavouriteCompetition
        fields = ('id', 'competition', 'user')

class NormalUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    favouriteplayers = PlayerSerializer(many=True)
    favouriteteams=TeamSerializer(many=True)
    favouritecompetitions=CompetitionSerializer(many=True)
    class Meta:
        model = NormalUser
        fields = ('id', 'user', 'job_football_related', 'favouriteplayers', 'favouriteteams', 'favouritecompetitions')


class CommentPlayerSerializer(serializers.ModelSerializer):
    user = NormalUserSerializer()

    class Meta:
        model = CommentPlayer
        fields = ('id', 'player', 'user', 'timeofpost', 'comment')


class CommentMatchSerializer(serializers.ModelSerializer):
    user = NormalUserSerializer()
    class Meta:
        model = CommentMatch
        fields = ('id', 'match', 'user', 'timeofpost', 'comment')


class CommentCompetitionSerializer(serializers.ModelSerializer):
    user = NormalUserSerializer()
    class Meta:
        model = CommentCompetition
        fields = ('id', 'competition', 'user', 'timeofpost', 'comment')


class CommentTeamSerializer(serializers.ModelSerializer):
    user = NormalUserSerializer()
    class Meta:
        model = CommentTeam
        fields = ('id', 'team', 'user', 'timeofpost', 'comment')


class CommentStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentPlayer
        fields = ('id', 'staff', 'user', 'timeofpost', 'comment')
