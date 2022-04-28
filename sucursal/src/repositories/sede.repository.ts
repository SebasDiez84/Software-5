import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresqlDsDataSource} from '../datasources';
import {Sede, SedeRelations, Empleado} from '../models';
import {EmpleadoRepository} from './empleado.repository';

export class SedeRepository extends DefaultCrudRepository<
  Sede,
  typeof Sede.prototype.codigo_sede,
  SedeRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Sede.prototype.codigo_sede>;

  constructor(
    @inject('datasources.postgresqlDs') dataSource: PostgresqlDsDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Sede, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
