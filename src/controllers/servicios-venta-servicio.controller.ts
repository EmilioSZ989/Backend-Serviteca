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
  Servicios,
  VentaServicio,
} from '../models';
import {ServiciosRepository} from '../repositories';

export class ServiciosVentaServicioController {
  constructor(
    @repository(ServiciosRepository) protected serviciosRepository: ServiciosRepository,
  ) { }

  @get('/servicios/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Array of Servicios has many VentaServicio',
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
    return this.serviciosRepository.ventaServicios(id).find(filter);
  }

  @post('/servicios/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Servicios model instance',
        content: {'application/json': {schema: getModelSchemaRef(VentaServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Servicios.prototype.CodeServicio,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentaServicio, {
            title: 'NewVentaServicioInServicios',
            exclude: ['Id'],
            optional: ['serviciosId']
          }),
        },
      },
    }) ventaServicio: Omit<VentaServicio, 'Id'>,
  ): Promise<VentaServicio> {
    return this.serviciosRepository.ventaServicios(id).create(ventaServicio);
  }

  @patch('/servicios/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Servicios.VentaServicio PATCH success count',
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
    return this.serviciosRepository.ventaServicios(id).patch(ventaServicio, where);
  }

  @del('/servicios/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Servicios.VentaServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VentaServicio)) where?: Where<VentaServicio>,
  ): Promise<Count> {
    return this.serviciosRepository.ventaServicios(id).delete(where);
  }
}
