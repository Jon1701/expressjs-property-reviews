
DROP TABLE IF EXISTS developers;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE developers (
  id                  SERIAL
                      PRIMARY KEY
                      NOT NULL,
  id_hash             UUID
                      NOT NULL
                      DEFAULT uuid_generate_v4(),
  name                VARCHAR(255)
                      NOT NULL,
  address_line1       VARCHAR(255)
                      NOT NULL,
  address_line2       VARCHAR(255),
  address_city        VARCHAR(255)
                      NOT NULL,
  address_state       VARCHAR(255)
                      NOT NULL,
  address_postalcode  VARCHAR(255)
                      NOT NULL,
  address_country     VARCHAR(255)
                      NOT NULL,
  website             VARCHAR(255),
  UNIQUE(id_hash)
);