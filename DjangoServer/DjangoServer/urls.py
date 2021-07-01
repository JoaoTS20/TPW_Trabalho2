"""DjangoServer URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from DjangoServer import settings
from app import views
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    path('ws/profile/<int:id>',views.get_UserProfile),
    path('ws/adminprofile/<int:id>',views.get_AdminProfile),
    #path('ws/auth/login/', obtain_jwt_token),
    path('ws/auth/refresh-token/', refresh_jwt_token),
    path('ws/auth/', include('rest_auth.urls')),
    path('ws/auth/signup/', include('rest_auth.registration.urls')),
    path('ws/auth/refresh-token/', refresh_jwt_token),

    path('ws/competitions/', views.get_competitions),
    path('ws/competitions/<int:id>', views.get_competitionDetails),
    path('ws/competitions/comments/<int:id>',views.get_competitionComments),
    path('ws/insertcompetition/',views.insert_competition),
    path('ws/editcompetition/<int:id>', views.edit_competition),
    path('ws/competitions/table/<int:id>/<str:season>',views.get_competition_table),
    path('ws/competitions/teams/<int:id>/<str:season>',views.get_competition_table),
    path('ws/competitions/matches/<int:id>/<str:season>',views.get_competition_matches),
    path('ws/competitions/seasons/<int:id>',views.get_competition_seasons),
    path('ws/addteamtocompetition/<int:compid>', views.addTeamtoCompetition),
    path('ws/addmatchtocompetition/<int:compid>', views.addMatchtoCompetition),
    path('ws/deletecompetition/<int:id>', views.deleteCompetition),

    path('ws/teams/', views.get_teams),
    path('ws/teams/<int:id>', views.get_teamDetails),
    path('ws/teams/players/<int:id>/<str:season>', views.get_teamPlayers),
    path('ws/teams/staff/<int:id>/<str:season>', views.get_teamStaff),
    path('ws/teams/competitions/<int:id>/<str:season>', views.get_teamCompetition),
    path('ws/teams/comments/<int:id>',views.get_teamComments),
    path('ws/teams/seasons/<int:id>',views.get_teamSeasons),
    path('ws/insertteam/', views.insert_team),
    path('ws/editteam/<int:id>', views.edit_team),
    path('ws/addplayertoteam/<int:teamid>', views.addPlayertoTeam),
    path('ws/addstafftoteam/<int:teamid>', views.addStafftoTeam),
    path('ws/deleteteam/<int:id>', views.deleteTeam),

    path('ws/players/', views.get_players),
    path('ws/players/<int:id>', views.get_playerdetails),
    path('ws/players/comments/<int:id>', views.get_playerComments),
    path('ws/players/seasons/<int:id>', views.get_playerSeasons),
    path('ws/insertplayer/', views.insert_player),
    path('ws/editplayer/<int:id>', views.edit_player),
    path('ws/deleteplayer/<int:id>', views.deletePlayer),

    path('ws/staff/', views.get_staff),
    path('ws/staff/<int:id>', views.get_staffdetails),
    path('ws/staff/comments/<int:id>', views.get_staffComments),
    path('ws/insertstaff/', views.insert_staff),
    path('ws/editstaff/<int:id>', views.edit_staff),
    path('ws/deletestaff/<int:id>', views.deleteStaff),
    path('ws/staff/seasons/<int:id>', views.get_staffSeasons),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
