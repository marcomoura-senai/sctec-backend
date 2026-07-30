import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import type { Request, Response } from 'express';

import * as patientService from '../service/patient.service';
import { PatientService } from '../service/patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';

export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  async create(req: Request, res: Response) {
    const body: unknown = req.body;

    const createPatientDto = plainToClass(CreatePatientDto, body);

    await validateOrReject(createPatientDto);

    const patient = await this.patientService.create(createPatientDto);

    res.status(201).json({
      message: 'Author created successfully',
      data: patient,
    });
  }

  async list(req: Request, res: Response) {
    const { nome } = req.query;

    if (nome && typeof nome !== 'string') {
      return res.status(400).json({
        message: 'query param "nome" must be a string',
      });
    }

    const patients = await this.patientService.list({ name: nome });

    res.json(patients);
  }
}

export function getPatient(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: 'Id is required',
    });
  }

  if (Number.isNaN(Number(id))) {
    return res.status(400).json({
      message: 'Id must be a number',
    });
  }

  const patient = patientService.getPatient(Number(id));

  if (!patient) {
    return res.status(404).json({
      message: 'Author not found',
    });
  }

  res.json(patient);
}

export function updatePatient(req: Request, res: Response) {
  const body: unknown = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: 'Id is required',
    });
  }

  if (Number.isNaN(Number(id))) {
    return res.status(400).json({
      message: 'Id must be a number',
    });
  }

  if (!body) {
    return res.status(400).json({
      message: 'Body is required',
    });
  }

  if (typeof body !== 'object') {
    return res.status(400).json({
      message: 'Body must be an object',
    });
  }

  if ('nome' in body && typeof body.nome !== 'string') {
    return res.status(400).json({
      message: 'property "nome" must be a string',
    });
  }

  if ('idade' in body && typeof body.idade !== 'number') {
    return res.status(400).json({
      message: 'property "idade" must be a number',
    });
  }

  try {
    const patient = patientService.updatePatient(Number(id), body);

    res.status(201).json({
      message: 'Author updated successfully',
      data: patient,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Author not found') {
        return res.status(404).json({
          message: 'Author not found',
        });
      }
    }
    throw error;
  }
}
