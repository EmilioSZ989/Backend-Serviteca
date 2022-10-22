import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DataBaseDataSource} from '../datasources';
import {VentaServicio, VentaServicioRelations, Admin, Carros, Clientes, Servicios} from '../models';
import {AdminRepository} from './admin.repository';
import {CarrosRepository} from './carros.repository';
import {ClientesRepository} from './clientes.repository';
import {ServiciosRepository} from './servicios.repository';

export class VentaServicioRepository extends DefaultCrudRepository<
  VentaServicio,
  typeof VentaServicio.prototype.Id,
  VentaServicioRelations
> {

  public readonly admin: BelongsToAccessor<Admin, typeof VentaServicio.prototype.Id>;

  public readonly carros: BelongsToAccessor<Carros, typeof VentaServicio.prototype.Id>;

  public readonly clientes: BelongsToAccessor<Clientes, typeof VentaServicio.prototype.Id>;

  public readonly servicios: BelongsToAccessor<Servicios, typeof VentaServicio.prototype.Id>;

  constructor(
    @inject('datasources.DataBase') dataSource: DataBaseDataSource, @repository.getter('AdminRepository') protected adminRepositoryGetter: Getter<AdminRepository>, @repository.getter('CarrosRepository') protected carrosRepositoryGetter: Getter<CarrosRepository>, @repository.getter('ClientesRepository') protected clientesRepositoryGetter: Getter<ClientesRepository>, @repository.getter('ServiciosRepository') protected serviciosRepositoryGetter: Getter<ServiciosRepository>,
  ) {
    super(VentaServicio, dataSource);
    this.servicios = this.createBelongsToAccessorFor('servicios', serviciosRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.clientes = this.createBelongsToAccessorFor('clientes', clientesRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.carros = this.createBelongsToAccessorFor('carros', carrosRepositoryGetter,);
    this.registerInclusionResolver('carros', this.carros.inclusionResolver);
    this.admin = this.createBelongsToAccessorFor('admin', adminRepositoryGetter,);
    this.registerInclusionResolver('admin', this.admin.inclusionResolver);
  }
}
