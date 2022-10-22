import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DataBaseDataSource} from '../datasources';
import {Clientes, ClientesRelations, VentaServicio} from '../models';
import {VentaServicioRepository} from './venta-servicio.repository';

export class ClientesRepository extends DefaultCrudRepository<
  Clientes,
  typeof Clientes.prototype.Id,
  ClientesRelations
> {

  public readonly ventaServicios: HasManyRepositoryFactory<VentaServicio, typeof Clientes.prototype.Id>;

  constructor(
    @inject('datasources.DataBase') dataSource: DataBaseDataSource, @repository.getter('VentaServicioRepository') protected ventaServicioRepositoryGetter: Getter<VentaServicioRepository>,
  ) {
    super(Clientes, dataSource);
    this.ventaServicios = this.createHasManyRepositoryFactoryFor('ventaServicios', ventaServicioRepositoryGetter,);
    this.registerInclusionResolver('ventaServicios', this.ventaServicios.inclusionResolver);
  }
}
