CREATE DATABASE mindfuck_painter;

CREATE TABLE users (
    `uuid` varchar(36) NOT NULL,
    `username` varchar(16) NOT NULL,
    `password` varchar(255) NOT NULL,
    `joined` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`uuid`)
);

CREATE TABLE sketches (
    `uuid` varchar(36) NOT NULL,
    `sender` varchar(36) NOT NULL,
    `receiver` int NOT NULL,
    `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`uuid`),
    FOREIGN KEY (`sender`) REFERENCES users(`uuid`)
);

CREATE TABLE relationships (
    `uuid` varchar(36) NOT NULL,
    `user_uuid` varchar(36) NOT NULL,
    `friend_uuid` varchar(36) NOT NULL,
    `type` BOOLEAN,
    `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_uuid`, `friend_uuid`),
    FOREIGN KEY (`user_uuid`) REFERENCES users(`uuid`),
    FOREIGN KEY (`friend_uuid`) REFERENCES users(`uuid`)
);