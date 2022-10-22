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
  Administradores,
} from '../models';
import {VentaServicioRepository} from '../repositories';

export class VentaServicioAdministradoresController {
  constructor(
    @repository(VentaServicioRepository)
    public ventaServicioRepository: VentaServicioRepository,
  ) { }

  @get('/venta-servicios/{id}/administradores', {
    responses: {
      '200': {
        description: 'Administradores belonging to VentaServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administradores)},
          },
        },
      },
    },
  })
  async getAdministradores(
    @param.path.string('id') id: typeof VentaServicio.prototype.Id,
  ): Promise<Administradores> {
    return this.ventaServicioRepository.administradores(id);
  }
}
