import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DataBaseDataSource} from '../datasources';
import {Carros, CarrosRelations, VentaServicio} from '../models';
import {VentaServicioRepository} from './venta-servicio.repository';

export class CarrosRepository extends DefaultCrudRepository<
  Carros,
  typeof Carros.prototype.Id,
  CarrosRelations
> {

  public readonly ventaServicios: HasManyRepositoryFactory<VentaServicio, typeof Carros.prototype.Id>;

  constructor(
    @inject('datasources.DataBase') dataSource: DataBaseDataSource, @repository.getter('VentaServicioRepository') protected ventaServicioRepositoryGetter: Getter<VentaServicioRepository>,
  ) {
    super(Carros, dataSource);
    this.ventaServicios = this.createHasManyRepositoryFactoryFor('ventaServicios', ventaServicioRepositoryGetter,);
    this.registerInclusionResolver('ventaServicios', this.ventaServicios.inclusionResolver);
  }
}
