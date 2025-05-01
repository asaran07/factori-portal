-- like a "catalog" of all items that can exist in a factory/inventory.
CREATE TABLE IF NOT EXISTS items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(50) NOT NULL,
    description VARCHAR(50)
);

-- table for the general category of a unit an attribute can have.
-- for example, distance, weight, time etc.
CREATE TABLE IF NOT EXISTS unit_types (
    type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(30) NOT NULL
);

-- this table containts the specific units like meters, inches, kilograms, etc.
CREATE TABLE IF NOT EXISTS unit_definitions (
    unit_id SERIAL PRIMARY KEY,
    unit_name VARCHAR(20) NOT NULL,
    type_id INT,
    -- the foreign key references the `unit_types` table because
    -- the tuples in this table need to fall under a unit category.
    -- for example, kilograms is a `unit_definition` of type 'weight'.
    FOREIGN KEY (type_id) REFERENCES unit_types (type_id)
);

-- this is the actual table the stores the different attributes that
-- can be assigned to different items. for example, the manager
-- could create an attribute of name 'width', which is a 'numeric'
-- value, and of type 'distance'. which is why it's foreign key
-- references the `unit_types` table.
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
