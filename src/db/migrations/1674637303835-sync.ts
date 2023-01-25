import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1674637303835 implements MigrationInterface {
    name = 'sync1674637303835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "alerts" (
                "id" SERIAL NOT NULL,
                "date" date,
                "text" character varying,
                CONSTRAINT "PK_60f895662df096bfcdfab7f4b96" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "alerts"
        `);
    }

}
