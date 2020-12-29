from django.db import models
from inventario.models import ProductoModel
from clientes.models import MascotaModel
class CitaModel(models.Model):
    citaId = models.AutoField(primary_key=True,db_column="cita_id", null=False, unique=True)
    citaNombre = models.CharField(max_length=45, db_column="cita_desc")
    citaFecha = models.DateTimeField(db_column="cita_fecha")
    citaObservaciones = models.TextField(db_column="cita_obs")
    mascotaId = models.ForeignKey(MascotaModel, on_delete=models.PROTECT, db_column="mascota_id")
    class Meta:
        db_table="t_cita"
        verbose_name="Cita"
        verbose_name_plural="Citas"

class HistorialModel(models.Model):
    historialId = models.AutoField(primary_key=True, db_column="historial_id", null=False, unique=True)
    historialFecha = models.DateTimeField(db_column="historial_fecha")
    # Relacionar con los otras aplicaciones las llaves del historial
    productoId = models.ForeignKey(ProductoModel, on_delete=models.PROTECT, db_column="prod_id")
    citaId = models.ForeignKey(CitaModel, on_delete=models.PROTECT, db_column="cita_id")
