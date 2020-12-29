import { usuarioSchema } from '../models/usuario';
import { videoSchema } from '../models/video';
import { model } from 'mongoose';

export const Usuario = model('usuario', usuarioSchema);
export const Video = model('video', videoSchema);