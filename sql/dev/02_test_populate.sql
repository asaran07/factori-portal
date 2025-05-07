/* INSERT INTO items
(item_name, description)
VALUES
('Iron Plate', 'a simple iron plate'),
('Copper Plate', 'a simple copper plate'),
('Cardboard', 'a simple copper plate'),
('Copper Wire', 'basic copper wire');

--(name)
INSERT INTO unit_types
(type_name)
VALUES
('Distance'),
('Time'),
('Weight'),
('Mass'),
('Force'),
('Energy'),
('Volume'),
('Area'),
('Moles'),
('Area'),
('Ratio'),
('Unit'),
('Count');

--(name, type_id)
INSERT INTO unit_definitions
(unit_name, type_id)
VALUES
('meters', 1),
('millimeters', 1),
('kilometers', 1),
('kilograms', 4),
('gallons', 7),
('inch', 1),
('gauge', 1),
('%', 11);

--(name, data_type, unit_type, allowed_values)
INSERT INTO attribute_definitions
(attribute_name, data_type, unit_type, allowed_values)
VALUES
('width', 'numeric', 1, ''),
('height', 'numeric', 1, ''),
('depth', 'numeric', 1, ''),
('length', 'numeric', 1, ''),
('thickness', 'numeric', 1, ''),
('volume', 'numeric', 7, ''),
('weight', 'numeric', 3, ''),
('count', 'numeric', 13, ''),
('material', 'string', NULL, ''),
('mass', 'numeric', 4, '');

--(item_id, (attribute)definition_id, value (S), unit_id)
INSERT INTO item_attributes
(item_id, definition_id, attribute_value, unit_id)
VALUES
(1,1,'0.5',1), --iron plates have width, length, and thickness
(1,4,'0.5',1),
(1,5,'1.2',2),
(2,1,'1',1), --copper plates also have width, length, and thickness
(2,4,'1',1),
(2,5,'0.512',2),
(3,1,'0.75',1), --cardboard boxes have width, height, depth, and thickness
(3,2,'0.5',1),
(3,3,'0.75',1),
(3,5,'1',2),
(4,4,'10',1), --copper wires have length and thickness
(4,5,'12',7); */


/* =====================================================
   GROUP 11  •  PART B  •  COMPLETE SAMPLE DATA
   ===================================================== */

/* ---------- 1. unit_types  (10 rows) ---------- */
INSERT INTO unit_types (type_name) VALUES
  ('Distance'),
  ('Time'),
  ('Weight'),
  ('Mass'),
  ('Force'),
  ('Energy'),
  ('Volume'),
  ('Area'),
  ('Ratio'),
  ('Unit');

/* ---------- 2. unit_definitions  (11 rows) ---------- */
INSERT INTO unit_definitions (unit_name, type_id) VALUES
 ('meters',      (SELECT type_id FROM unit_types WHERE type_name='Distance')),
 ('millimeters', (SELECT type_id FROM unit_types WHERE type_name='Distance')),
 ('kilometers',  (SELECT type_id FROM unit_types WHERE type_name='Distance')),
 ('inch',        (SELECT type_id FROM unit_types WHERE type_name='Distance')),
 ('gauge',       (SELECT type_id FROM unit_types WHERE type_name='Distance')),
 ('seconds',     (SELECT type_id FROM unit_types WHERE type_name='Time')),
 ('kilograms',   (SELECT type_id FROM unit_types WHERE type_name='Mass')),
 ('grams',       (SELECT type_id FROM unit_types WHERE type_name='Mass')),
 ('newtons',     (SELECT type_id FROM unit_types WHERE type_name='Force')),
 ('gallons',     (SELECT type_id FROM unit_types WHERE type_name='Volume')),
 ('liters',      (SELECT type_id FROM unit_types WHERE type_name='Volume'));

/* ---------- 3. attribute_definitions  (10 rows) ---------- */
INSERT INTO attribute_definitions
  (attribute_name, data_type, unit_type, allowed_values) VALUES
 ('width',     'numeric',(SELECT type_id FROM unit_types WHERE type_name='Distance'), ''),
 ('height',    'numeric',(SELECT type_id FROM unit_types WHERE type_name='Distance'), ''),
 ('depth',     'numeric',(SELECT type_id FROM unit_types WHERE type_name='Distance'), ''),
 ('length',    'numeric',(SELECT type_id FROM unit_types WHERE type_name='Distance'), ''),
 ('thickness', 'numeric',(SELECT type_id FROM unit_types WHERE type_name='Distance'), ''),
 ('volume',    'numeric',(SELECT type_id FROM unit_types WHERE type_name='Volume'),   ''),
 ('weight',    'numeric',(SELECT type_id FROM unit_types WHERE type_name='Weight'),   ''),
 ('count',     'numeric', NULL,                                                       ''),
 ('material',  'string',  NULL,                                                       ''),
 ('mass',      'numeric',(SELECT type_id FROM unit_types WHERE type_name='Mass'),     '');

/* ---------- 4. items  (10 rows) ---------- */
INSERT INTO items (item_name, description) VALUES
 ('Iron Plate',     'simple iron plate'),
 ('Copper Plate',   'simple copper plate'),
 ('Cardboard Box',  'corrugated shipping box'),
 ('Copper Wire',    'standard copper wire'),
 ('Steel Rod',      'round steel rod'),
 ('Plastic Sheet',  'polycarbonate sheet'),
 ('Glass Pane',     'tempered glass pane'),
 ('Aluminum Foil',  'rolled aluminum foil'),
 ('Rubber Gasket',  'synthetic rubber gasket'),
 ('Brass Hex Nut',  'brass hex nut');

/* ---------- 5. item_attributes  (14 rows) ---------- */
INSERT INTO item_attributes (item_id, definition_id, attribute_value, unit_id) VALUES
 -- Iron Plate
 ((SELECT item_id FROM items WHERE item_name='Iron Plate'),
  (SELECT definition_id FROM attribute_definitions WHERE attribute_name='width'),'0.5',
  (SELECT unit_id FROM unit_definitions WHERE unit_name='meters')),
 ((SELECT item_id FROM items WHERE item_name='Iron Plate'),
  (SELECT definition_id FROM attribute_definitions WHERE attribute_name='length'),'0.5',
  (SELECT unit_id FROM unit_definitions WHERE unit_name='meters')),
 ((SELECT item_id FROM items WHERE item_name='Iron Plate'),
  (SELECT definition_id FROM attribute_definitions WHERE attribute_name='thickness'),'12',
  (SELECT unit_id FROM unit_definitions WHERE unit_name='millimeters')),

 -- Copper Plate
 ((SELECT item_id FROM items WHERE item_name='Copper Plate'),
  (SELECT definition_id FROM attribute_definitions WHERE attribute_name='width'),'1.0',
  (SELECT unit_id FROM unit_definitions WHERE unit_name='meters')),
 ((SELECT item_id FROM items WHERE item_name='Copper Plate'),
  (SELECT definition_id FROM attribute_definitions WHERE attribute_name='length'),'1.0',
  (SELECT unit_id FROM unit_definitions WHERE unit_name='meters')),
 ((SELECT item_id FROM items WHERE item_name='Copper Plate'),
  (SELECT definition_id FROM attribute_definitions WHERE attribute_name='thickness'),'0.512',
  (SELECT unit_id FROM unit_definitions WHERE unit_name='millimeters')),

 -- Cardboard Box
 ((SELECT item_id FROM items WHERE item_name='Cardboard Box'),
  (SELECT definition_id FROM attribute_definitions WHERE attribute_name='width'),'0.75',
  (SELECT unit_id FROM unit_definitions WHERE unit_name='meters')),
 ((SELECT item_id FROM items WHERE item_name='Cardboard Box'),
  (SELECT definition_id FROM attribute_definitions WHERE attribute_name='height'),'0.50',
  (SELECT unit_id FROM unit_definitions WHERE unit_name='meters')),
 ((SELECT item_id FROM items WHERE item_name='Cardboard Box'),
  (SELECT definition_id FROM attribute_definitions WHERE attribute_name='depth'),'0.75',
  (SELECT unit_id FROM unit_definitions WHERE unit_name='meters')),
 ((SELECT item_id FROM items WHERE item_name='Cardboard Box'),
  (SELECT definition_id FROM attribute_definitions WHERE attribute_name='thickness'),'1',
  (SELECT unit_id FROM unit_definitions WHERE unit_name='millimeters')),

 -- Copper Wire
 ((SELECT item_id FROM items WHERE item_name='Copper Wire'),
  (SELECT definition_id FROM attribute_definitions WHERE attribute_name='length'),'10',
  (SELECT unit_id FROM unit_definitions WHERE unit_name='meters')),
 ((SELECT item_id FROM items WHERE item_name='Copper Wire'),
  (SELECT definition_id FROM attribute_definitions WHERE attribute_name='thickness'),'12',
  (SELECT unit_id FROM unit_definitions WHERE unit_name='gauge')),

 -- Steel Rod
 ((SELECT item_id FROM items WHERE item_name='Steel Rod'),
  (SELECT definition_id FROM attribute_definitions WHERE attribute_name='mass'),'2.5',
  (SELECT unit_id FROM unit_definitions WHERE unit_name='kilograms')),
 ((SELECT item_id FROM items WHERE item_name='Steel Rod'),
  (SELECT definition_id FROM attribute_definitions WHERE attribute_name='material'),'carbon steel',NULL);

/* ---------- 6. locations  (10 rows) ---------- */
INSERT INTO locations (location_name, location_description) VALUES
 ('Rack A-01','Receiving bay rack 1'),
 ('Rack A-02','Receiving bay rack 2'),
 ('Aisle B-01','Main aisle level 1'),
 ('Aisle B-02','Main aisle level 2'),
 ('Shelf C-Top','Small-parts shelf top'),
 ('Shelf C-Mid','Small-parts shelf middle'),
 ('Shelf C-Low','Small-parts shelf bottom'),
 ('Floor Stock','Bulk pallets on floor'),
 ('QC Hold','Quality-control hold area'),
 ('Returns','Returned-goods staging');

/* ---------- 7. suppliers  (10 rows) ---------- */
INSERT INTO suppliers (supplier_name) VALUES
 ('ABC Supply'), ('Main Metal'), ('Plastic Co'), ('Bright Parts'), ('Bolt Bros'),
 ('ChemCorp'), ('FluidWorks'), ('Sunrise Parts'), ('Northwind Freight'), ('Evergreen Steel');

/* ---------- 8. inventory  (10 rows) ---------- */
INSERT INTO inventory (item_id, location_id, quantity) VALUES
 ((SELECT item_id FROM items WHERE item_name='Iron Plate'),
  (SELECT location_id FROM locations WHERE location_name='Rack A-01'),250),
 ((SELECT item_id FROM items WHERE item_name='Copper Plate'),
  (SELECT location_id FROM locations WHERE location_name='Rack A-02'),1800),
 ((SELECT item_id FROM items WHERE item_name='Cardboard Box'),
  (SELECT location_id FROM locations WHERE location_name='Aisle B-02'),725),
 ((SELECT item_id FROM items WHERE item_name='Copper Wire'),
  (SELECT location_id FROM locations WHERE location_name='Shelf C-Mid'),5400),
 ((SELECT item_id FROM items WHERE item_name='Steel Rod'),
  (SELECT location_id FROM locations WHERE location_name='Aisle B-01'),1200),
 ((SELECT item_id FROM items WHERE item_name='Plastic Sheet'),
  (SELECT location_id FROM locations WHERE location_name='Shelf C-Top'),90),
 ((SELECT item_id FROM items WHERE item_name='Glass Pane'),
  (SELECT location_id FROM locations WHERE location_name='Shelf C-Low'),450),
 ((SELECT item_id FROM items WHERE item_name='Aluminum Foil'),
  (SELECT location_id FROM locations WHERE location_name='Floor Stock'),320),
 ((SELECT item_id FROM items WHERE item_name='Rubber Gasket'),
  (SELECT location_id FROM locations WHERE location_name='QC Hold'),60),
 ((SELECT item_id FROM items WHERE item_name='Brass Hex Nut'),
  (SELECT location_id FROM locations WHERE location_name='Returns'),900);

/* ---------- 9. inventory_transactions  (10 rows) ---------- */
INSERT INTO inventory_transactions
  (item_id, location_id, quantity, transaction_description, supplier_id) VALUES
 ((SELECT item_id FROM items WHERE item_name='Iron Plate'),
  (SELECT location_id FROM locations WHERE location_name='Rack A-01'),50,'RECEIPT PO-1042',
  (SELECT supplier_id FROM suppliers WHERE supplier_name='ABC Supply')),
 ((SELECT item_id FROM items WHERE item_name='Copper Plate'),
  (SELECT location_id FROM locations WHERE location_name='Rack A-02'),-120,'SHIPMENT SO-8897',NULL),
 ((SELECT item_id FROM items WHERE item_name='Cardboard Box'),
  (SELECT location_id FROM locations WHERE location_name='Aisle B-02'),75,'RECEIPT PO-1048', NULL)

INSERT INTO inventory_records
  (item_id, location_id, quantity, date_of_count) VALUES
 ((SELECT item_id FROM items WHERE item_name='Iron Plate'),
  (SELECT location_id FROM locations WHERE location_name='Rack A-01'),
  255,'2025-04-15 09:00:00'),

 ((SELECT item_id FROM items WHERE item_name='Copper Plate'),
  (SELECT location_id FROM locations WHERE location_name='Rack A-02'),
  1675,'2025-04-16 14:30:00'),

 ((SELECT item_id FROM items WHERE item_name='Cardboard Box'),
  (SELECT location_id FROM locations WHERE location_name='Aisle B-02'),
  720,'2025-04-17 10:15:00'),

 ((SELECT item_id FROM items WHERE item_name='Copper Wire'),
  (SELECT location_id FROM locations WHERE location_name='Shelf C-Mid'),
  4800,'2025-04-18 08:45:00'),

 ((SELECT item_id FROM items WHERE item_name='Steel Rod'),
  (SELECT location_id FROM locations WHERE location_name='Aisle B-01'),
  1150,'2025-04-18 15:20:00'),

 ((SELECT item_id FROM items WHERE item_name='Plastic Sheet'),
  (SELECT location_id FROM locations WHERE location_name='Shelf C-Top'),
  95,'2025-04-19 11:10:00'),

 ((SELECT item_id FROM items WHERE item_name='Glass Pane'),
  (SELECT location_id FROM locations WHERE location_name='Shelf C-Low'),
  460,'2025-04-20 13:55:00'),

 ((SELECT item_id FROM items WHERE item_name='Aluminum Foil'),
  (SELECT location_id FROM locations WHERE location_name='Floor Stock'),
  318,'2025-04-21 09:40:00'),

 ((SELECT item_id FROM items WHERE item_name='Rubber Gasket'),
  (SELECT location_id FROM locations WHERE location_name='QC Hold'),
  59,'2025-04-21 16:05:00'),

 ((SELECT item_id FROM items WHERE item_name='Brass Hex Nut'),
  (SELECT location_id FROM locations WHERE location_name='Returns'),
  890,'2025-04-22 10:00:00');