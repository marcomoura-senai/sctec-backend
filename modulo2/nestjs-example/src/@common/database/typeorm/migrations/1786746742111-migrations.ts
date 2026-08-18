import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1786746742111 implements MigrationInterface {
  name = 'Migrations1786746742111';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "aluno" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "nome" character varying(255) NOT NULL, "plano" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "pk_aluno" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "instrutor" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "nome" character varying(255) NOT NULL, "especialidade" character varying(255) NOT NULL, "registro" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "pk_instrutor" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "idx_instrutor_registro" ON "instrutor"  ("registro") `,
    );
    await queryRunner.query(
      `CREATE TABLE "aula_agendada" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "data_hora" TIMESTAMP WITH TIME ZONE NOT NULL, "duracao" interval NOT NULL, "instrutor_id" integer NOT NULL, "aluno_id" integer NOT NULL, CONSTRAINT "pk_aula_agendada" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_aula_agendada_instrutor_id" ON "aula_agendada"  ("instrutor_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_aula_agendada_aluno_id" ON "aula_agendada"  ("aluno_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "aula_agendada" ADD CONSTRAINT "fk_aula_agendada_instrutor_id" FOREIGN KEY ("instrutor_id") REFERENCES "instrutor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "aula_agendada" ADD CONSTRAINT "fk_aula_agendada_aluno_id" FOREIGN KEY ("aluno_id") REFERENCES "aluno"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "aula_agendada" DROP CONSTRAINT "fk_aula_agendada_aluno_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "aula_agendada" DROP CONSTRAINT "fk_aula_agendada_instrutor_id"`,
    );
    await queryRunner.query(`DROP INDEX "public"."idx_aula_agendada_aluno_id"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_aula_agendada_instrutor_id"`,
    );
    await queryRunner.query(`DROP TABLE "aula_agendada"`);
    await queryRunner.query(`DROP INDEX "public"."idx_instrutor_registro"`);
    await queryRunner.query(`DROP TABLE "instrutor"`);
    await queryRunner.query(`DROP TABLE "aluno"`);
  }
}
