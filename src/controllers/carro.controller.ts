import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Carros} from '../models';
import {CarrosRepository} from '../repositories';

export class CarroController {
  constructor(
    @repository(CarrosRepository)
    public carrosRepository : CarrosRepository,
  ) {}

  @post('/carros')
  @response(200, {
    description: 'Carros model instance',
    content: {'application/json': {schema: getModelSchemaRef(Carros)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carros, {
            title: 'NewCarros',
            exclude: ['id'],
          }),
        },
      },
    })
    carros: Omit<Carros, 'id'>,
  ): Promise<Carros> {
    return this.carrosRepository.create(carros);
  }

  @get('/carros/count')
  @response(200, {
    description: 'Carros model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Carros) where?: Where<Carros>,
  ): Promise<Count> {
    return this.carrosRepository.count(where);
  }

  @get('/carros')
  @response(200, {
    description: 'Array of Carros model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Carros, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Carros) filter?: Filter<Carros>,
  ): Promise<Carros[]> {
    return this.carrosRepository.find(filter);
  }

  @patch('/carros')
  @response(200, {
    description: 'Carros PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carros, {partial: true}),
        },
      },
    })
    carros: Carros,
    @param.where(Carros) where?: Where<Carros>,
  ): Promise<Count> {
    return this.carrosRepository.updateAll(carros, where);
  }

  @get('/carros/{id}')
  @response(200, {
    description: 'Carros model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Carros, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Carros, {exclude: 'where'}) filter?: FilterExcludingWhere<Carros>
  ): Promise<Carros> {
    return this.carrosRepository.findById(id, filter);
  }

  @patch('/carros/{id}')
  @response(204, {
    description: 'Carros PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carros, {partial: true}),
        },
      },
    })
    carros: Carros,
  ): Promise<void> {
    await this.carrosRepository.updateById(id, carros);
  }

  @put('/carros/{id}')
  @response(204, {
    description: 'Carros PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() carros: Carros,
  ): Promise<void> {
    await this.carrosRepository.replaceById(id, carros);
  }

  @del('/carros/{id}')
  @response(204, {
    description: 'Carros DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.carrosRepository.deleteById(id);
  }
}
