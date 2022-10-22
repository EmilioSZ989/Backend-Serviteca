import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DataBaseDataSource} from '../datasources';
import {Admin, AdminRelations, VentaServicio} from '../models';
import {VentaServicioRepository} from './venta-servicio.repository';

export class AdminRepository extends DefaultCrudRepository<
  Admin,
  typeof Admin.prototype.Id,
  AdminRelations
> {

  public readonly ventaServicios: HasManyRepositoryFactory<VentaServicio, typeof Admin.prototype.Id>;

  constructor(
    @inject('datasources.DataBase') dataSource: DataBaseDataSource, @repository.getter('VentaServicioRepository') protected ventaServicioRepositoryGetter: Getter<VentaServicioRepository>,
  ) {
    super(Admin, dataSource);
    this.ventaServicios = this.createHasManyRepositoryFactoryFor('ventaServicios', ventaServicioRepositoryGetter,);
    this.registerInclusionResolver('ventaServicios', this.ventaServicios.inclusionResolver);
  }
}
