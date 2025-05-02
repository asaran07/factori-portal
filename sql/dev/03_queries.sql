

--SQL Query 1: Computes a join of at least three tables (must use JOIN ON)
-- select everything in item_attributes and replace the foreign keys with the corresponding names in the other tables
SELECT
  i.item_name,
  ad.attribute_name,
  ia.attribute_value,
  ud.unit_name
FROM
  items i
JOIN item_attributes ia       ON i.item_id = ia.item_id
JOIN attribute_definitions ad ON ia.definition_id = ad.definition_id
LEFT JOIN unit_definitions ud ON ia.unit_id = ud.unit_id
ORDER BY i.item_id, ad.attribute_name;


--SQL Query 2: Uses nested queries with the IN, ANY or ALL operator and uses a GROUP BY clause
-- select every item with the attributes of width and height and print those values alongside the item name
select i.item_name, width.attribute_value AS "Item Width", height.attribute_value AS "Item Height"
FROM items i
JOIN (
  SELECT ia1.item_id, ia1.attribute_value
  FROM item_attributes ia1
  JOIN attribute_definitions ad1 ON ia1.definition_id = ad1.definition_id
  WHERE ad1.attribute_name = 'width'
) width ON i.item_id = width.item_id
JOIN (
  SELECT ia2.item_id, ia2.attribute_value
  FROM item_attributes ia2
  JOIN attribute_definitions ad2 ON ia2.definition_id = ad2.definition_id
  WHERE ad2.attribute_name = 'height'
) height ON i.item_id = height.item_id
GROUP BY i.item_name, width.attribute_value, height.attribute_value;

--SQL Query 3: A correlated nested query with proper aliasing applied
-- selects every item with the attribute of thickness measured in millimeters
--INSUFFICIENT
SELECT
  i.item_name,
  ia.attribute_value,
  ud.unit_name
FROM
  items i
JOIN item_attributes ia       ON i.item_id = ia.item_id
JOIN attribute_definitions ad ON ia.definition_id = ad.definition_id
JOIN unit_definitions ud      ON ia.unit_id = ud.unit_id
WHERE
  ad.attribute_name = 'thickness'
  AND CAST(ia.attribute_value AS FLOAT) > 1
  AND ud.unit_name = 'millimeters';


--SQL Query 4: Uses a FULL OUTER JOIN
-- select all items in item attributes, find their name in the items table, and sort them by the number of attributes
SELECT
  i.item_name,
  COUNT(ia.definition_id) AS num_attributes
FROM
  items i
FULL JOIN item_attributes ia ON i.item_id = ia.item_id
GROUP BY i.item_id, i.item_name
ORDER BY num_attributes DESC;

--SQL Query 5: Uses nested queries with any of the set operations UNION, EXCEPT, or INTERSECT*
SELECT
  i.item_name,
  AVG(CAST(ia.attribute_value AS FLOAT)) AS avg_length,
  ud.unit_name
FROM
  items i
JOIN item_attributes ia       ON i.item_id = ia.item_id
JOIN attribute_definitions ad ON ia.definition_id = ad.definition_id
JOIN unit_definitions ud      ON ia.unit_id = ud.unit_id
WHERE ad.attribute_name = 'length'
GROUP BY i.item_id, i.item_name, ud.unit_name;
SELECT i.item_name
FROM items i
WHERE NOT EXISTS (
  SELECT 1
  FROM item_attributes ia
  JOIN attribute_definitions ad ON ia.definition_id = ad.definition_id
  WHERE ia.item_id = i.item_id
    AND ad.attribute_name = 'material'
);

--SQL Query 6-8: Must use at least two tables in FROM clause
SELECT
  ut.type_name,
  COUNT(ud.unit_id) AS num_units
FROM
  unit_types ut
LEFT JOIN unit_definitions ud ON ut.type_id = ud.type_id
GROUP BY ut.type_id, ut.type_name
ORDER BY num_units DESC;

SELECT i.item_name
FROM items i
JOIN item_attributes ia_w ON i.item_id = ia_w.item_id
JOIN attribute_definitions ad_w ON ia_w.definition_id = ad_w.definition_id
JOIN item_attributes ia_h ON i.item_id = ia_h.item_id
JOIN attribute_definitions ad_h ON ia_h.definition_id = ad_h.definition_id
WHERE ad_w.attribute_name = 'width'
  AND ad_h.attribute_name = 'height'
  AND CAST(ia_w.attribute_value AS FLOAT) > CAST(ia_h.attribute_value AS FLOAT);

--SQL Query 9: Must use at least three tables in FROM clause
SELECT
  i.item_name,
  COUNT(CASE WHEN ad.data_type = 'numeric' THEN 1 END) AS num_numeric_attributes
FROM
  items i
LEFT JOIN item_attributes ia ON i.item_id = ia.item_id
LEFT JOIN attribute_definitions ad ON ia.definition_id = ad.definition_id
GROUP BY i.item_id, i.item_name
ORDER BY num_numeric_attributes DESC;

--SQL Query 10: i) Must use at least three tables in FROM clause; ii)Must use aliasing or renaming for at least once throughout SQL query
SELECT
  i.item_name,
  MAX(CAST(ia.attribute_value AS FLOAT)) AS max_thickness,
  ud.unit_name
FROM
  items i
JOIN item_attributes ia       ON i.item_id = ia.item_id
JOIN attribute_definitions ad ON ia.definition_id = ad.definition_id
JOIN unit_definitions ud      ON ia.unit_id = ud.unit_id
WHERE ad.attribute_name = 'thickness'
GROUP BY i.item_id, i.item_name, ud.unit_name
ORDER BY max_thickness DESC;
