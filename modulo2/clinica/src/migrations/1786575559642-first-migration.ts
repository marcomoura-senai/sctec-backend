import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMedic1786575559642 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "medico" (
        "id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "crm" VARCHAR(255) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "medico"`);
  }
}
