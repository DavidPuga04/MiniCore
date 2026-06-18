from django.db import models

class Repartidor(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.nombre


class Zona(models.Model):
    nombre_zona = models.CharField(max_length=50)
    tarifa_por_kg = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return self.nombre_zona


class Envio(models.Model):
    repartidor = models.ForeignKey(
        Repartidor,
        on_delete=models.CASCADE
    )

    zona = models.ForeignKey(
        Zona,
        on_delete=models.CASCADE
    )

    peso_kg = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    fecha_envio = models.DateField()