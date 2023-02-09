import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1675421750046 implements MigrationInterface {
    name = 'sync1675421750046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "avito_links" (
                "id" SERIAL NOT NULL,
                "title" character varying,
                "href" character varying,
                CONSTRAINT "PK_8072b46de551466b31e09d8d16c" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "avito_links"
        `);
    }

}
