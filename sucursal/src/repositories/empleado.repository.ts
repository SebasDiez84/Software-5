import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresqlDsDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Sede} from '../models';
import {SedeRepository} from './sede.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.codigo_empleado,
  EmpleadoRelations
> {

  public readonly sede: BelongsToAccessor<Sede, typeof Empleado.prototype.codigo_empleado>;

  constructor(
    @inject('datasources.postgresqlDs') dataSource: PostgresqlDsDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>,
  ) {
    super(Empleado, dataSource);
    this.sede = this.createBelongsToAccessorFor('sede', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
  }
}
