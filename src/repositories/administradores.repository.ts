import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administradores, AdministradoresRelations, VentaServicio} from '../models';
import {VentaServicioRepository} from './venta-servicio.repository';

export class AdministradoresRepository extends DefaultCrudRepository<
  Administradores,
  typeof Administradores.prototype.Clave,
  AdministradoresRelations
> {

  public readonly ventaServicios: HasManyRepositoryFactory<VentaServicio, typeof Administradores.prototype.Clave>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VentaServicioRepository') protected ventaServicioRepositoryGetter: Getter<VentaServicioRepository>,
  ) {
    super(Administradores, dataSource);
    this.ventaServicios = this.createHasManyRepositoryFactoryFor('ventaServicios', ventaServicioRepositoryGetter,);
    this.registerInclusionResolver('ventaServicios', this.ventaServicios.inclusionResolver);
  }
}
