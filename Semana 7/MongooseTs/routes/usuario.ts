import { Router } from 'express';
import { crearUsuario, devolverUsuario, actualizarUsuarioPorId, loginUsuario } from '../controllers/usuario';
export var usuario_router = Router();

usuario_router.post('/registro', crearUsuario);
usuario_router.get('/usuario', devolverUsuario);
usuario_router.put('/usuario/:id', actualizarUsuarioPorId);
usuario_router.post('/login', loginUsuario);