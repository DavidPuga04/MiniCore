from collections import defaultdict

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Envio


class ReporteCostosView(APIView):

    def get(self, request):

        fecha_inicio = request.GET.get("fecha_inicio")
        fecha_fin = request.GET.get("fecha_fin")

        envios = (
            Envio.objects
            .select_related("repartidor", "zona")
            .filter(
                fecha_envio__range=[
                    fecha_inicio,
                    fecha_fin
                ]
            )
        )

        resultado = defaultdict(
            lambda: {
                "repartidor": "",
                "cantidad_envios": 0,
                "total_kg": 0,
                "costo_total": 0,
                "zonas": set(),
                "tarifas": set()
            }
        )

        for envio in envios:

            rid = envio.repartidor.id

            costo = (
                float(envio.peso_kg)
                * float(envio.zona.tarifa_por_kg)
            )

            resultado[rid]["repartidor"] = envio.repartidor.nombre

            resultado[rid]["cantidad_envios"] += 1

            resultado[rid]["total_kg"] += float(
                envio.peso_kg
            )

            resultado[rid]["costo_total"] += costo

            resultado[rid]["zonas"].add(
                envio.zona.nombre_zona
            )

            resultado[rid]["tarifas"].add(
                float(envio.zona.tarifa_por_kg)
            )

        respuesta = []

        for item in resultado.values():

            respuesta.append({
                "repartidor": item["repartidor"],
                "cantidad_envios": item["cantidad_envios"],
                "total_kg": round(
                    item["total_kg"],
                    2
                ),
                "zonas": ", ".join(
                    sorted(item["zonas"])
                ),
                "tarifas": ", ".join(
                    [
                        f"${tarifa:.2f}"
                        for tarifa in sorted(
                            item["tarifas"]
                        )
                    ]
                ),
                "costo_total": round(
                    item["costo_total"],
                    2
                )
            })

        return Response(respuesta)