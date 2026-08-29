import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1787956683335 implements MigrationInterface {
  name = 'Migrations1787956683335';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "aluno" ADD "created_by_instrutor_id" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "aluno" DROP COLUMN "created_by_instrutor_id"`,
    );
  }
}
