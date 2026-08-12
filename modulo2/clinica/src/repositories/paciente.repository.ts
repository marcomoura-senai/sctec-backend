import { DeepPartial, Like, Repository } from 'typeorm';

import { Paciente } from '../model/patient.model';

export interface PatientRepository {
  save(patient: Paciente): Promise<Paciente>;
  merge(patient: Paciente, data: DeepPartial<Paciente>): void;
  find(filters?: { name?: string; cep?: string }): Promise<Paciente[]>;
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

  findPatientByNomeWithEndereco(nome: string): Promise<Paciente[]> {
    return this.repository.find({
      where: {
        nome: Like(`%${nome}%`),
      },
      relations: { enderecos: true },
    });
  }

  find(filters?: { name?: string; cep?: string }): Promise<Paciente[]> {
    const { name, cep } = filters ?? {};

    const queryBuilder = this.repository.createQueryBuilder('patient');

    // SELECT p.id, p.nome, p.idade, p.dataNascimento FROM paciente p
    queryBuilder
      .select(['p.id', 'p.nome', 'p.idade', 'p.dataNascimento'])
      .from(Paciente, 'p');

    if (name) {
      queryBuilder.andWhere('p.nome LIKE :name', { name: `%${name}%` });
    }

    if (cep) {
      // INNER JOIN endereco e ON e.pacienteId = p.id AND e.cep = :cep
      queryBuilder.innerJoin('p.enderecos', 'e', 'e.cep = :cep', {
        cep,
      });
    }

    return queryBuilder.getMany();
  }

  getDriver(): Repository<Paciente> {
    return this.repository;
  }
}
