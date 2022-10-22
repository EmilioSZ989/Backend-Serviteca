import {Entity, model, property, hasMany} from '@loopback/repository';
import {VentaServicio} from './venta-servicio.model';

@model()
export class Servicios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  CodeServicio: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  costo: string;

  @hasMany(() => VentaServicio)
  ventaServicios: VentaServicio[];

  constructor(data?: Partial<Servicios>) {
    super(data);
  }
}

export interface ServiciosRelations {
  // describe navigational properties here
}

export type ServiciosWithRelations = Servicios & ServiciosRelations;
