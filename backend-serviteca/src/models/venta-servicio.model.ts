import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Admin} from './admin.model';
import {Carros} from './carros.model';
import {Clientes} from './clientes.model';
import {Servicios} from './servicios.model';

@model()
export class VentaServicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  costo: string;

  @belongsTo(() => Admin)
  adminId: string;

  @belongsTo(() => Carros)
  carrosId: string;

  @belongsTo(() => Clientes)
  clientesId: string;

  @belongsTo(() => Servicios)
  serviciosId: string;

  constructor(data?: Partial<VentaServicio>) {
    super(data);
  }
}

export interface VentaServicioRelations {
  // describe navigational properties here
}

export type VentaServicioWithRelations = VentaServicio & VentaServicioRelations;
