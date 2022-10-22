import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Carros, CarrosRelations, VentaServicio} from '../models';
import {VentaServicioRepository} from './venta-servicio.repository';

export class CarrosRepository extends DefaultCrudRepository<
  Carros,
  typeof Carros.prototype.Placa,
  CarrosRelations
> {

  public readonly ventaServicios: HasManyRepositoryFactory<VentaServicio, typeof Carros.prototype.Placa>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VentaServicioRepository') protected ventaServicioRepositoryGetter: Getter<VentaServicioRepository>,
  ) {
    super(Carros, dataSource);
    this.ventaServicios = this.createHasManyRepositoryFactoryFor('ventaServicios', ventaServicioRepositoryGetter,);
    this.registerInclusionResolver('ventaServicios', this.ventaServicios.inclusionResolver);
  }
}
