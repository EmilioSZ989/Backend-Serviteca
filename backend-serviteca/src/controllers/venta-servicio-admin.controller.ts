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
  Admin,
} from '../models';
import {VentaServicioRepository} from '../repositories';

export class VentaServicioAdminController {
  constructor(
    @repository(VentaServicioRepository)
    public ventaServicioRepository: VentaServicioRepository,
  ) { }

  @get('/venta-servicios/{id}/admin', {
    responses: {
      '200': {
        description: 'Admin belonging to VentaServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Admin)},
          },
        },
      },
    },
  })
  async getAdmin(
    @param.path.string('id') id: typeof VentaServicio.prototype.Id,
  ): Promise<Admin> {
    return this.ventaServicioRepository.admin(id);
  }
}
