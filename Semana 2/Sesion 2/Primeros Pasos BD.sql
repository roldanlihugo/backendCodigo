# Para nosotros crear una tabla necesitamos saber:
# el nombre de la tabla 
# el nombre y cuantos campos o atributos vamos a tener
# la definicion de cada campo
# un ejemplo
#create table nombre_tabla (
#	nombre_columna tipo_columna,
#    nombre2_columna tipo_columna
#);
# aparte de definir el nombre y tipo de la columna se pueden añadir opciones extras, como x eje:
# NOT NULL => que el campo no puede no guardar nada.
# AUTO_INCREMENT => esta opcion va de la mano si es una columna int y va a autoincrementarse
# cada vez que se guarde un nuevo registro, se usa frecuentemente en las LLAVES PRIMARIAS (PK) solamente puede usarse un campo por tabla
#PRIMARY KEY => sirve para definir que columna va a ser la encargada de ser la llave primaria por lo que nunca se va a repetir el mismo valor.

# Para crear una tabla primero tenemos que saber en que base de datos la vamos a guardar
# Crear una base de datos
# CREATE DATABASE nombre_bd;
# CREATE SCHEMA nombre_bd;
CREATE DATABASE codigo_virtual;
USE codigo_virtual;

create table t_alumno(
	alum_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    alum_nomb varchar(50),
    alum_ape varchar(50),
    alum_mail varchar(35)
);

# La forma para eliminar una tabla
DROP TABLE t_alumno;
# drop database nombre_bd;
# NOTA: no se puede eliminar una tabla que tenga una relacion (FK con otra tabla)
# primero se debe eliminar la tabla (o relacion) donde esta la FK y luego recien la tabla

# Para inserta un nuevo registro se usa las palabras claves INSERT INTO luego el nombre tabla y sus campos y la palabra clave VALUES
INSERT INTO t_alumno (alum_nomb, alum_ape, alum_mail) VALUES 
					('Eduardo','De Rivero', 'ederiveroman@gmail.com');

# Para visualizar el contenido de una tabla se usa el comando SELECT luego ver que columnas queremos
# si quieremos todas las columnas usamos el * y luego la palabra clave FROM y luego el nombre de la tabla
SELECT * FROM t_alumno;

# vamos a crear una bd en la cual vamos a guardar los productos y sus categorias
CREATE DATABASE minimarket;
use minimarket;
create table t_categorias(
	cat_id int not null auto_increment primary key,
    cat_desc varchar(50)
);
create table t_productos(
	prod_id int not null auto_increment primary key,
    prod_desc varchar(50),
    prod_prec decimal(5,2),
    cat_id int,
    foreign key (cat_id) references t_categorias(cat_id)
);





