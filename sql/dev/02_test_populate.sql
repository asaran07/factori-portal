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
  (4, 5, '12', 11);
-- TESTTTIHJGGTGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG