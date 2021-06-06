from rest_framework import serializers

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
        fields = ('id', 'full_name', 'name', 'birthday', 'nationality', 'function', 'staff_img')


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('id', 'full_name', 'abreviated_name', 'founding_year', 'club_badge_img', 'city', 'country', 'players',
                  'formation')


class CompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competition
        fields = ('id', 'full_name', 'competition_badge_img', 'teams', 'region')


class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ('id', 'ngame', 'description', 'home_team', 'away_team', 'competition', 'home_goals', 'away_goals')


class ClubPlaysInSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubPlaysIn
        fields = ('id', 'team', 'competition', 'season')


class StaffManagesInSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffManages
        fields = ('id', 'staff', 'team', 'season')


class PlayerPlaysForInSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerPlaysFor
        fields = ('id', 'player', 'team', 'season')


class CompetitionsMatchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompetitionsMatches
        fields = ('id', 'competition', 'match', 'season')


class NormalUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NormalUser
        fields = ('id', 'user', 'job_football_related', 'favouriteplayers', 'favouriteteams', 'favouritecompetitions')


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


class CommentPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentPlayer
        fields = ('id', 'player', 'user', 'timeofpost', 'comment')


class CommentMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentMatch
        fields = ('id', 'match', 'user', 'timeofpost', 'comment')


class CommentCompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentCompetition
        fields = ('id', 'competition', 'user', 'timeofpost', 'comment')


class CommentTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentTeam
        fields = ('id', 'team', 'user', 'timeofpost', 'comment')


class CommentStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentPlayer
        fields = ('id', 'staff', 'user', 'timeofpost', 'comment')
