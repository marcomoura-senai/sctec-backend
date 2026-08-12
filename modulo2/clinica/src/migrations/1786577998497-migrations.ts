import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1786577998497 implements MigrationInterface {
  name = 'Migrations1786577998497';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "paciente" ADD "teste" character(8) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "paciente" DROP COLUMN "teste"`);
  }
}
