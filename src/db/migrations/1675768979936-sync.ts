import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1675768979936 implements MigrationInterface {
    name = 'sync1675768979936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "avito_links"
                RENAME COLUMN "href" TO "path"
        `);
        await queryRunner.query(`
            ALTER TABLE "avito_links"
            ALTER COLUMN "isCheck"
            SET DEFAULT 'false'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "avito_links"
            ALTER COLUMN "isCheck"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "avito_links"
                RENAME COLUMN "path" TO "href"
        `);
    }

}
