import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1675349677357 implements MigrationInterface {
    name = 'sync1675349677357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "avito_notes" (
                "id" SERIAL NOT NULL,
                "title" character varying,
                "price" character varying,
                "address" character varying,
                "description" character varying,
                "date" character varying,
                CONSTRAINT "PK_f5d66163765398daee6b5680ade" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "avito_notes"
        `);
    }

}
