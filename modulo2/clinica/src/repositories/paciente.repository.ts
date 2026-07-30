import { DeepPartial, Repository } from 'typeorm';

import { Paciente } from '../model/patient.model';

export interface PatientRepository {
  save(patient: Paciente): Promise<Paciente>;
  merge(patient: Paciente, data: DeepPartial<Paciente>): void;

  /**
   * ISSO AQUI É GAMBIARRA
   */
  getDriver(): unknown;
}

export class PatientTypeOrmRepository implements PatientRepository {
  constructor(private readonly repository: Repository<Paciente>) {}

  merge(patient: Paciente, data: Partial<Paciente>): void {
    this.repository.merge(patient, data);
  }

  save(patient: Paciente): Promise<Paciente> {
    return this.repository.save(patient);
  }

  getDriver() {
    return this.repository;
  }
}
