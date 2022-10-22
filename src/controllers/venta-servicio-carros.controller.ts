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
  Carros,
} from '../models';
import {VentaServicioRepository} from '../repositories';

export class VentaServicioCarrosController {
  constructor(
    @repository(VentaServicioRepository)
    public ventaServicioRepository: VentaServicioRepository,
  ) { }

  @get('/venta-servicios/{id}/carros', {
    responses: {
      '200': {
        description: 'Carros belonging to VentaServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Carros)},
          },
        },
      },
    },
  })
  async getCarros(
    @param.path.string('id') id: typeof VentaServicio.prototype.Id,
  ): Promise<Carros> {
    return this.ventaServicioRepository.carros(id);
  }
}
