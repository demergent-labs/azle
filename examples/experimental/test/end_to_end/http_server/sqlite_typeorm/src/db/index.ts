import initSqlJs, { Database } from 'sql.js/dist/sql-asm.js';
import { DataSource } from 'typeorm';

import { Post } from '../entities/posts/db';
import { User } from '../entities/users/db';

// TODO figure out migrations
export async function initDb(
    bytes: Uint8Array = Uint8Array.from([])
): Promise<Database> {
    const AppDataSource = new DataSource({
        type: 'sqljs',
        synchronize: true, // TODO we should figure out real migrations for people
        entities: [Post, User],
        driver: await initSqlJs({}),
        database: bytes
    });

    const _appDataSource = await AppDataSource.initialize();

    return _appDataSource.driver as unknown as Database;
}
