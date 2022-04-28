import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleado,
  Sede,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoSedeController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/sede', {
    responses: {
      '200': {
        description: 'Sede belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sede)},
          },
        },
      },
    },
  })
  async getSede(
    @param.path.string('id') id: typeof Empleado.prototype.codigo_empleado,
  ): Promise<Sede> {
    return this.empleadoRepository.sede(id);
  }
}
