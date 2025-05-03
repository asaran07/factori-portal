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


-- Part B: Sample Data Population

-- Table: items
INSERT INTO items (item_name, description) VALUES
  ('Iron Plate',     'a simple iron plate'),
  ('Copper Plate',   'a simple copper plate'),
  ('Cardboard Box',  'a simple cardboard box'),
  ('Copper Wire',    'basic copper wire'),
  ('Steel Rod',      'a simple steel rod'),
  ('Plastic Sheet',  'a sheet of plastic'),
  ('Glass Pane',     'a standard glass pane'),
  ('Aluminum Foil',  'a sheet of aluminum foil'),
  ('Rubber Gasket',  'a basic rubber gasket'),
  ('Brass Hex Nut',  'a brass hex nut');

-- Table: unit_types
INSERT INTO unit_types (type_name) VALUES
  ('Distance'),
  ('Time'),
  ('Weight'),
  ('Mass'),
  ('Force'),
  ('Energy'),
  ('Volume'),
  ('Area'),
  ('Moles'),
  ('Ratio'),
  ('Unit'),
  ('Count');

-- Table: unit_definitions
INSERT INTO unit_definitions (unit_name, type_id) VALUES
  ('meters',      1),
  ('millimeters', 1),
  ('kilometers',  1),
  ('inch',        1),
  ('gauge',       1),
  ('seconds',     2),
  ('kilograms',   4),
  ('grams',       4),
  ('newtons',     5),
  ('gallons',     7),
  ('liters',      7),
  ('%',           11);

-- Table: attribute_definitions
INSERT INTO attribute_definitions (attribute_name, data_type, unit_type, allowed_values) VALUES
  ('width',     'numeric', 1,  ''),
  ('height',    'numeric', 1,  ''),
  ('depth',     'numeric', 1,  ''),
  ('length',    'numeric', 1,  ''),
  ('thickness', 'numeric', 1,  ''),
  ('volume',    'numeric', 7,  ''),
  ('weight',    'numeric', 3,  ''),
  ('count',     'numeric', 12, ''),
  ('material',  'string',  NULL, ''),
  ('mass',      'numeric', 4,  '');

-- Table: item_attributes
INSERT INTO item_attributes (item_id, definition_id, attribute_value, unit_id) VALUES
  -- Iron Plate
  (1, 1, '0.5', 1),
  (1, 4, '0.5', 1),
  (1, 5, '1.2', 2),
  -- Copper Plate
  (2, 1, '1.0', 1),
  (2, 4, '1.0', 1),
  (2, 5, '0.512', 2),
  -- Cardboard Box
  (3, 1, '0.75', 1),
  (3, 2, '0.50', 1),
  (3, 3, '0.75', 1),
  (3, 5, '1.00', 2),
  -- Copper Wire
  (4, 4, '10', 1),
<<<<<<< HEAD
  (4, 5, '12', 11);

-- ----------  locations  ----------
INSERT INTO locations (location_id, location_name, location_description) VALUES
  (1, 'Seattle Warehouse',      'Primary distribution center ‑ Puget Sound'),
  (2, 'Portland Depot',         'Regional bulk storage'),
  (3, 'San Francisco Store',    'Retail storefront & micro‑DC'),
  (4, 'Los Angeles Warehouse',  'Southern CA hub'),
  (5, 'Denver Hub',             'Mountain region cross‑dock'),
  (6, 'Chicago DC',             'Midwest fulfillment center'),
  (7, 'New York Fulfillment',   'Northeast last‑mile hub'),
  (8, 'Dallas Depot',           'South‑central distribution'),
  (9, 'Miami Cross‑dock',       'Southeast gateway'),
  (10,'Atlanta Spares',         'Warranty & returns stock');

-- ----------  suppliers  ----------
INSERT INTO suppliers (supplier_id, supplier_name) VALUES
  (1, 'Acme Industrial Co.'),
  (2, 'Global Metals Ltd.'),
  (3, 'Pacific Plastics Inc.'),
  (4, 'Bright Electrics LLC'),
  (5, 'Frontier Fasteners'),
  (6, 'Continental Chemicals'),
  (7, 'Hydro‑Tech Fluids'),
  (8, 'Sunrise Components'),
  (9, 'Northwind Logistics'),
  (10,'Evergreen Steel Works');

-- ----------  inventory  ----------
-- current on‑hand counts per item & location
INSERT INTO inventory (inventory_id, item_id, location_id, quantity) VALUES
  (1, 1, 1,   250.0),   -- Steel Beam @ Seattle
  (2, 2, 2,  1800.0),   -- Copper Wire @ Portland
  (3, 3, 4,   725.0),   -- Aluminum Sheet @ LA
  (4, 4, 6,  5400.0),   -- Hex Bolt @ Chicago
  (5, 5, 3,  1200.0),   -- Plastic Pellets @ SF
  (6, 6, 5,    90.0),   -- Li‑ion Battery Pack @ Denver
  (7, 7, 7,   450.0),   -- LED Module @ New York
  (8, 8, 8,   320.0),   -- Thermal Paste @ Dallas
  (9, 9, 9,    60.0),   -- Gearbox @ Miami
  (10,10,10,  900.0);   -- Hydraulic Fluid @ Atlanta



--SAMPLE ROWS
-- ----------  inventory_transactions  ----------
-- positive qty = receipt, negative = shipment/adjustment
INSERT INTO inventory_transactions
    (transaction_id, item_id, location_id, quantity, transaction_description, supplier_id)
VALUES
  (1, 1, 1,  +50.0,  'RECEIPT PO‑1042',        1),
  (2, 2, 2, −120.0,  'SHIPMENT SO‑8897',       NULL),
  (3, 3, 4,  +75.0,  'RECEIPT PO‑1048',        2),
  (4, 4, 6, −600.0,  'SHIPMENT SO‑8905',       NULL),
  (5, 5, 3,  −50.0,  'ADJUSTMENT CYCLE‑CNT',   NULL),
  (6, 6, 5,  +30.0,  'RECEIPT PO‑1051',        6),
  (7, 7, 7, −200.0,  'SHIPMENT SO‑8918',       NULL),
  (8, 8, 8,  +40.0,  'RECEIPT PO‑1053',        4),
  (9, 9, 9,  −10.0,  'ADJUSTMENT DAMAGE',      NULL),
  (10,10,10, +300.0, 'RECEIPT PO‑1055',        7);

-- ----------  inventory_records  ----------
-- snapshots from recent physical counts
INSERT INTO inventory_records
    (record_id, item_id, location_id, quantity, date_of_count)
VALUES
  (1, 1, 1,  255.0, '2025‑04‑15 09:00:00'),
  (2, 2, 2, 1675.0, '2025‑04‑16 14:30:00'),
  (3, 3, 4,  720.0, '2025‑04‑17 10:15:00'),
  (4, 4, 6, 4800.0, '2025‑04‑18 08:45:00'),
  (5, 5, 3, 1150.0, '2025‑04‑18 15:20:00'),
  (6, 6, 5,   95.0, '2025‑04‑19 11:10:00'),
  (7, 7, 7,  460.0, '2025‑04‑20 13:55:00'),
  (8, 8, 8,  318.0, '2025‑04‑21 09:40:00'),
  (9, 9, 9,   59.0, '2025‑04‑21 16:05:00'),
  (10,10,10,890.0, '2025‑04‑22 10:00:00');


  -- ----------  inventory  ----------
-- current on‑hand counts per item & location
INSERT INTO inventory (inventory_id, item_id, location_id, quantity) VALUES
  (1, 1, 1,   250.0),   -- Steel Beam @ Seattle
  (2, 2, 2,  1800.0),   -- Copper Wire @ Portland
  (3, 3, 4,   725.0),   -- Aluminum Sheet @ LA
  (4, 4, 6,  5400.0),   -- Hex Bolt @ Chicago
  (5, 5, 3,  1200.0),   -- Plastic Pellets @ SF
  (6, 6, 5,    90.0),   -- Li‑ion Battery Pack @ Denver
  (7, 7, 7,   450.0),   -- LED Module @ New York
  (8, 8, 8,   320.0),   -- Thermal Paste @ Dallas
  (9, 9, 9,    60.0),   -- Gearbox @ Miami
  (10,10,10,  900.0);   -- Hydraulic Fluid @ Atlanta

-- ----------  inventory_transactions  ----------
-- positive qty = receipt, negative = shipment/adjustment
INSERT INTO inventory_transactions
    (transaction_id, item_id, location_id, quantity, transaction_description, supplier_id)
VALUES
  (1, 1, 1,  +50.0,  'RECEIPT PO‑1042',        1),
  (2, 2, 2, −120.0,  'SHIPMENT SO‑8897',       NULL),
  (3, 3, 4,  +75.0,  'RECEIPT PO‑1048',        2),
  (4, 4, 6, −600.0,  'SHIPMENT SO‑8905',       NULL),
  (5, 5, 3,  −50.0,  'ADJUSTMENT CYCLE‑CNT',   NULL),
  (6, 6, 5,  +30.0,  'RECEIPT PO‑1051',        6),
  (7, 7, 7, −200.0,  'SHIPMENT SO‑8918',       NULL),
  (8, 8, 8,  +40.0,  'RECEIPT PO‑1053',        4),
  (9, 9, 9,  −10.0,  'ADJUSTMENT DAMAGE',      NULL),
  (10,10,10, +300.0, 'RECEIPT PO‑1055',        7);

-- ----------  inventory_records  ----------
-- snapshots from recent physical counts
INSERT INTO inventory_records
    (record_id, item_id, location_id, quantity, date_of_count)
VALUES
  (1, 1, 1,  255.0, '2025‑04‑15 09:00:00'),
  (2, 2, 2, 1675.0, '2025‑04‑16 14:30:00'),
  (3, 3, 4,  720.0, '2025‑04‑17 10:15:00'),
  (4, 4, 6, 4800.0, '2025‑04‑18 08:45:00'),
  (5, 5, 3, 1150.0, '2025‑04‑18 15:20:00'),
  (6, 6, 5,   95.0, '2025‑04‑19 11:10:00'),
  (7, 7, 7,  460.0, '2025‑04‑20 13:55:00'),
  (8, 8, 8,  318.0, '2025‑04‑21 09:40:00'),
  (9, 9, 9,   59.0, '2025‑04‑21 16:05:00'),
  (10,10,10,890.0, '2025‑04‑22 10:00:00');
=======
  (4, 5, '12', 11),
  -- Glass Pane
  (7, 1, '10', 1),
  (7, 2, '8', 1);
-- TESTTTIHJGGTGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
>>>>>>> f2d36f4050ba85e5d244f9e0384a85fcda78d42a
