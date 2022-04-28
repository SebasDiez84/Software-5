import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Sede} from './sede.model';

@model()
export class Empleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  codigo_empleado: string;

  @property({
    type: 'string',
  })
  cedula_empleado?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_empleado: string;

  @belongsTo(() => Sede)
  sede_perteneciente: string;

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
