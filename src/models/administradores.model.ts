import {Entity, model, property, hasMany} from '@loopback/repository';
import {VentaServicio} from './venta-servicio.model';

@model()
export class Administradores extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  Clave: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @hasMany(() => VentaServicio)
  ventaServicios: VentaServicio[];

  constructor(data?: Partial<Administradores>) {
    super(data);
  }
}

export interface AdministradoresRelations {
  // describe navigational properties here
}

export type AdministradoresWithRelations = Administradores & AdministradoresRelations;
