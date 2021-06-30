from django.contrib.auth.models import User
from django.shortcuts import render
import json
# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from app import serializers
from app.models import Competition, Team, Player, Staff, CommentPlayer, CommentCompetition, CommentTeam, CommentStaff, \
    ClubPlaysIn, PlayerPlaysFor, StaffManages, Match, CompetitionsMatches, NormalUser
from app.serializers import CompetitionSerializer, TeamSerializer, PlayerSerializer, StaffSerializer, \
    CommentPlayerSerializer, CommentCompetitionSerializer, CommentTeamSerializer, CommentStaffSerializer, \
    PlayerPlaysForInSerializer, ClubPlaysInSerializer, StaffManagesInSerializer, MatchSerializer, \
    CompetitionsMatchesSerializer, UserSerializer, NormalUserSerializer


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

@api_view(['GET'])
def get_competitionComments(request, id):
    try:
        comments = CommentCompetition.objects.filter(competition_id=id)
    except CommentCompetition.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CommentCompetitionSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_competition_table(request,id, season="2020-2021"):
    teams = Team.objects.filter(clubplaysin__competition=id, clubplaysin__season=season)
    table = []
    for t in teams:
        dic = {
            "team": TeamSerializer(t).data, "points": 0, "home_goal": 0, "away_goal": 0,
            "home_concede": 0, "away_concede": 0,
            "win": 0, "draw": 0, "loss": 0
        }
        home_matches = Match.objects.filter(competitionsmatches__competition_id=id,
                                            competitionsmatches__season=season,
                                            home_team=t)
        for m in home_matches:
            if m.home_goals > m.away_goals:
                dic["win"] += 1
                dic["points"] += 3
            elif m.home_goals == m.away_goals:
                dic["draw"] += 1
                dic["points"] += 1
            else:
                dic["loss"] += 1
            dic["home_goal"] += m.home_goals
            dic["home_concede"] += m.away_goals
        away_matches = Match.objects.filter(competitionsmatches__competition_id=id,
                                            competitionsmatches__season=season,
                                            away_team=t)
        for m in away_matches:
            if m.home_goals < m.away_goals:
                dic["win"] += 1
                dic["points"] += 3
            elif m.home_goals == m.away_goals:
                dic["draw"] += 1
                dic["points"] += 1
            else:
                dic["loss"] += 1
            dic["away_goal"] += m.away_goals
            dic["away_concede"] += m.home_goals

        table.append(dic)
    table.sort(key=lambda k: -k["points"])
    return Response({"table": table})




@api_view(['GET'])
def get_competition_matches(request,id, season="2020-2021"):
    try:
        matches=CompetitionsMatches.objects.filter(competition_id=id,season=season)
    except CompetitionsMatches.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CompetitionsMatchesSerializer(matches, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_competition_seasons(request,id):
    try:
        seasons=ClubPlaysIn.objects.filter(competition_id=id).distinct()
        print(seasons)
    except ClubPlaysIn.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ClubPlaysInSerializer(seasons, many=True)
    return Response(serializer.data)





# Team Related ###############


@api_view(['GET'])
def get_teams(request):
    teams = Team.objects.all()
    serializer = TeamSerializer(teams, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_teamDetails(request, id):
    try:
        team = Team.objects.get(id=id)
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

@api_view(['GET'])
def get_teamPlayers(request,id, season='2020-2021'):
    try:
        players = PlayerPlaysFor.objects.filter(season=season,team_id=id)
    except PlayerPlaysFor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PlayerPlaysForInSerializer(players, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_teamCompetition(request,id, season='2020-2021'):
    try:
        competitions = ClubPlaysIn.objects.filter(season=season,team_id=id)
    except ClubPlaysIn.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ClubPlaysInSerializer(competitions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_teamStaff(request,id, season='2020-2021'):
    try:
        staff = StaffManages.objects.filter(season=season,team_id=id)
    except PlayerPlaysFor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = StaffManagesInSerializer(staff, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_teamSeasons(request,id):
    try:
        seasons=ClubPlaysIn.objects.filter(team_id=id).distinct()
        print(seasons)
    except ClubPlaysIn.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ClubPlaysInSerializer(seasons, many=True)
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

@api_view(['GET'])
def get_playerSeasons(request,id):
    try:
        players = PlayerPlaysFor.objects.filter(player_id=id)
    except PlayerPlaysFor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PlayerPlaysForInSerializer(players, many=True)
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

#User Stuff
@api_view(['GET'])
def get_UserProfile(request, id):
    try:
        userInfo= NormalUser.objects.get(user_id=id),
    except NormalUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = NormalUserSerializer(userInfo, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def get_AdminProfile(request, id):
    try:
        userInfo= User.objects.get(id=id),
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(userInfo, many=True)
    return Response(serializer.data)