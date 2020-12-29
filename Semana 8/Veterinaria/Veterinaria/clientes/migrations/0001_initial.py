# Generated by Django 3.1.3 on 2020-12-19 18:26

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('inventario', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClienteModel',
            fields=[
                ('clienteId', models.AutoField(db_column='cli_id', primary_key=True, serialize=False, unique=True)),
                ('clienteNombre', models.CharField(db_column='cli_nom', max_length=45)),
                ('clienteApellido', models.CharField(db_column='cli_ape', max_length=45)),
                ('clienteEmail', models.EmailField(db_column='cli_email', max_length=25, null=True, unique=True)),
                ('clienteInicio', models.DateField(db_column='cli_desde', default=django.utils.timezone.now)),
                ('clienteFono', models.CharField(db_column='cli_fono', max_length=10)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Cliente',
                'verbose_name_plural': 'Clientes',
                'db_table': 't_cliente',
                'ordering': ['clienteInicio', 'clienteNombre'],
            },
        ),
        migrations.CreateModel(
            name='MascotaModel',
            fields=[
                ('mascotaId', models.AutoField(db_column='mascota_id', primary_key=True, serialize=False, unique=True)),
                ('mascotaNombre', models.CharField(db_column='mascota_nomb', max_length=45)),
                ('mascotaFechaNacimiento', models.DateTimeField(db_column='mascota_fecnac')),
                ('clienteId', models.ForeignKey(db_column='cli_id', on_delete=django.db.models.deletion.PROTECT, related_name='clienteMascotas', to='clientes.clientemodel')),
                ('razaId', models.ForeignKey(db_column='raza_id', on_delete=django.db.models.deletion.PROTECT, related_name='razaMascotas', to='inventario.razamodel')),
            ],
            options={
                'verbose_name': 'Mascota',
                'verbose_name_plural': 'Mascotas',
                'db_table': 't_mascota',
            },
        ),
    ]
