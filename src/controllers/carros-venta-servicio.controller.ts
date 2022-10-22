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
  Carros,
  VentaServicio,
} from '../models';
import {CarrosRepository} from '../repositories';

export class CarrosVentaServicioController {
  constructor(
    @repository(CarrosRepository) protected carrosRepository: CarrosRepository,
  ) { }

  @get('/carros/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Array of Carros has many VentaServicio',
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
    return this.carrosRepository.ventaServicios(id).find(filter);
  }

  @post('/carros/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Carros model instance',
        content: {'application/json': {schema: getModelSchemaRef(VentaServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Carros.prototype.Placa,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentaServicio, {
            title: 'NewVentaServicioInCarros',
            exclude: ['Id'],
            optional: ['carrosId']
          }),
        },
      },
    }) ventaServicio: Omit<VentaServicio, 'Id'>,
  ): Promise<VentaServicio> {
    return this.carrosRepository.ventaServicios(id).create(ventaServicio);
  }

  @patch('/carros/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Carros.VentaServicio PATCH success count',
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
    return this.carrosRepository.ventaServicios(id).patch(ventaServicio, where);
  }

  @del('/carros/{id}/venta-servicios', {
    responses: {
      '200': {
        description: 'Carros.VentaServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VentaServicio)) where?: Where<VentaServicio>,
  ): Promise<Count> {
    return this.carrosRepository.ventaServicios(id).delete(where);
  }
}
