import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1675424156942 implements MigrationInterface {
    name = 'sync1675424156942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "avito_links"
            ADD "isCheck" boolean DEFAULT 'false'
        `);
        await queryRunner.query(`
            ALTER TABLE "avito_links"
            ADD CONSTRAINT "UQ_b5e71f48de00aa2de5a3dc201af" UNIQUE ("href")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "avito_links" DROP CONSTRAINT "UQ_b5e71f48de00aa2de5a3dc201af"
        `);
        await queryRunner.query(`
            ALTER TABLE "avito_links" DROP COLUMN "isCheck"
        `);
    }

}
