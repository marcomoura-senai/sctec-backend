import { Repository } from 'typeorm';

import { CreatePatientDto } from '../controller/dto/create-patient.dto';
import { Paciente } from '../model/patient.model';
import { PatientRepository } from '../repositories/paciente.repository';

export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  async create(patientData: CreatePatientDto) {
    const newPatient = new Paciente();

    this.patientRepository.merge(newPatient, patientData);

    const patient = await this.patientRepository.save(newPatient);

    return patient;
  }

  list(filter?: { name?: string; cep?: string }): Promise<Paciente[]> {
    return this.patientRepository.find(filter);
  }

  getPatient(id: number): Promise<Paciente | null> {
    return (
      this.patientRepository.getDriver() as Repository<Paciente>
    ).findOneBy({ id });
  }

  async updatePatient(
    id: number,
    data: Partial<Omit<Paciente, 'id'>>,
  ): Promise<Paciente> {
    const patient = await this.getPatient(id);

    if (!patient) {
      throw new Error('Author not found');
    }

    const { nome, idade } = data;

    if (nome) {
      patient.nome = nome;
    }
    if (idade) {
      patient.idade = idade;
    }

    return patient;
  }
}
