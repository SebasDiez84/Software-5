import {Entity, model, property, hasMany} from '@loopback/repository';
import {Empleado} from './empleado.model';

@model()
export class Sede extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  codigo_sede?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_sede: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion_sede: string;

  @hasMany(() => Empleado, {keyTo: 'sede_perteneciente'})
  empleados: Empleado[];

  constructor(data?: Partial<Sede>) {
    super(data);
  }
}

export interface SedeRelations {
  // describe navigational properties here
}

export type SedeWithRelations = Sede & SedeRelations;
