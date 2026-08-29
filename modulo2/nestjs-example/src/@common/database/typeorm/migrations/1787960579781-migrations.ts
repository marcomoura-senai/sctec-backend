import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1787960579781 implements MigrationInterface {
  name = 'Migrations1787960579781';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "role" character varying(255) NOT NULL, CONSTRAINT "pk_role" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role_instrutores_instrutor" ("role_id" integer NOT NULL, "instrutor_id" integer NOT NULL, CONSTRAINT "pk_role_instrutores_instrutor" PRIMARY KEY ("role_id", "instrutor_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_role_instrutores_instrutor_role_id" ON "role_instrutores_instrutor"  ("role_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_role_instrutores_instrutor_instrutor_id" ON "role_instrutores_instrutor"  ("instrutor_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "role_instrutores_instrutor" ADD CONSTRAINT "fk_role_instrutores_instrutor_role_id" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_instrutores_instrutor" ADD CONSTRAINT "fk_role_instrutores_instrutor_instrutor_id" FOREIGN KEY ("instrutor_id") REFERENCES "instrutor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_instrutores_instrutor" DROP CONSTRAINT "fk_role_instrutores_instrutor_instrutor_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_instrutores_instrutor" DROP CONSTRAINT "fk_role_instrutores_instrutor_role_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_role_instrutores_instrutor_instrutor_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_role_instrutores_instrutor_role_id"`,
    );
    await queryRunner.query(`DROP TABLE "role_instrutores_instrutor"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
