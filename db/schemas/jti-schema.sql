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
    "private" varchar(255) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE UNIQUE INDEX token_user ON token ("user");
CREATE UNIQUE INDEX token_pub ON token ("public");

/*
  todo list
*/
CREATE TABLE IF NOT EXISTS list (
    id bigserial PRIMARY KEY,
    "user" bigint NOT NULL,
    name varchar(32),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE UNIQUE INDEX user_list ON list ("user", name);

/*
    todo
*/
CREATE TABLE IF NOT EXISTS todo (
    id bigserial PRIMARY KEY,
    "user" bigint NOT NULL,
    list bigint,
    due_by timestamp NOT NULL,
    done_at timestamp NOT NULL,
    title varchar(64) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE INDEX todo_user ON todo ("user");
CREATE INDEX todo_list ON todo (list);
CREATE INDEX due ON todo (due_by);
CREATE INDEX done ON todo (done_at);

