import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Admin,
  VentaServicio,
} from '../models';
import {AdminRepository} from '../repositories';

export class AdminVentaServicioController {
  constructor(
    @repository(AdminRepository) protected adminRepository: AdminRepository,
  ) { }

  @get('/admins/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Array of Admin has many VentaServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VentaServicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<VentaServicio>,
  ): Promise<VentaServicio[]> {
    return this.adminRepository.ventaServicios(id).find(filter);
  }

  @post('/admins/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Admin model instance',
        content: {'application/json': {schema: getModelSchemaRef(VentaServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Admin.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentaServicio, {
            title: 'NewVentaServicioInAdmin',
            exclude: ['Id'],
            optional: ['adminId']
          }),
        },
      },
    }) ventaServicio: Omit<VentaServicio, 'Id'>,
  ): Promise<VentaServicio> {
    return this.adminRepository.ventaServicios(id).create(ventaServicio);
  }

  @patch('/admins/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Admin.VentaServicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentaServicio, {partial: true}),
        },
      },
    })
    ventaServicio: Partial<VentaServicio>,
    @param.query.object('where', getWhereSchemaFor(VentaServicio)) where?: Where<VentaServicio>,
  ): Promise<Count> {
    return this.adminRepository.ventaServicios(id).patch(ventaServicio, where);
  }

  @del('/admins/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Admin.VentaServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VentaServicio)) where?: Where<VentaServicio>,
  ): Promise<Count> {
    return this.adminRepository.ventaServicios(id).delete(where);
  }
}
