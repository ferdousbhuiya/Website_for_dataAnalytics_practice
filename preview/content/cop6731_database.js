// COP 6731 university-aligned database systems and SQL study track
const cop6731DatabaseData = {
  title: "Database Systems & SQL — COP 6731 University Track",
  lessons: [
    {number:1,title:"Database Foundations: Data, Information, Database & DBMS",content:`
      <div class="example-box"><strong>University alignment:</strong> COP 6731 introduction material.</div>
      <h4>Core ideas</h4>
      <p><strong>Data</strong> is a collection of facts such as numbers, words, measurements, observations, images, audio, or other descriptions. <strong>Information</strong> is data accessed and used for a particular purpose.</p>
      <p>A <strong>database</strong> is a logically coherent collection of related data representing some part of the real world. A <strong>DBMS</strong> is the collection of programs that lets users create and maintain that database.</p>
      <h4>Metadata and schema</h4>
      <p><strong>Metadata</strong> describes the structure and properties of data. A data dictionary or metadata repository stores information such as meaning, relationships, origin, usage, and format. A <strong>database schema</strong> is the logical blueprint of the database.</p>
      <h4>Practice</h4><p>For a university registration system, identify five pieces of data, two examples of metadata, and one possible database schema object.</p>
    `},
    {number:2,title:"File Systems, Database Models & DBMS Architecture",content:`
      <h4>Why databases replaced simple file systems</h4>
      <p>File systems can suffer from data redundancy and inconsistency, difficult access, isolation, integrity problems, atomicity problems, concurrent-access anomalies, and security problems.</p>
      <h4>Database model evolution</h4>
      <ul><li>Hierarchical model: parent-child, one-to-many paths.</li><li>Network model: graph structure that supports many-to-many connections.</li><li>Relational model: tables, rows, columns, keys, and SQL.</li><li>ER model: high-level conceptual modeling with entities, relationships, and attributes.</li></ul>
      <h4>Three-tier architecture</h4><p>Presentation tier handles the user interface, application tier handles business logic, and data tier stores and manages data.</p>
      <h4>Practice</h4><p>Explain why an airline reservation system is difficult to manage safely with independent files when many users are booking at the same time.</p>
    `},
    {number:3,title:"Conceptual, Logical & Physical Data Models",content:`
      <h4>Levels of abstraction</h4>
      <p><strong>Conceptual model:</strong> high-level entities, attributes, and relationships without implementation details.</p>
      <p><strong>Logical model:</strong> tables, keys, relationships, and constraints for a specific DBMS, without physical storage details.</p>
      <p><strong>Physical model:</strong> file structures, indexes, access paths, and storage details.</p>
      <h4>Database design questions</h4>
      <ul><li>What data should be stored?</li><li>How should the data be organized?</li><li>How will users access it?</li><li>How should access be optimized?</li></ul>
      <h4>Practice</h4><p>Design a conceptual, logical, and physical view for a small student-course enrollment system. Keep each level clearly separated.</p>
    `},
    {number:4,title:"Relational Model: Relations, Tuples, Attributes, Cardinality & Degree",content:`
      <h4>Relational model</h4><p>A relational database is a collection of relations (tables). Each relation consists of rows called <strong>tuples</strong> and columns called <strong>attributes</strong>.</p>
      <p><strong>Cardinality</strong> is the number of rows in a relation. <strong>Degree</strong> is the number of columns. Values are atomic, and duplicate tuples are not allowed in the relational model.</p>
      <h4>Vocabulary bridge</h4><p>Table = relation = file; column = attribute = field; row = tuple = record.</p>
      <h4>Practice</h4><p>For <code>Student(name, ssn, home_phone, address, office_phone, age, gpa)</code>, determine the degree. Then create five example rows and determine the cardinality.</p>
    `},
    {number:5,title:"Keys, Domains, NULL & Relational Constraints",content:`
      <h4>Keys</h4><p>A <strong>superkey</strong> is any set of attributes whose values uniquely identify rows. A <strong>candidate key</strong> is a minimal superkey. One candidate key is chosen as the <strong>primary key</strong>, and primary-key values cannot be NULL.</p>
      <p>A <strong>foreign key</strong> refers to a candidate/primary key in another relation and must use a compatible domain. A foreign key can be NULL in permitted cases and may also reference its own relation.</p>
      <h4>Domain and constraints</h4><p>A domain is the set of allowed values for an attribute, often represented by the column data type. Common constraints include NOT NULL, DEFAULT, UNIQUE, PRIMARY KEY, and FOREIGN KEY.</p>
      <h4>Constraint lab</h4><p>Given <code>Student(SID PK, SSN, Name, UID FK)</code> and <code>University(UID PK, Name)</code>, decide whether inserts, updates, or deletes create duplicate keys, NULL primary keys, or invalid foreign-key references.</p>
    `},
    {number:6,title:"Relational Operations: Selection, Projection, Cross Product & Join",content:`
      <h4>Relational operations</h4><p><strong>Selection (σ)</strong> chooses rows that satisfy a predicate. <strong>Projection (π)</strong> chooses specified columns. <strong>Cross product</strong> creates every possible row combination. A <strong>join</strong> combines related rows from two or more relations.</p>
      <pre><code>SELECT Bdate, Address
FROM EMPLOYEE
WHERE Fname = 'John' AND Minit = 'B' AND Lname = 'Smith';</code></pre>
      <p>Here the WHERE clause performs selection and the SELECT list performs projection.</p>
      <h4>Practice</h4><p>Write one query that demonstrates selection only, one that demonstrates projection only, and one that demonstrates both.</p>
    `},
    {number:7,title:"SQL Language Families, DDL, DML, Permissions & Transactions",content:`
      <h4>DDL</h4><p><code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, and <code>TRUNCATE</code> define or change database objects.</p>
      <h4>DML</h4><p><code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, and <code>DELETE</code> retrieve or modify data.</p>
      <h4>Permissions and transaction commands</h4><p>The course review also covers <code>GRANT</code>, <code>REVOKE</code>, <code>COMMIT</code>, and <code>ROLLBACK</code>.</p>
      <pre><code>CREATE TABLE Student (
  SID VARCHAR2(10) PRIMARY KEY,
  Name VARCHAR2(60) NOT NULL,
  GPA NUMBER
);

INSERT INTO Student (SID, Name, GPA)
VALUES ('Z01', 'James', 3.5);</code></pre>
      <h4>Practice</h4><p>Create a two-table University/Student schema with a primary key, a foreign key, NOT NULL, and UNIQUE constraints.</p>
    `},
    {number:8,title:"SELECT-FROM-WHERE, Comparison Operators & Three-Valued Logic",content:`
      <h4>Core retrieval syntax</h4><pre><code>SELECT attribute_list
FROM table_list
WHERE condition;</code></pre>
      <p>Comparison operators include <code>&lt;&gt;</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>, <code>IS NULL</code>, <code>IS NOT NULL</code>, <code>BETWEEN</code>, <code>IN</code>, and <code>LIKE</code>.</p>
      <p>Logical operators include <code>AND</code>, <code>OR</code>, <code>NOT</code>, <code>EXISTS</code>, and <code>NOT EXISTS</code>. Because NULL exists, SQL uses TRUE, FALSE, and UNKNOWN.</p>
      <h4>Practice</h4><p>Retrieve employees in department 5 whose salary is between 30,000 and 40,000, then write a second query that finds rows where a supervisor value is NULL.</p>
    `},
    {number:9,title:"Aliases, Equi-Joins, Non-Equi Joins, Self-Joins & Multi-Table Joins",content:`
      <h4>Aliases</h4><p>Aliases reduce typing and make complex queries easier to read.</p>
      <pre><code>SELECT E.Fname, E.Lname, E.Address
FROM EMPLOYEE E, DEPARTMENT D
WHERE E.Dno = D.Dnmber
  AND D.Dname = 'Research';</code></pre>
      <h4>Join types emphasized in the course</h4><ul><li>Equi-join: equality condition between related columns.</li><li>Non-equi join: uses conditions such as &gt;, &lt;, &gt;=, or &lt;=.</li><li>Self-join: joins a table to itself, for example employee to supervisor.</li><li>Cross product: all possible row combinations without a join condition.</li></ul>
      <h4>Practice</h4><p>Write a self-join that returns each employee name together with the name of the employee's supervisor.</p>
    `},
    {number:10,title:"ALL, DISTINCT & SQL Set Operations",content:`
      <h4>ALL and DISTINCT</h4><p><code>SELECT ALL</code> returns duplicates and is the default behavior. <code>SELECT DISTINCT</code> removes duplicate result rows.</p>
      <h4>Set operators</h4><ul><li><code>UNION</code>: rows in either result, duplicates removed.</li><li><code>INTERSECT</code>: rows common to both results.</li><li><code>EXCEPT</code> / Oracle <code>MINUS</code>: rows in the first result but not the second.</li></ul>
      <p>Set operations require <strong>union compatibility</strong>: the same number of attributes and compatible domains.</p>
      <h4>Practice</h4><p>Write two compatible SELECT statements and combine them with UNION, INTERSECT, and MINUS. Explain the result of each.</p>
    `},
    {number:11,title:"Pattern Matching, Arithmetic & ORDER BY",content:`
      <h4>LIKE patterns</h4><p><code>%</code> matches any sequence of characters and <code>_</code> matches a single character.</p>
      <pre><code>SELECT E.fname, E.lname
FROM Employee E
WHERE E.address LIKE '%Houston, TX%';</code></pre>
      <h4>Arithmetic</h4><pre><code>SELECT E.fname, E.lname, 1.1 * E.salary AS increased_salary
FROM Employee E;</code></pre>
      <h4>Ordering</h4><p><code>ORDER BY</code> sorts results using ASC or DESC and can use multiple columns.</p>
      <h4>Practice</h4><p>Return employees ordered by department, then last name and first name. Add a calculated column showing salary after a 10% raise.</p>
    `},
    {number:12,title:"Oracle Review: Data Dictionary, Data Types, Dates & Integrated Practical",content:`
      <h4>Oracle-specific review</h4><p>Oracle examples in the course include <code>VARCHAR2</code>, <code>NUMBER</code>, <code>DATE</code>, and <code>TIMESTAMP</code>. Oracle's data dictionary provides read-only metadata views such as <code>USER_ROLE_PRIVS</code>, <code>USER_OBJECTS</code>, and <code>USER_TABLES</code>.</p>
      <pre><code>SELECT OBJECT_NAME, OBJECT_TYPE
FROM USER_OBJECTS;

SELECT USERNAME, GRANTED_ROLE
FROM USER_ROLE_PRIVS;</code></pre>
      <h4>Date/time conversion</h4><pre><code>TO_TIMESTAMP('10-Sep-02 14:10:10', 'DD-Mon-RR HH24:MI:SS')</code></pre>
      <h4>Capstone practice</h4><p>Build EMPLOYEE, DEPARTMENT, PROJECT, and WORKS_ON tables. Insert sample data, enforce keys, query one department with an equi-join, write one self-join, one cross product, one pattern match, one set operation, and one ordered result. Finally inspect your Oracle objects through the data dictionary.</p>
    `}
  ],
  questions: [
    {number:1,difficulty:"easy",question:"What is the difference between data and information?",context:"COP 6731 Introduction",answer:"Data is a collection of facts. Information is data accessed or processed for a particular purpose."},
    {number:2,difficulty:"easy",question:"What is a DBMS?",context:"Database foundations",answer:"A DBMS is a collection of programs that enables users to create and maintain a database."},
    {number:3,difficulty:"easy",question:"What does metadata describe?",context:"Metadata and data dictionary",answer:"Metadata describes the structure and properties of data, including meaning, relationships, origin, usage, and format."},
    {number:4,difficulty:"medium",question:"Name four disadvantages of file systems discussed in COP 6731.",context:"File systems",answer:"Any four of: redundancy/inconsistency, difficulty accessing data, data isolation, integrity problems, atomicity problems, concurrent-access anomalies, and security problems."},
    {number:5,difficulty:"medium",question:"How do conceptual, logical, and physical data models differ?",context:"Levels of abstraction",answer:"Conceptual models describe entities and relationships at a high level; logical models define tables, keys, relationships and constraints; physical models define storage structures, files, indexes and access paths."},
    {number:6,difficulty:"easy",question:"In a relation, what do cardinality and degree mean?",context:"Relational model",answer:"Cardinality is the number of rows/tuples; degree is the number of columns/attributes."},
    {number:7,difficulty:"medium",question:"What is the difference between a superkey and a candidate key?",context:"Relational keys",answer:"A superkey uniquely identifies rows; a candidate key is a minimal superkey with no unnecessary attribute."},
    {number:8,difficulty:"easy",question:"Can a primary key be NULL?",context:"Primary-key constraint",answer:"No. Primary-key values cannot be NULL."},
    {number:9,difficulty:"medium",question:"What condition must a foreign key satisfy when it references another relation?",context:"Referential integrity",answer:"Its values must reference a valid candidate/primary-key value in the referenced relation, unless NULL is permitted; the participating attributes must have compatible domains."},
    {number:10,difficulty:"medium",question:"What is selection in relational algebra?",context:"Relational operations",answer:"Selection chooses rows (tuples) that satisfy a specified predicate."},
    {number:11,difficulty:"medium",question:"What is projection in relational algebra?",context:"Relational operations",answer:"Projection returns a specified set of columns (attributes) from a relation."},
    {number:12,difficulty:"easy",question:"Which SQL clause specifies the columns returned by a query?",context:"SELECT-FROM-WHERE",answer:"SELECT."},
    {number:13,difficulty:"easy",question:"Which SQL clause filters rows before they are returned?",context:"SELECT-FROM-WHERE",answer:"WHERE."},
    {number:14,difficulty:"medium",question:"Why does SQL use three-valued logic?",context:"NULL logic",answer:"Because expressions involving NULL may evaluate to UNKNOWN in addition to TRUE or FALSE."},
    {number:15,difficulty:"medium",question:"What is an equi-join?",context:"Joins",answer:"A join that matches rows using equality between specified columns."},
    {number:16,difficulty:"medium",question:"What is a self-join used for?",context:"Joins",answer:"It joins a table to itself, such as linking an employee row to the employee's supervisor row."},
    {number:17,difficulty:"easy",question:"What does a CROSS JOIN produce?",context:"Cross product",answer:"Every possible combination of rows from the two input tables."},
    {number:18,difficulty:"medium",question:"What does SELECT DISTINCT do?",context:"Set semantics",answer:"It removes duplicate rows from the query result."},
    {number:19,difficulty:"medium",question:"What does union compatible mean?",context:"Set operations",answer:"The two query results have the same number of attributes with compatible domains/data types, allowing set operators to be applied."},
    {number:20,difficulty:"medium",question:"What is Oracle's equivalent of ANSI EXCEPT in the course material?",context:"Set difference",answer:"MINUS."},
    {number:21,difficulty:"easy",question:"In LIKE patterns, what do % and _ mean?",context:"Pattern matching",answer:"% matches any sequence of characters; _ matches a single character."},
    {number:22,difficulty:"medium",question:"Write a query to find employees in department 5 with salaries between 30000 and 40000.",context:"Practical SQL",answer:"SELECT E.fname, E.lname FROM Employee E WHERE E.salary BETWEEN 30000 AND 40000 AND E.dno = 5;"},
    {number:23,difficulty:"medium",question:"Which Oracle data dictionary view lists objects owned by the current user?",context:"Oracle data dictionary",answer:"USER_OBJECTS."},
    {number:24,difficulty:"hard",question:"A Student row references UID=5, but University contains only UID 1 through 4. Which constraint is violated?",context:"Constraint violation practice",answer:"Referential integrity / the foreign-key constraint is violated because UID 5 has no matching referenced key."},
    {number:25,difficulty:"hard",question:"Why can SELECT * be inefficient on a large table?",context:"Basic SQL performance",answer:"It retrieves unnecessary columns, increasing I/O and sometimes preventing an index-only access path."},
    {number:26,difficulty:"hard",question:"A query combines EMPLOYEE and DEPARTMENT without a join predicate. What operation is produced?",context:"Join debugging",answer:"A Cartesian product (cross product), producing all possible row combinations."}
  ],
  caseStudyQuizzes: [
    {case:1,scenario:"A university stores Student(SID, SSN, Name, UID) and University(UID, Name). SID and UID are primary keys, and Student.UID references University.UID.",question:"Which insert definitely violates referential integrity?",options:["Student('Z10','111','Ana',2)","Student('Z11','222','Ben',NULL)","Student('Z12','333','Cara',99)","Student('Z13','444','Dan',1)"],answer:"Student('Z12','333','Cara',99), if UID 99 does not exist in University."},
    {case:2,scenario:"A report needs employee names and their department names. EMPLOYEE.Dno references DEPARTMENT.Dnumber.",question:"Which approach best represents the relationship?",options:["Cross join with no condition","Equi-join on EMPLOYEE.Dno = DEPARTMENT.Dnumber","UNION the two tables","Order both tables by department"],answer:"Equi-join on EMPLOYEE.Dno = DEPARTMENT.Dnumber."},
    {case:3,scenario:"You need project numbers that appear in either of two compatible SELECT results and duplicates should be removed.",question:"Which operator should you use?",options:["UNION","CROSS JOIN","MINUS","ORDER BY"],answer:"UNION."}
  ]
};
if (typeof window !== 'undefined') window.cop6731DatabaseData = cop6731DatabaseData;
if (typeof module !== 'undefined' && module.exports) module.exports = cop6731DatabaseData;
