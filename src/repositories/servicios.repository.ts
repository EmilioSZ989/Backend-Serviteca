import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Servicios, ServiciosRelations, VentaServicio} from '../models';
import {VentaServicioRepository} from './venta-servicio.repository';

export class ServiciosRepository extends DefaultCrudRepository<
  Servicios,
  typeof Servicios.prototype.CodeServicio,
  ServiciosRelations
> {

  public readonly ventaServicios: HasManyRepositoryFactory<VentaServicio, typeof Servicios.prototype.CodeServicio>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VentaServicioRepository') protected ventaServicioRepositoryGetter: Getter<VentaServicioRepository>,
  ) {
    super(Servicios, dataSource);
    this.ventaServicios = this.createHasManyRepositoryFactoryFor('ventaServicios', ventaServicioRepositoryGetter,);
    this.registerInclusionResolver('ventaServicios', this.ventaServicios.inclusionResolver);
  }
}
