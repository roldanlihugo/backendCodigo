from django.db import models
from django.utils import timezone
from inventario.models import RazaModel
# retorna la hora actual segun la zona horaria en la que nos encontremos
# timezone.now() 

class ClienteModel(models.Model):
    # Como le cambio el nombre de mi tabla a la base de datos
    clienteId = models.AutoField(primary_key=True, db_column="cli_id", null=False, unique=True)
    clienteNombre = models.CharField(db_column="cli_nom", max_length=45)
    clienteApellido = models.CharField(db_column="cli_ape", max_length=45)
    # valida que en el texto ingresado contenga un @ y un . osea direccion@dominio.com
    clienteEmail = models.EmailField(db_column="cli_email", max_length=25, null=True, unique=True) 
    clienteInicio = models.DateField(db_column="cli_desde", default=timezone.now)
    clienteFono = models.CharField(db_column="cli_fono", max_length=10)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    class Meta:
        # https://docs.djangoproject.com/en/3.1/ref/models/options/
        # sirve para pasar los metadatos al padre para este los trabaje internamente y se puede usar en cualquier clase siempre y cuando realicemos la herencia
        db_table= "t_cliente"
        ordering = ["clienteInicio","clienteNombre"]
        verbose_name_plural= "Clientes"
        verbose_name = "Cliente"

class MascotaModel(models.Model):
    mascotaId = models.AutoField(primary_key=True, null=False, unique=True, db_column="mascota_id")
    mascotaNombre= models.CharField(max_length=45, db_column="mascota_nomb")
    mascotaFechaNacimiento= models.DateTimeField(db_column="mascota_fecnac")
    # GENERAR FK de mi modelo Raza
    # SET_NULL => CUANDO SE ELIMINE EL PADRE, EL CAMPO DEL HIJO DE VUELVE NULL
    # PROTECT => NO PERMITE ELIMINAR AL PADRE HASTA QUE NO TENGA HIJOS
    # CASCADE => SI SE ELIMINA EL PADRE, SE ELIMINAN LOS HIJOS
    # DO_NOTHING => SI SE ELIMINA AL PADRE EN EL HIJO VA A SEGUIR SU VALOR PERO VA A GENERAR UN ERROR DE INTEGRIDAD
    # SET_DEFAULT => INDICAMOS UN VALOR POR DEFECTO EN LA FK Y SI SE ELIMINA EL PADRE VA A CAMBIAR A SU VALOR POR DEFECTO
    # Si no defino el related_name y luego quiero ingresar a sus relaciones inversas, django crea automaticamente el nombre de la siguiente manera: el nombre del modelo con el sufijo _set, ejemplo : RazaModel_set
    razaId = models.ForeignKey(RazaModel, on_delete=models.PROTECT, related_name="razaMascotas", db_column="raza_id")
    clienteId = models.ForeignKey(ClienteModel, on_delete=models.PROTECT, related_name="clienteMascotas", db_column="cli_id")
    
    class Meta:
        db_table="t_mascota"
        verbose_name="Mascota"
        verbose_name_plural="Mascotas"
