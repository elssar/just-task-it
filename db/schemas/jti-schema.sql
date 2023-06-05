/*
   create a healthcheck table
*/
CREATE TABLE IF NOT EXISTS healthcheck (
    id bigserial PRIMARY KEY,
    status varchar(8) NOT NULL,
    created_at timestamp DEFAULT current_timestamp
);

