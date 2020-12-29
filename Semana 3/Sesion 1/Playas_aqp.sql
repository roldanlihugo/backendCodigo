# crear una base de datos de una playa de estacionamiento, en el cual
# se guarden los vehiculos que ingresaron y tener un registro de vehiculos, una 
# tabla vehiculos debe tener su id, placa, marca, año, modelo, color, tambien la
# playa de estacionamiento tiene 3 lugares, uno en la calle san francisco 204, otro en
# san juan de dios 132 y otro en la av eeuu 505 por lo que se debe tener una tabla
# playa con su id, direccion, cantidad. La base de datos se debe llamar Playa_AQP
CREATE DATABASE PLAYA_AQP;
use PLAYA_AQP;
create table t_vehiculo(
	veh_id int not null auto_increment,
    veh_placa varchar(6),
    veh_marca varchar(30),
    veh_anio year,
    veh_modelo varchar(40),
    veh_color varchar(20),
	primary key(veh_id)
);
create table t_playa(
	playa_id int not null auto_increment primary key,
    playa_dir varchar(100),
    playa_cap int
);
create table t_registro(
	reg_id int not null auto_increment primary key,
    reg_fechin datetime,
    reg_fechfin datetime,
    playa_id int,
    veh_id int,
    foreign key (playa_id) references t_playa(playa_id),
    foreign key (veh_id) references t_vehiculo(veh_id)
);


insert into t_vehiculo ( veh_placa, veh_marca, veh_anio, veh_modelo, veh_color) values 
					('A3A123','VOLKSWAGEN',2010, 'JETTA', 'NEGRO'),
                    ('A13245','VOLKSWAGEN',2010, 'AMAROK', 'PLOMO'),
                    ('14AS','DAEWOO',2008, 'TICCO', 'AZUL'),
                    ('AY5574','TOYOTA',2018, 'TERCEL', 'BLANCO'),
                    ('OH2458','LIFAN',2014, 'XY456', 'AMARILLO');



