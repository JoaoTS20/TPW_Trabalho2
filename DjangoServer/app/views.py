from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from app.models import Competition, Team, Player, Staff
from app.serializers import CompetitionSerializer, TeamSerializer, PlayerSerializer, StaffSerializer


# Competition Related

@api_view(['GET'])
def get_competitions(request):
    competitions = Competition.objects.all()
    serializer = CompetitionSerializer(competitions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_competitionDetails(request, id):
    try:
        competition = Competition.objects.get(id=id)
    except Competition.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CompetitionSerializer(competition)
    return Response(serializer.data)


# Team Related


@api_view(['GET'])
def get_teams(request):
    teams = Team.objects.all()
    serializer = TeamSerializer(teams, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_teamDetails(request, id, season='2020-2021'):
    print(season)
    try:
        team = Team.objects.get(id=id)
        players=Player.objects.filter(playerplaysfor__team_id=id, playerplaysfor__season=season)
    except Team.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = TeamSerializer(team)
    return Response(serializer.data)


# Player Related

@api_view(['GET'])
def get_players(request):
    players = Player.objects.all()
    serializer = PlayerSerializer(players, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_playerdetails(request, id):
    try:
        player = Player.objects.get(id=id)
    except Player.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PlayerSerializer(player)
    return Response(serializer.data)


@api_view(['GET'])
def get_staff(request):
    staff = Staff.objects.all()
    serializer = StaffSerializer(staff, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_staffdetails(request, id):
    try:
        staff = Staff.objects.get(id=id)
    except Staff.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = StaffSerializer(staff)
    return Response(serializer.data)
