import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {VentaServicio, VentaServicioRelations, Clientes, Servicios, Carros, Administradores} from '../models';
import {ClientesRepository} from './clientes.repository';
import {ServiciosRepository} from './servicios.repository';
import {CarrosRepository} from './carros.repository';
import {AdministradoresRepository} from './administradores.repository';

export class VentaServicioRepository extends DefaultCrudRepository<
  VentaServicio,
  typeof VentaServicio.prototype.Id,
  VentaServicioRelations
> {

  public readonly clientes: BelongsToAccessor<Clientes, typeof VentaServicio.prototype.Id>;

  public readonly servicios: BelongsToAccessor<Servicios, typeof VentaServicio.prototype.Id>;

  public readonly carros: BelongsToAccessor<Carros, typeof VentaServicio.prototype.Id>;

  public readonly administradores: BelongsToAccessor<Administradores, typeof VentaServicio.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClientesRepository') protected clientesRepositoryGetter: Getter<ClientesRepository>, @repository.getter('ServiciosRepository') protected serviciosRepositoryGetter: Getter<ServiciosRepository>, @repository.getter('CarrosRepository') protected carrosRepositoryGetter: Getter<CarrosRepository>, @repository.getter('AdministradoresRepository') protected administradoresRepositoryGetter: Getter<AdministradoresRepository>,
  ) {
    super(VentaServicio, dataSource);
    this.administradores = this.createBelongsToAccessorFor('administradores', administradoresRepositoryGetter,);
    this.registerInclusionResolver('administradores', this.administradores.inclusionResolver);
    this.carros = this.createBelongsToAccessorFor('carros', carrosRepositoryGetter,);
    this.registerInclusionResolver('carros', this.carros.inclusionResolver);
    this.servicios = this.createBelongsToAccessorFor('servicios', serviciosRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.clientes = this.createBelongsToAccessorFor('clientes', clientesRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
