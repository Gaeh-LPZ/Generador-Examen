CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    score INT
);

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question TEXT,
    answer TEXT,
    category VARCHAR(50)
);

INSERT INTO users(username, email, password, score)
VALUES
    ('admin', 'admin@gmail.com','jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=', 100);

INSERT INTO questions(question, answer, category)
VALUES
    (
        '¿Qué ventaja principal ofrece el renderizado del lado del servidor (SSR) en Next.js frente al renderizado tradicional en el cliente?',
        'La principal ventaja del SSR en Next.js es que genera el contenido HTML en el servidor antes de enviarlo al navegador. Esto mejora significativamente el rendimiento inicial de la página y el SEO, ya que los motores de búsqueda pueden indexar el contenido más fácilmente y los usuarios ven el contenido más rápido, incluso en conexiones lentas.',
        'Next JS'
    );