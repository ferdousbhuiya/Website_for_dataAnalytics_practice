// Higher-level database and SQL study content
const higherLevelDatabaseData = {
  title: "Higher-Level Database & SQL",
  lessons: [
    {number:1,title:"Database Foundations: Data, Information, Database & DBMS",content:`
      <h4>Core concepts</h4>
      <p><strong>Data</strong> is a collection of facts such as numbers, words, measurements, observations, images, or other recorded values. <strong>Information</strong> is data accessed or processed for a particular purpose.</p>
      <p>A <strong>database</strong> is a logically coherent collection of related data. A <strong>DBMS</strong> is software that enables users to create, maintain, retrieve, and manage that data.</p>
      <h4>Metadata and schema</h4>
      <p><strong>Metadata</strong> describes the structure and properties of data. A data dictionary stores information such as meaning, relationships, origin, usage, and format. A <strong>database schema</strong> is the logical blueprint of the database.</p>
      <h4>Practice</h4><p>For a retail system, identify five data values, two examples of metadata, and three schema objects.</p>
    `},
    {number:2,title:"File Systems, Database Models & Architecture",content:`
      <h4>Why database systems matter</h4>
      <p>File-based systems can suffer from redundancy, inconsistency, difficult access, data isolation, integrity problems, atomicity problems, concurrent-access anomalies, and security problems.</p>
      <h4>Database model evolution</h4>
      <ul><li><strong>Hierarchical:</strong> parent-child paths.</li><li><strong>Network:</strong> graph-like relationships.</li><li><strong>Relational:</strong> tables, rows, columns, keys, and SQL.</li><li><strong>Entity-Relationship:</strong> high-level entities, attributes, and relationships.</li></ul>
      <h4>Three-tier architecture</h4><p>Presentation tier handles the user interface, application tier handles business logic, and data tier stores and manages data.</p>
      <h4>Practice</h4><p>Explain why a reservation system with many simultaneous users is difficult to manage safely with independent files.</p>
    `},
    {number:3,title:"Conceptual, Logical & Physical Data Models",content:`
      <p><strong>Conceptual model:</strong> entities, attributes, and relationships without implementation details.</p>
      <p><strong>Logical model:</strong> tables, keys, relationships, and constraints without physical storage details.</p>
      <p><strong>Physical model:</strong> file structures, indexes, access paths, and storage choices.</p>
      <h4>Design practice</h4><p>Create conceptual, logical, and physical designs for a small customer-order system. Keep the three levels clearly separated.</p>
    `},
    {number:4,title:"Relations, Tuples, Attributes, Cardinality & Degree",content:`
      <p>A relational database is a collection of <strong>relations</strong> or tables. Rows are <strong>tuples</strong> and columns are <strong>attributes</strong>.</p>
      <p><strong>Cardinality</strong> is the number of rows. <strong>Degree</strong> is the number of columns. Values are atomic, and duplicate tuples are not allowed in the formal relational model.</p>
      <h4>Practice</h4><p>For <code>Customer(customer_id, name, phone, city, status)</code>, determine the degree. Create six rows and determine the cardinality.</p>
    `},
    {number:5,title:"Superkeys, Candidate Keys, Primary Keys, Foreign Keys & Domains",content:`
      <p>A <strong>superkey</strong> uniquely identifies rows. A <strong>candidate key</strong> is a minimal superkey. One candidate key is chosen as the <strong>primary key</strong>, which cannot be NULL.</p>
      <p>A <strong>foreign key</strong> references a candidate or primary key in another relation and uses a compatible domain. A domain is the allowed set of values for an attribute, commonly represented by its data type.</p>
      <h4>Constraint practice</h4><p>Given <code>Customer(customer_id PK,...)</code> and <code>Orders(order_id PK, customer_id FK,...)</code>, identify which inserts, updates, and deletes would violate entity or referential integrity.</p>
    `},
    {number:6,title:"Relational Operations: Selection, Projection, Cross Product & Join",content:`
      <p><strong>Selection (σ)</strong> chooses rows that satisfy a predicate. <strong>Projection (π)</strong> chooses specified columns. A <strong>cross product</strong> creates all possible row combinations. A <strong>join</strong> combines related rows.</p>
      <pre><code>SELECT order_date, total_amount
FROM Orders
WHERE customer_id = 101;</code></pre>
      <p>The WHERE clause performs selection and the SELECT list performs projection.</p>
      <h4>Practice</h4><p>Write one query demonstrating selection, one demonstrating projection, and one demonstrating both.</p>
    `},
    {number:7,title:"SQL Command Families: DDL, DML, Permissions & Transactions",content:`
      <h4>DDL</h4><p><code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, and <code>TRUNCATE</code> define or change database objects.</p>
      <h4>DML</h4><p><code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, and <code>DELETE</code> retrieve or modify data.</p>
      <h4>Permissions and transaction control</h4><p><code>GRANT</code>, <code>REVOKE</code>, <code>COMMIT</code>, and <code>ROLLBACK</code> control access and transaction outcomes.</p>
      <pre><code>CREATE TABLE Customer (
  customer_id NUMBER PRIMARY KEY,
  name VARCHAR2(60) NOT NULL,
  email VARCHAR2(120) UNIQUE
);</code></pre>
      <h4>Practice</h4><p>Create Customer and Orders tables with primary key, foreign key, NOT NULL, and UNIQUE constraints.</p>
    `},
    {number:8,title:"SELECT-FROM-WHERE, Comparison Operators & NULL Logic",content:`
      <pre><code>SELECT attribute_list
FROM table_list
WHERE condition;</code></pre>
      <p>Important operators include <code>&lt;&gt;</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>, <code>IS NULL</code>, <code>IS NOT NULL</code>, <code>BETWEEN</code>, <code>IN</code>, and <code>LIKE</code>.</p>
      <p>Logical operators include <code>AND</code>, <code>OR</code>, <code>NOT</code>, <code>EXISTS</code>, and <code>NOT EXISTS</code>. Because NULL exists, SQL uses TRUE, FALSE, and UNKNOWN.</p>
      <h4>Practice</h4><p>Retrieve orders between two amounts, then write a second query that finds rows where a shipment date is NULL.</p>
    `},
    {number:9,title:"Aliases, Equi-Joins, Non-Equi Joins, Self-Joins & Multi-Table Joins",content:`
      <h4>Aliases</h4><p>Aliases reduce typing and improve readability.</p>
      <pre><code>SELECT C.name, O.order_id, O.total_amount
FROM Customer C
JOIN Orders O ON C.customer_id = O.customer_id;</code></pre>
      <ul><li><strong>Equi-join:</strong> equality condition.</li><li><strong>Non-equi join:</strong> comparison other than equality.</li><li><strong>Self-join:</strong> a table joined to itself.</li><li><strong>Cross product:</strong> all possible row combinations.</li></ul>
      <h4>Practice</h4><p>Write a self-join on an Employee table to return each employee and their supervisor.</p>
    `},
    {number:10,title:"ALL, DISTINCT & Set Operations",content:`
      <p><code>SELECT ALL</code> keeps duplicate result rows. <code>SELECT DISTINCT</code> removes duplicates.</p>
      <ul><li><code>UNION</code>: rows in either result, duplicates removed.</li><li><code>INTERSECT</code>: rows common to both results.</li><li><code>EXCEPT</code> or <code>MINUS</code>: rows in the first result but not the second.</li></ul>
      <p>Set operations require <strong>union-compatible</strong> result sets with the same number of attributes and compatible domains.</p>
      <h4>Practice</h4><p>Write two compatible SELECT statements and combine them with UNION, INTERSECT, and a set-difference operator. Explain each result.</p>
    `},
    {number:11,title:"Pattern Matching, Arithmetic Expressions & ORDER BY",content:`
      <p>In <code>LIKE</code> patterns, <code>%</code> matches any sequence and <code>_</code> matches one character.</p>
      <pre><code>SELECT customer_id, name
FROM Customer
WHERE city LIKE '%Miami%';</code></pre>
      <p>Arithmetic expressions can create calculated output columns, and <code>ORDER BY</code> sorts using ASC or DESC.</p>
      <pre><code>SELECT name, salary, salary * 1.10 AS increased_salary
FROM Employee
ORDER BY increased_salary DESC;</code></pre>
      <h4>Practice</h4><p>Return employees ordered by department, then last name and first name, with a calculated 10% salary increase.</p>
    `},
    {number:12,title:"Data Types, Data Dictionary & Date/Time Handling",content:`
      <p>Common database types include numeric, fixed-length character, variable-length character, date, and timestamp types. Database catalogs or data dictionaries expose metadata about users, objects, tables, and storage structures.</p>
      <p>Date/time systems often require explicit format patterns when converting text to DATE or TIMESTAMP values.</p>
      <h4>Integrated practical</h4><p>Build Customer, Orders, Employee, and Department tables. Insert sample data, enforce keys, write one equi-join, one self-join, one cross product, one pattern match, one set operation, and one ordered result. Then inspect database metadata using the catalog/data-dictionary views available in your DBMS.</p>
    `}
  ],
  questions: [
    ["What is the difference between data and information?","Data is a collection of facts; information is data accessed or processed for a particular purpose."],
    ["What does metadata describe?","The structure and properties of data, including meaning, relationships, origin, usage, and format."],
    ["What is relation cardinality?","The number of rows or tuples."],
    ["What is relation degree?","The number of columns or attributes."],
    ["What is a candidate key?","A minimal superkey that uniquely identifies each row."],
    ["Can a primary key be NULL?","No."],
    ["What does selection do?","It filters rows according to a predicate."],
    ["What does projection do?","It returns specified columns."],
    ["Why does SQL use three-valued logic?","Because expressions involving NULL can evaluate to UNKNOWN as well as TRUE or FALSE."],
    ["What is an equi-join?","A join that matches rows using equality between related columns."],
    ["What does CROSS JOIN produce?","Every possible combination of rows from the input tables."],
    ["What is union compatibility?","The result sets have the same number of attributes with compatible domains/data types."],
    ["What does DISTINCT do?","It removes duplicate rows from the result."],
    ["What do % and _ mean in LIKE?","% matches any sequence of characters; _ matches one character."],
    ["Why can SELECT * be inefficient?","It may retrieve unnecessary columns, increase I/O, and prevent narrower access paths."]
  ]
};
if (typeof window !== 'undefined') window.higherLevelDatabaseData = higherLevelDatabaseData;
