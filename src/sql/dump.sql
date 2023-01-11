CREATE DATABASE mindfuck_painter;

CREATE TABLE users (
    `id` int NOT NULL AUTO_INCREMENT,
    `username` varchar(16) NOT NULL,
    `password` varchar(255) NOT NULL,
    `joined` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE sketches (
    `id` int NOT NULL AUTO_INCREMENT,
    `sender` int NOT NULL,
    `receiver` int NOT NULL,
    `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`sender`) REFERENCES users(`id`)
);

