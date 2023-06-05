/*
   create a healthcheck table
*/
CREATE TABLE IF NOT EXISTS healthcheck (
    id bigserial PRIMARY KEY,
    status varchar(8) NOT NULL,
    created_at timestamp DEFAULT current_timestamp
);

/*
    user table

    Primary key is an auto increment integer id, and the email has a unique index on it
*/
CREATE TABLE IF NOT EXISTS "user" (
    id bigserial PRIMARY KEY,
    email varchar(128) NOT NULL,
    name varchar(128) NOT NULL,
    active boolean NOT NULL DEFAULT true,
    joined timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE UNIQUE INDEX user_email ON "user" (email);

/*
    token table
*/
CREATE TABLE IF NOT EXISTS token (
    id bigserial PRIMARY KEY,
    "user" bigint NOT NULL,
    "public" varchar(8) NOT NULL,
    "private" varchar(40) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE UNIQUE INDEX token_user on token ("user");
CREATE UNIQUE INDEX token_pub on token ("public");

