# TO-DO Board for Phase 2 - Group 11

## Part A (DDL/Schema) [ARSH]

- Every foreign key must have an ON DELETE/ON UPDATE clause. [ARSH]
None of our foreign keys have them so we need to add this.

- \>= 4 check constraints [ARSH]
We need to have at least 4 check constraints, we have 0 right now.

- \>= 4 default values. [ARSH]
Add default values like TIMESTAMP DEFAULT now() or quantity DEFAULT 0.

- NOT NULL cleanup.
Go through all fields and make sure the NULL values are okay.

- Comments. [ARSH]
Add comments to all `CREATE TABLE` commands in the schema file.
Also properly explain the point of that table and how
it will be used.
Add comments to test_populate file.

- Single SQL file (final). [ARSH]
Add everything to single SQL file after all parts are done.

## Part B (Sample Data)

Requirement: \>= 10 tuples per table with realistic values.

- Add *6* more tuples to the **items** table.
- unit_type is OK.
- Add *2* more tuples to the **unit_definition** table.
- attribute_definition OK.
- If needed, add rows to item_attribute table to match others.

- Add *10* tuples/sample data rows to
**locations**, **suppliers**, **inventory_transactions**, **inventory**, and **inventory_records**.

## Part C (Queries)

Requirement: Need *10* different non-trivial queries with
the specific patters in the spec.

- Add the 10 different queries that cover various things
inside the 03_queries.sql file.

IDEAS:

| #     | Skeleton Idea                                                                                      | SQL Features Hit                                           |
|-------|-----------------------------------------------------------------------------------------------------|------------------------------------------------------------|
| 1     | List each item, its total on-hand quantity at all locations, and its unit name.                    | JOIN 3 tables + GROUP BY                                   |
| 2     | Find suppliers whose average transaction quantity is greater than all other suppliers.             | Nested subquery with `ALL`, `GROUP BY`                     |
| 3     | For every location, show the most recent inventory count (correlated subquery selecting max date). | Correlated subquery                                        |
| 4     | Show all items and any inventory counts via FULL OUTER JOIN items↔inventory.                       | FULL OUTER JOIN                                            |
| 5     | List items that appear in inventory but not in inventory_transactions.                             | `EXCEPT` (or `LEFT JOIN … WHERE t.id IS NULL`)            |
| 6–8   | Open-ended: e.g., average thickness by material; items that exceed storage capacity; etc.          | Non-trivial two-table joins                               |
| 9     | Three-table join with aggregation and HAVING (e.g., total cost per supplier per item).             | JOIN + `GROUP BY` + `HAVING`                              |
| 10    | Same as 9 but throw in `CASE` or derived column + table aliases.                                   | `CASE`, derived columns, aliasing/renaming                |

## Schema Diagram [Marcus]

- Must use the textbook's rectangular-box notation.
- Tools: dbdiagram.io, draw.io etc.
- Export to PDF, name it FactoriPortal_Schema.pdf.

## Repo House-Cleaning [ARSH]

- Keep the /dev playground, but create sql/phase2_submission/FactoriPortal_PhaseII.sql.
- Update README.md with project blurb, and properly
show the DBMS we're using and cleanup the rest and organize it.
- Figure out the helpers.py file.

## Meeting notes/other

- schema diagram (powerpoint maybe)
- write the extra constraints
- put everything in one file (only for the submission)
- clean up the sql file and do the documentation
- make sure to put screenshots inside the actual weekly report
