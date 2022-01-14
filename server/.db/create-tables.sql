
DROP TABLE IF EXISTS developers;

CREATE TABLE developers (
  id                  SERIAL
                      PRIMARY KEY
                      NOT NULL,
  id_hash             TEXT
                      NOT NULL
                      DEFAULT concat('developer_', REPLACE(gen_random_uuid()::text, '-', '')),
  name                VARCHAR(255)
                      NOT NULL,
  address_line        VARCHAR(255),
  address_line2       VARCHAR(255),
  address_city        VARCHAR(255),
  address_state       VARCHAR(255),
  address_postalcode  VARCHAR(255),
  address_country     VARCHAR(255),
  website             VARCHAR(255),
  UNIQUE(id_hash)
);