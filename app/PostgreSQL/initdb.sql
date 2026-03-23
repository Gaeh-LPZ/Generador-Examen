CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    score INT,
    role VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    questions TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    options JSONB NOT NULL,
    explanation TEXT NOT NULL
);

INSERT INTO users(username, email, password, score, role)
VALUES
    ('admin', 'admin@gmail.com','$2b$10$hS1QFYHeY/.8lfqpnSRBruHihFN0wYrplENwDvRHCbBbxjPDV7/VG', 100, 'ADMIN');

