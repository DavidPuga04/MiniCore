from django.urls import path
from .views import ReporteCostosView

urlpatterns = [
    path(
        "reporte-costos/",
        ReporteCostosView.as_view(),
        name="reporte-costos"
    ),
]