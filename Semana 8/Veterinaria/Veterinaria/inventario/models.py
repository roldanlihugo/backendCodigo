from django.db import models

# Create your models here.


class ProductoModel(models.Model):
    productotId = models.AutoField(db_column="prod_id", primary_key=True, unique=True, null=False)
    productoNombre = models.CharField(max_length=45, db_column="prod_desc")
    productoPrecio = models.DecimalField(db_column="prod_prec", max_digits=5, decimal_places=2)
    estado = models.BooleanField(default=True)
    productoOriginal = models.ForeignKey('self', on_delete=models.CASCADE, db_column="prod_original")

    class Meta:
        db_table = "t_producto"
        verbose_name = "Producto"
        verbose_name_plural = "Productos"

class RazaModel(models.Model):
    razaId = models.AutoField(primary_key=True, null=False, unique=True, db_column="raza_id")
    razaNombre = models.CharField(max_length=45, db_column="raza_desc", unique=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    class Meta:
        db_table="t_raza"
        verbose_name="Raza"
        verbose_name_plural="Razas"

class ProductoRazaModel(models.Model):
    productoRazaId = models.AutoField(primary_key=True, null=False, unique=True, db_column="prod_raza_id")
    productotId = models.ForeignKey(ProductoModel, on_delete=models.PROTECT, db_column="prod_id")
    razaId = models.ForeignKey(RazaModel, on_delete=models.PROTECT, db_column="raza_id")
    class Meta:
        db_table="t_prod_raza"
        verbose_name="Producto Raza"
        verbose_name_plural="Productos Razas"
