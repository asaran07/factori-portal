
--1 Join at least three tables using JOIN ON
-- lists all attributes and corresponding unit names for each item 
SELECT i.item_name, a.attribute_name, u.unit_name
FROM item_attributes ia
JOIN items i ON ia.item_id = i.item_id
JOIN attribute_definitions a ON ia.definition_id = a.definition_id
JOIN unit_definitions u ON ia.unit_id = u.unit_id;

--2 Use nested queries with IN, ANY, or ALL and include a GROUP BY clause
-- list number of attributes by item which have been moved in amounts greater than 10
SELECT i.item_name, COUNT(ia.attribute_id) AS attribute_count
FROM items i
JOIN item_attributes ia ON i.item_id = ia.item_id
WHERE i.item_id IN (
    SELECT item_id FROM inventory_transactions WHERE quantity > 10
)
GROUP BY i.item_name
ORDER BY attribute_count DESC;

--3 A correlated subquery with appropriate aliasing
-- list each item currently above 5 units in our inventory alongside the number of times a transaction has been logged with them
SELECT i.item_name, (SELECT COUNT(*) FROM inventory_transactions t WHERE t.item_id = i.item_id) AS transaction_count
FROM items i
WHERE EXISTS (
    SELECT * FROM inventory WHERE inventory.item_id = i.item_id AND inventory.quantity > 5
);

--4 Use a FULL OUTER JOIN
-- list each item, the location its in, and the amount of that item in that location
SELECT i.item_name, l.location_name, inv.quantity
FROM items i
FULL OUTER JOIN inventory inv ON i.item_id = inv.item_id
FULL OUTER JOIN locations l ON inv.location_id = l.location_id;

--5 Use a set operation: UNION, EXCEPT, or INTERSECT (verify DBMS support)
-- selects all items that are in positive amounts in our inventory and are exactly 0.75 meters long
SELECT i.item_name FROM items i
JOIN item_attributes ia ON i.item_id = ia.item_id
JOIN attribute_definitions ad ON ia.definition_id = ad.definition_id
JOIN unit_definitions ud ON ia.unit_id = ud.unit_id
WHERE ad.attribute_name = 'width' AND ud.unit_name = 'meters' AND ia.attribute_value = '0.75' /*pretend that we have meters/cm/etc conversions*/
INTERSECT
SELECT i.item_name FROM items i
JOIN inventory_transactions it ON i.item_id = it.item_id
WHERE it.quantity > 0;


--6–8 Your own non-trivial queries using at least two tables
-- sorts suppliers by amount of items we have from them
SELECT s.supplier_name, SUM(it.quantity) AS total_supplied
FROM suppliers s
JOIN inventory_transactions it ON s.supplier_id = it.supplier_id
GROUP BY s.supplier_name
ORDER BY total_supplied DESC;

--6–8 Your own non-trivial queries using at least two tables
-- selects all items that dont have material attributes
SELECT i.item_name
FROM items i
WHERE NOT EXISTS (
  SELECT 1
  FROM item_attributes ia
  JOIN attribute_definitions ad ON ia.definition_id = ad.definition_id
  WHERE ia.item_id = i.item_id
    AND ad.attribute_name = 'material'
);

--6–8 Your own non-trivial queries using at least two tables
-- selects all unit types and the number of units with that type
SELECT
  ut.type_name,
  COUNT(ud.unit_id) AS num_units
FROM
  unit_types ut
LEFT JOIN unit_definitions ud ON ut.type_id = ud.type_id
GROUP BY ut.type_id, ut.type_name
ORDER BY num_units DESC;

--6–8 Your own non-trivial queries using at least two tables
-- selects all items with width and height and width greater than height
SELECT i.item_name, ia_w.attribute_value AS "Width", ia_h.attribute_value AS "Height"
FROM items i
JOIN item_attributes ia_w ON i.item_id = ia_w.item_id
JOIN attribute_definitions ad_w ON ia_w.definition_id = ad_w.definition_id
JOIN item_attributes ia_h ON i.item_id = ia_h.item_id
JOIN attribute_definitions ad_h ON ia_h.definition_id = ad_h.definition_id
WHERE ad_w.attribute_name = 'width'
  AND ad_h.attribute_name = 'height'
  AND CAST(ia_w.attribute_value AS FLOAT) > CAST(ia_h.attribute_value AS FLOAT);

--9 A non-trivial query using at least three tables
-- finds the inventory quantity of all items with unique attribute values
SELECT i.item_name, a.attribute_name, ia.attribute_value, inv.quantity
FROM items i
JOIN item_attributes ia ON i.item_id = ia.item_id
JOIN attribute_definitions a ON ia.definition_id = a.definition_id
JOIN inventory inv ON i.item_id = inv.item_id
ORDER BY inv.quantity DESC;

--10 A non-trivial query using at least three tables with aliasing/renaming
-- lists all items with inventories > 5, any attributes they have related to width, height, or depth, the value of that attribute, and where theyre stored
SELECT i.item_name AS "Item", a.attribute_name AS "Attribute", ia.attribute_value, l.location_name AS "Location"
FROM items i
JOIN item_attributes ia ON i.item_id = ia.item_id
JOIN attribute_definitions a ON ia.definition_id = a.definition_id
JOIN inventory inv ON i.item_id = inv.item_id
JOIN locations l ON inv.location_id = l.location_id
WHERE inv.quantity > 5
AND a.attribute_name IN ('width', 'height', 'depth');