import {Entity, model, property, hasMany} from '@loopback/repository';
import {VentaServicio} from './venta-servicio.model';

@model()
export class Carros extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  Placa: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  ano: string;

  @hasMany(() => VentaServicio)
  ventaServicios: VentaServicio[];

  constructor(data?: Partial<Carros>) {
    super(data);
  }
}

export interface CarrosRelations {
  // describe navigational properties here
}

export type CarrosWithRelations = Carros & CarrosRelations;
