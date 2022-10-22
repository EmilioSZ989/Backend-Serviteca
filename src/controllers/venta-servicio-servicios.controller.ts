import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  VentaServicio,
  Servicios,
} from '../models';
import {VentaServicioRepository} from '../repositories';

export class VentaServicioServiciosController {
  constructor(
    @repository(VentaServicioRepository)
    public ventaServicioRepository: VentaServicioRepository,
  ) { }

  @get('/venta-servicios/{id}/servicios', {
    responses: {
      '200': {
        description: 'Servicios belonging to VentaServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicios)},
          },
        },
      },
    },
  })
  async getServicios(
    @param.path.string('id') id: typeof VentaServicio.prototype.Id,
  ): Promise<Servicios> {
    return this.ventaServicioRepository.servicios(id);
  }
}
