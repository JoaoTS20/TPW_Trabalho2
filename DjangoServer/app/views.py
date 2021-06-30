from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from app.models import Competition, Team, Player, Staff, CommentPlayer, CommentCompetition, CommentTeam, CommentStaff
from app.serializers import CompetitionSerializer, TeamSerializer, PlayerSerializer, StaffSerializer, \
    CommentPlayerSerializer, CommentCompetitionSerializer, CommentTeamSerializer, CommentStaffSerializer


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

@api_view(['POST'])
@parser_classes([MultiPartParser])
def insert_competition(request):
    print(request)
    print(request.FILES)
    print(request.data)
    print(request.data['region'])
    print(request.data['full_name'])
    print(request.data['competition_badge_img'])
    c = Competition(full_name=request.data['full_name'],
                    region=request.data['region'],
                    competition_badge_img=request.FILES['competition_badge_img'])
    c.save()
    print(c)
    return Response(status=200)

@api_view(['GET'])
def get_competitionComments(request, id):
    try:
        comments = CommentCompetition.objects.filter(competition_id=id)
    except CommentCompetition.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CommentCompetitionSerializer(comments, many=True)
    return Response(serializer.data)


# Team Related ###############


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

@api_view(['GET'])
def get_teamComments(request, id):
    try:
        comments = CommentTeam.objects.filter(team_id=id)
    except CommentTeam.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CommentTeamSerializer(comments, many=True)
    return Response(serializer.data)


# Player Related ############3

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
def get_playerComments(request, id):
    try:
        comments = CommentPlayer.objects.filter(player_id=id)
    except CommentPlayer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CommentPlayerSerializer(comments, many=True)
    return Response(serializer.data)


# Staff Related

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

@api_view(['GET'])
def get_staffComments(request, id):
    try:
        comments = CommentStaff.objects.filter(staff_id=id)
    except CommentStaff.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CommentStaffSerializer(comments, many=True)
    return Response(serializer.data)