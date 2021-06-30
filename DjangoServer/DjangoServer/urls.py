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
from django.urls import path

from DjangoServer import settings
from app import views
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ws/competitions/', views.get_competitions),
    path('ws/competitions/<int:id>', views.get_competitionDetails),
    path('ws/competitions/comments/<int:id>',views.get_competitionComments),
    path('ws/insertcompetition/',views.insert_competition),
    path('ws/editcompetition/<int:id>', views.edit_competition),

    path('ws/teams/', views.get_teams),
    path('ws/teams/<int:id>', views.get_teamDetails),
    path('ws/teams/<int:id>/<str:season>', views.get_teamDetails),
    path('ws/teams/comments/<int:id>',views.get_teamComments),

    path('ws/players/', views.get_players),
    path('ws/players/<int:id>', views.get_playerdetails),
    path('ws/players/comments/<int:id>', views.get_playerComments),

    path('ws/staff/', views.get_staff),
    path('ws/staff/<int:id>', views.get_staffdetails),
    path('ws/staff/comments/<int:id>', views.get_staffComments),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
