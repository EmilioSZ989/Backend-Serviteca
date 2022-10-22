import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DataBaseDataSource} from '../datasources';
import {Servicios, ServiciosRelations, VentaServicio} from '../models';
import {VentaServicioRepository} from './venta-servicio.repository';

export class ServiciosRepository extends DefaultCrudRepository<
  Servicios,
  typeof Servicios.prototype.Id,
  ServiciosRelations
> {

  public readonly ventaServicios: HasManyRepositoryFactory<VentaServicio, typeof Servicios.prototype.Id>;

  constructor(
    @inject('datasources.DataBase') dataSource: DataBaseDataSource, @repository.getter('VentaServicioRepository') protected ventaServicioRepositoryGetter: Getter<VentaServicioRepository>,
  ) {
    super(Servicios, dataSource);
    this.ventaServicios = this.createHasManyRepositoryFactoryFor('ventaServicios', ventaServicioRepositoryGetter,);
    this.registerInclusionResolver('ventaServicios', this.ventaServicios.inclusionResolver);
  }
}
