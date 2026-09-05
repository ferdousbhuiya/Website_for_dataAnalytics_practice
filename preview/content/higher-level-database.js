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
  activities: [
    {example:"A retail company stores customers, products, and orders. The order rows are data; a report showing monthly revenue is information. Column definitions and key descriptions are metadata.",practice:"Classify ten items from a small sales system as data, information, metadata, or schema objects.",debug:"A team labels the value 125.50 as metadata. Explain why that is incorrect and identify what metadata about that value could look like.",realWorld:"A new analyst receives a table with unclear column names and no documentation. Explain how a data dictionary would reduce mistakes and speed up analysis.",qa:[["What is the main purpose of a DBMS?","To create, maintain, retrieve, and manage data in a database."],["What is a database schema?","The logical blueprint describing how database data is organized."],["Give one example of metadata.","A column name, data type, key definition, allowed value, origin, or description."]]},
    {example:"A reservation system stored in separate files may duplicate customer details and produce inconsistent records when several users update them at once.",practice:"List three file-system problems for an online booking application and match each problem to a database feature that helps address it.",debug:"Two files contain different addresses for the same customer. Identify the underlying design problem and explain why independent files make it harder to fix.",realWorld:"Explain why a high-volume ticketing system benefits from database concurrency control, recovery, and centralized constraints.",qa:[["What is data redundancy?","Unnecessary duplication of the same data."],["How does the hierarchical model organize data?","Through parent-child relationships."],["What is the role of the application tier?","It processes business logic between the user interface and the data tier."]]},
    {example:"For an online store, Customer and Order are conceptual entities; Customer(customer_id, name) is part of the logical model; indexes on customer_id belong to the physical model.",practice:"Create conceptual, logical, and physical designs for a customer-order system.",debug:"A design document puts a B-tree index inside the conceptual model. Explain why this is at the wrong abstraction level.",realWorld:"A company expects order volume to grow sharply. Explain how separating logical design from physical storage helps the system evolve.",qa:[["What does the conceptual model describe?","High-level entities, attributes, and relationships."],["What does the logical model add?","Tables, keys, relationships, and constraints."],["What belongs in the physical model?","Storage structures, files, indexes, and access paths."]]},
    {example:"Customer(customer_id, name, city) has degree 3. If it contains 250 customer rows, its cardinality is 250.",practice:"Create a five-column relation with six rows. State its degree and cardinality and identify each tuple and attribute.",debug:"A row stores two phone numbers in one attribute such as '305-1111, 305-2222'. Explain why this conflicts with atomic-value expectations.",realWorld:"Explain why clear relation structure matters when analysts join customer, order, and product tables.",qa:[["What is a tuple?","A row in a relation."],["What is an attribute?","A column in a relation."],["What is degree?","The number of attributes in a relation."]]},
    {example:"In Customer(customer_id, email, name), customer_id may be the primary key while email could be another candidate key if it is guaranteed unique.",practice:"Design Customer and Orders tables. Identify superkeys, candidate keys, the primary key, and the foreign key.",debug:"An Orders row uses customer_id 999 but no Customer row has that ID. Identify the violated rule and show two valid ways to resolve the problem.",realWorld:"An e-commerce company deletes customers while retaining orders for financial reporting. Explain the referential-integrity decisions that must be made.",qa:[["What is a superkey?","Any attribute set that uniquely identifies rows."],["What makes a candidate key different?","It is a minimal superkey."],["What does a foreign key enforce?","A relationship to a valid referenced key, subject to allowed NULL behavior."]]},
    {example:"SELECT order_date, total_amount FROM Orders WHERE customer_id=101 performs projection through the SELECT list and selection through WHERE.",practice:"Write one selection query, one projection query, one query using both, and one join between Customers and Orders.",debug:"A query joins Customers and Orders without a join condition and returns thousands of unexpected rows. Diagnose the result and correct it.",realWorld:"A sales analyst must retrieve only high-value orders and customer names from millions of rows. Explain which relational operations are involved.",qa:[["What does selection change?","The rows returned."],["What does projection change?","The columns returned."],["What is a cross product?","Every possible row combination between two relations."]]},
    {example:"CREATE TABLE defines structure; INSERT adds a row; UPDATE changes data; COMMIT makes a transaction permanent.",practice:"Create a Products table, insert two rows, update one price, delete one row, and decide where COMMIT or ROLLBACK should be used.",debug:"A user executes DROP TABLE instead of DELETE FROM. Explain the difference and why the mistake is serious.",realWorld:"A payroll update affects thousands of rows. Explain why transaction control is important before making the change permanent.",qa:[["Which family includes CREATE and ALTER?","DDL."],["Which command changes existing row values?","UPDATE."],["What does ROLLBACK do?","It undoes uncommitted transaction changes."]]},
    {example:"WHERE salary BETWEEN 30000 AND 40000 filters a range, while WHERE supervisor_id IS NULL correctly tests missing values.",practice:"Write queries using BETWEEN, IN, LIKE, IS NULL, AND, OR, and NOT against an Orders table.",debug:"A query uses WHERE shipped_date = NULL and returns no expected rows. Explain the error and correct it.",realWorld:"A fulfillment team needs all unshipped high-value orders from selected regions. Build the filtering logic and explain operator precedence.",qa:[["How should NULL be tested?","With IS NULL or IS NOT NULL."],["What does BETWEEN do?","Tests whether a value falls within an inclusive range."],["Why can a NULL comparison produce UNKNOWN?","Because NULL represents an unknown or unavailable value."]]},
    {example:"Customer C JOIN Orders O ON C.customer_id = O.customer_id is an equi-join. Employee E joined to Employee S through E.supervisor_id=S.employee_id is a self-join.",practice:"Write an equi-join, a three-table join, a self-join, and a cross join. Predict the row count before executing the cross join.",debug:"Revenue doubles after adding a join to OrderItems. Explain how a one-to-many or many-to-many join can multiply rows and how to verify the join grain.",realWorld:"Build a query that returns each order, customer name, product information, and sales representative without duplicating order revenue.",qa:[["What is an equi-join?","A join using equality between related columns."],["What is a self-join?","A table joined to itself."],["What is a common symptom of a bad join?","Unexpected row multiplication or duplicated measures."]]},
    {example:"UNION combines compatible result sets and removes duplicates; INTERSECT keeps common rows; MINUS or EXCEPT returns rows present only in the first result.",practice:"Create two compatible customer lists and compare their UNION, INTERSECT, and set-difference results.",debug:"A UNION fails because the first SELECT returns three columns and the second returns two. Explain union compatibility and fix the query.",realWorld:"Marketing has one list of newsletter subscribers and another list of recent buyers. Use set operations to identify all contacts, shared contacts, and buyers who are not subscribers.",qa:[["What does DISTINCT do?","Removes duplicate result rows."],["What is union compatibility?","Matching column counts with compatible data types/domains."],["Which set operation returns common rows?","INTERSECT."]]},
    {example:"WHERE city LIKE '%Miami%' finds values containing Miami. salary*1.10 AS increased_salary calculates a derived value, and ORDER BY sorts the result.",practice:"Write one LIKE query using %, one using _, one arithmetic expression, and a three-column ORDER BY.",debug:"A query uses LIKE 'Miami%' but the data contains values such as 'North Miami'. Explain why those rows are missed and adjust the pattern.",realWorld:"A compensation analyst needs employees sorted by department and salary with a projected 5% raise. Write and explain the query.",qa:[["What does % match in LIKE?","Any sequence of characters."],["What does _ match?","Exactly one character."],["What does DESC mean?","Descending sort order."]]},
    {example:"A catalog view can list tables and columns while a timestamp conversion interprets a text value according to an explicit date-time format.",practice:"Inspect metadata views available in your DBMS, identify table/column types, and convert three text dates using explicit formats.",debug:"A date string '12/03/2026' is interpreted incorrectly because the format mask assumes DD/MM/YYYY instead of MM/DD/YYYY. Explain the ambiguity and correct the conversion.",realWorld:"A data pipeline receives timestamps from multiple systems in different formats. Explain how explicit types, format handling, and metadata validation prevent incorrect reporting.",qa:[["Why are data types important?","They constrain representation and determine valid operations."],["What is a data dictionary/catalog used for?","To inspect metadata about database objects."],["Why use explicit date formats?","To avoid ambiguous or incorrect date/time interpretation."]]}
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
