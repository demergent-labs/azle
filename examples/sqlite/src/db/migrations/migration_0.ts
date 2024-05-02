export const migration0 = `
    CREATE TABLE users
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        age INTEGER NOT NULL
    );

    CREATE TABLE posts
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
`;
