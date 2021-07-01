from django.contrib.auth.models import User
from django.shortcuts import render
import json
# Create your views here.
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from app import serializers
from app.models import Competition, Team, Player, Staff, CommentPlayer, CommentCompetition, CommentTeam, CommentStaff, \
    ClubPlaysIn, PlayerPlaysFor, StaffManages, Match, CompetitionsMatches, NormalUser, FavouriteTeam, \
    FavouriteCompetition, FavouritePlayer
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


@api_view(['GET','POST'])
def get_competitionDetails(request, id):
    if request.POST:
        user_id = request.data['user_id']
        competition_id = request.data['competition_id']
        normal = NormalUser.objects.get(user_id=user_id)
        if "func" in request.data:
            func = request.data['func']
            if func == "add":
                s = FavouriteCompetition(competition_id=int(competition_id), user_id=normal.id)
                s.save()
                return Response(status=status.HTTP_200_OK)
            else:
                s = FavouriteCompetition.objects.get(competition_id=int(competition_id), user_id=normal.id)
                s.delete()
                return Response(status=status.HTTP_200_OK)
        if "text" in request.data:
            text = request.data['text']
            CommentCompetition(user=NormalUser.objects.get(user_id=user_id), comment=text,
                        competition=Competition.objects.get(id=competition_id)).save()
            return Response(status=status.HTTP_200_OK)
    try:
        competition = Competition.objects.get(id=id)
    except Competition.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CompetitionSerializer(competition)
    return Response(serializer.data)


@api_view(['POST'])
@parser_classes([MultiPartParser])
@permission_classes((IsAuthenticated,))
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


@api_view(['PUT'])
@parser_classes([MultiPartParser])
@permission_classes((IsAuthenticated,))
def edit_competition(request, id):
    # print(request)
    print(request.FILES)
    print(request.data)
    print(request.data['region'])
    print(request.data['full_name'])
    print(request.data['competition_badge_img'])
    try:
        competition = Competition.objects.get(id=id)
    except Competition.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if 'competition_badge_img' in request.FILES.keys():
        competition.competition_badge_img = request.data['competition_badge_img']
    competition.full_name = request.data['full_name']
    competition.region = request.data['region']

    competition.save()
    return Response(status=200)


@api_view(['GET'])
def get_competitionComments(request, id):
    try:
        comments = CommentCompetition.objects.filter(competition_id=id)
    except CommentCompetition.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CommentCompetitionSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_competition_table(request, id, season="2020-2021"):
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
def get_competition_matches(request, id, season="2020-2021"):
    try:
        matches = CompetitionsMatches.objects.filter(competition_id=id, season=season)
    except CompetitionsMatches.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CompetitionsMatchesSerializer(matches, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_competition_seasons(request, id):
    return Response(ClubPlaysIn.objects.filter(competition_id=id).values_list('season', flat=True).distinct())

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def addTeamtoCompetition(request,compid):
    print(request.data)
    teamid = request.data['teamid']
    season = request.data['season']
    c= ClubPlaysIn(competition_id=compid,team_id=teamid,season=season)
    c.save()
    return Response(status=200)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def addMatchtoCompetition(request,compid):
    print(request.data)
    ngame = request.data['ngame']
    description = request.data['description']
    hometeamid = request.data['hometeamid']
    awayteamid = request.data['awayteamid']
    homegoals = request.data['homegoals']
    awaygoals = request.data['awaygoals']
    season = request.data['season']
    match = Match(ngame=ngame, description=description,
                  home_team_id=hometeamid,away_team_id=awayteamid,
                  home_goals=homegoals, away_goals=awaygoals,
                  competition_id=compid)
    home_team = ClubPlaysIn.objects.filter(competition=match.competition, team=match.home_team, season=season)
    away_team = ClubPlaysIn.objects.filter(competition=match.competition, team=match.away_team, season=season)

    if len(home_team) < 1 or len(away_team) < 1:
        print("jogo inválido")
        return Response(status=400)
    match.save()
    cm = CompetitionsMatches(competition=match.competition, match=match, season=season)
    cm.save()
    return Response(status=200)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated,))
def deleteCompetition(request, id):
    try:
        competition = Competition.objects.get(id=id)
    except Competition.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    competition.delete()
    return Response(status=200)

# Team Related ###############


@api_view(['GET'])
def get_teams(request):
    teams = Team.objects.all()
    serializer = TeamSerializer(teams, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def get_teamDetails(request, id):
    if request.POST:
        user_id = request.data['user_id']
        team_id = request.data['team_id']
        normal = NormalUser.objects.get(user_id=user_id)
        if "func" in request.data:
            func = request.data['func']
            if func == "add":
                s = FavouriteTeam(team_id=int(team_id), user_id=normal.id)
                s.save()
                return Response(status=status.HTTP_200_OK)
            else:
                s = FavouriteTeam.objects.get(team_id=id, user_id=normal.id)
                s.delete()
                return Response(status=status.HTTP_200_OK)
        if "text" in request.data:
            text = request.data['text']
            CommentTeam(user=NormalUser.objects.get(user_id=user_id), comment=text,
                        team=Team.objects.get(id=team_id)).save()
            return Response(status=status.HTTP_200_OK)

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
def get_teamPlayers(request, id, season='2020-2021'):
    try:
        players = PlayerPlaysFor.objects.filter(season=season, team_id=id)
    except PlayerPlaysFor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PlayerPlaysForInSerializer(players, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_teamCompetition(request, id, season='2020-2021'):
    try:
        competitions = ClubPlaysIn.objects.filter(season=season, team_id=id)
    except ClubPlaysIn.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ClubPlaysInSerializer(competitions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_teamStaff(request, id, season='2020-2021'):
    try:
        staff = StaffManages.objects.filter(season=season, team_id=id)
    except PlayerPlaysFor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = StaffManagesInSerializer(staff, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_teamSeasons(request, id):
    try:
        seasons = ClubPlaysIn.objects.filter(team_id=id).distinct()
    except ClubPlaysIn.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = ClubPlaysInSerializer(seasons, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@parser_classes([MultiPartParser])
@permission_classes((IsAuthenticated,))
def insert_team(request):
    print(request)
    print(request.FILES)
    t = Team(full_name=request.data['full_name'],
             name=request.data['name'],
             abreviated_name=request.data['abreviated_name'],
             founding_year=int(request.data['founding_year']),
             club_badge_img=request.data['club_badge_img'],
             city=request.data['city'],
             country=request.data['country'],
             formation=request.data['formation']
             )
    t.save()
    print(t)
    return Response(status=200)


@api_view(['PUT'])
@parser_classes([MultiPartParser])
@permission_classes((IsAuthenticated,))
def edit_team(request, id):
    print(request)
    print(request.FILES)
    try:
        team = Team.objects.get(id=id)
    except Team.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if 'club_badge_img' in request.FILES.keys():
        team.club_badge_img = request.data['club_badge_img']
    team.full_name = request.data['full_name']
    team.name = request.data['name']
    team.abreviated_name = request.data['abreviated_name']
    team.founding_year = int(request.data['founding_year'])
    team.city = request.data['city']
    team.country = request.data['country']
    team.formation = request.data['formation']
    team.save()
    print(team)
    return Response(status=200)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def addPlayertoTeam(request,teamid):
    print(request.data)
    playerid = request.data['playerid']
    season = request.data['season']
    p = PlayerPlaysFor(team_id=teamid, player_id=playerid, season=season)
    p.save()
    return Response(status=200)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def addStafftoTeam(request,teamid):
    print(request.data)
    staffid = request.data['staffid']
    season = request.data['season']
    s = StaffManages(team_id=teamid, staff_id=staffid, season=season)
    s.save()
    return Response(status=200)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated,))
def deleteTeam(request, id):
    try:
        team = Team.objects.get(id=id)
    except Team.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    team.delete()
    return Response(status=200)

# Player Related ############3

@api_view(['GET'])
def get_players(request):
    players = Player.objects.all()
    serializer = PlayerSerializer(players, many=True)
    return Response(serializer.data)


@api_view(['GET','POST'])
def get_playerdetails(request, id):
    if request.POST:
        user_id = request.data['user_id']
        player_id = request.data['player_id']
        normal = NormalUser.objects.get(user_id=user_id)
        if "func" in request.data:
            func = request.data['func']
            if func == "add":
                s = FavouritePlayer(player_id=int(player_id), user_id=normal.id)
                s.save()
                return Response(status=status.HTTP_200_OK)
            else:
                s = FavouritePlayer.objects.get(player_id=int(player_id), user_id=normal.id)
                s.delete()
                return Response(status=status.HTTP_200_OK)
        if "text" in request.data:
            text = request.data['text']
            CommentPlayer(user=NormalUser.objects.get(user_id=user_id), comment=text,
                        player=Player.objects.get(id=player_id)).save()
            return Response(status=status.HTTP_200_OK)
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
def get_playerSeasons(request, id):
    try:
        players = PlayerPlaysFor.objects.filter(player_id=id)
    except PlayerPlaysFor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = PlayerPlaysForInSerializer(players, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@parser_classes([MultiPartParser])
@permission_classes((IsAuthenticated,))
def insert_player(request):
    print(request)
    print(request.FILES)
    p = Player(full_name=request.data['full_name'],
               name=request.data['name'],
               birthday=request.data['birthday'],
               height=request.data['height'],
               nationality=request.data['nationality'],
               position=request.data['position'],
               best_foot=request.data['best_foot'],
               preferred_number=request.data['preferred_number'],
               player_img=request.data['player_img']
               )

    p.save()
    print(p)
    return Response(status=200)


@api_view(['PUT'])
@parser_classes([MultiPartParser])
@permission_classes((IsAuthenticated,))
def edit_player(request, id):
    print(request)
    print(request.FILES)

    try:
        player = Player.objects.get(id=id)
    except Player.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if 'player_img' in request.FILES.keys():
        player.player_img = request.data['player_img']

    player.full_name=request.data['full_name']
    player.name=request.data['name']
    player.birthday=request.data['birthday']
    player.height=request.data['height']
    player.nationality=request.data['nationality']
    player.position=request.data['position']
    player.best_foot=request.data['best_foot']
    player.preferred_number=request.data['preferred_number']
    player.save()

    return Response(status=200)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated,))
def deletePlayer(request, id):
    try:
        player = Player.objects.get(id=id)
    except Player.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    player.delete()
    return Response(status=200)


# Staff Related

@api_view(['GET'])
def get_staff(request):
    staff = Staff.objects.all()
    serializer = StaffSerializer(staff, many=True)
    return Response(serializer.data)


@api_view(['GET','POST'])
def get_staffdetails(request, id):
    if request.POST:
        user_id = request.data['user_id']
        staff_id = request.data['staff_id']
        if "text" in request.data:
            text = request.data['text']
            CommentStaff(user=NormalUser.objects.get(user_id=user_id), comment=text,
                        staff=Staff.objects.get(id=staff_id)).save()
            return Response(status=status.HTTP_200_OK)
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

@api_view(['GET'])
def get_staffSeasons(request,id):
    try:
        staff = StaffManages.objects.filter(staff_id=id)
    except StaffManages.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = StaffManagesInSerializer(staff, many=True)
    return Response(serializer.data)
@api_view(['POST'])
@parser_classes([MultiPartParser])
@permission_classes((IsAuthenticated,))
def insert_staff(request):
    print(request)
    print(request.FILES)
    s = Staff(full_name=request.data['full_name'],
              name=request.data['name'],
              birthday=request.data['birthday'],
              nationality=request.data['nationality'],
              staff_img=request.data['staff_img'],
              funcao=request.data['funcao']
              )
    s.save()
    print(s)
    return Response(status=200)


@api_view(['PUT'])
@parser_classes([MultiPartParser])
@permission_classes((IsAuthenticated,))
def edit_staff(request, id):
    print(request)
    print(request.FILES)

    try:
        staff = Staff.objects.get(id=id)
    except Staff.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if 'staff_img' in request.FILES.keys():
        staff.staff_img = request.data['staff_img']

    staff.full_name = request.data['full_name']
    staff.name = request.data['name']
    staff.birthday = request.data['birthday']
    staff.nationality = request.data['nationality']
    staff.funcao = request.data['funcao']
    staff.save()
    return Response(status=200)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated,))
def deleteStaff(request, id):
    try:
        staff = Staff.objects.get(id=id)
    except Staff.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    staff.delete()
    return Response(status=200)

#User Stuff
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_UserProfile(request, id):
    try:
        userInfo = NormalUser.objects.get(user_id=id),
    except NormalUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = NormalUserSerializer(userInfo, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def make_Normal_User(request,username):
    user= User.objects.get(username=username)
    s= NormalUser(user=user, job_football_related=False).save()
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_AdminProfile(request, id):
    try:
        userInfo = User.objects.get(id=id),
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(userInfo, many=True)
    return Response(serializer.data)
