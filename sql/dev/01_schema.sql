CREATE TABLE IF NOT EXISTS items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(50),
    description VARCHAR(50)
);


CREATE TABLE IF NOT EXISTS unit_types (
    type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS unit_definitions (
    unit_id SERIAL PRIMARY KEY, 
    unit_name VARCHAR(20) NOT NULL,
    type_id INT,

    FOREIGN KEY (type_id) REFERENCES unit_types (type_id)
);

CREATE TABLE IF NOT EXISTS attribute_definitions (
    definition_id SERIAL PRIMARY KEY,
    attribute_name VARCHAR(50) NOT NULL,
    data_type VARCHAR(50) NULL,
    unit_type INT,
    allowed_values VARCHAR(50) NULL,

    FOREIGN KEY (unit_type) REFERENCES unit_types (type_id)
);

CREATE TABLE IF NOT EXISTS item_attributes (
    attribute_id SERIAL PRIMARY KEY,
    item_id INT,
    definition_id INT,
    attribute_value VARCHAR(20) NULL,
    unit_id INT,
    FOREIGN KEY (item_id) REFERENCES items (item_id),
    FOREIGN KEY (definition_id) REFERENCES attribute_definitions (definition_id),
    FOREIGN KEY (unit_id) REFERENCES unit_definitions (unit_id)
);

-- everything past here is identical for every idea


CREATE TABLE IF NOT EXISTS locations (
    location_id SERIAL PRIMARY KEY,
    location_name VARCHAR(50), 
    location_description VARCHAR(50)
);


CREATE TABLE IF NOT EXISTS suppliers (
    supplier_id SERIAL PRIMARY KEY,
    supplier_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS inventory_transactions (
    transaction_id SERIAL PRIMARY KEY,
    item_id INT,
    location_id INT,
    quantity FLOAT,
    transaction_description VARCHAR(50),
    supplier_id INT,
    FOREIGN KEY (item_id) REFERENCES items (item_id),
    FOREIGN KEY (location_id) REFERENCES locations (location_id), --probably nullable
    FOREIGN KEY (supplier_id) REFERENCES suppliers (supplier_id) -- CAN be null, not all transactions do this
);

-- only exists because we may want to have counts per item per location
CREATE TABLE IF NOT EXISTS inventory (
    inventory_id SERIAL PRIMARY KEY,
    item_id INT, 
    location_id INT,
    quantity FLOAT,
    FOREIGN KEY (item_id) REFERENCES items (item_id),
    FOREIGN KEY (location_id) REFERENCES locations (location_id)
);

CREATE TABLE IF NOT EXISTS inventory_records (
    record_id SERIAL PRIMARY KEY,
    item_id INT,
    location_id INT,
    quantity FLOAT,
    date_of_count TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES items (item_id),
    FOREIGN KEY (location_id) REFERENCES locations (location_id)
);