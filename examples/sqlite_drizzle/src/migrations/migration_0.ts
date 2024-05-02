export const migration0 = `
    CREATE TABLE users
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            age INTEGER NOT NULL
        );
`;
