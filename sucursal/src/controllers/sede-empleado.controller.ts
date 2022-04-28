import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Sede,
  Empleado,
} from '../models';
import {SedeRepository} from '../repositories';

export class SedeEmpleadoController {
  constructor(
    @repository(SedeRepository) protected sedeRepository: SedeRepository,
  ) { }

  @get('/sedes/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of Sede has many Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.sedeRepository.empleados(id).find(filter);
  }

  @post('/sedes/{id}/empleados', {
    responses: {
      '200': {
        description: 'Sede model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sede.prototype.codigo_sede,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInSede',
            exclude: ['codigo_empleado'],
            optional: ['sede_perteneciente']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'codigo_empleado'>,
  ): Promise<Empleado> {
    return this.sedeRepository.empleados(id).create(empleado);
  }

  @patch('/sedes/{id}/empleados', {
    responses: {
      '200': {
        description: 'Sede.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.sedeRepository.empleados(id).patch(empleado, where);
  }

  @del('/sedes/{id}/empleados', {
    responses: {
      '200': {
        description: 'Sede.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.sedeRepository.empleados(id).delete(where);
  }
}
