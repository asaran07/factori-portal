CREATE TABLE IF NOT EXISTS materials (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(50),
    description VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS material_attributes (
    item_id INT,
    attribute_type VARCHAR(20) NOT NULL,
    attribute_value VARCHAR(20) NULL,
    value_num INT NULL,
    FOREIGN KEY (item_id) REFERENCES materials (item_id)
)
