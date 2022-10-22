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
  Administradores,
  VentaServicio,
} from '../models';
import {AdministradoresRepository} from '../repositories';

export class AdministradoresVentaServicioController {
  constructor(
    @repository(AdministradoresRepository) protected administradoresRepository: AdministradoresRepository,
  ) { }

  @get('/administradores/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Array of Administradores has many VentaServicio',
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
    return this.administradoresRepository.ventaServicios(id).find(filter);
  }

  @post('/administradores/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Administradores model instance',
        content: {'application/json': {schema: getModelSchemaRef(VentaServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administradores.prototype.Clave,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentaServicio, {
            title: 'NewVentaServicioInAdministradores',
            exclude: ['Id'],
            optional: ['administradoresId']
          }),
        },
      },
    }) ventaServicio: Omit<VentaServicio, 'Id'>,
  ): Promise<VentaServicio> {
    return this.administradoresRepository.ventaServicios(id).create(ventaServicio);
  }

  @patch('/administradores/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Administradores.VentaServicio PATCH success count',
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
    return this.administradoresRepository.ventaServicios(id).patch(ventaServicio, where);
  }

  @del('/administradores/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Administradores.VentaServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VentaServicio)) where?: Where<VentaServicio>,
  ): Promise<Count> {
    return this.administradoresRepository.ventaServicios(id).delete(where);
  }
}
