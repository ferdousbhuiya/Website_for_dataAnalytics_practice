const bigDataData = {
    title: "Big Data Technologies",
    metadata: {
        track: 'data-engineer',
        category: 'Big Data',
        icon: '🐘',
        description: "Understand the landscape of distributed systems. Learn the fundamentals of Spark for large-scale data processing."
    },
    lessons: [
        {
            number: 1,
            title: "Distributed Computing Principles",
            content: "Big data tools exist because a single machine cannot hold or process all of today's data. **Distributed computing** spreads data and computation across many machines (a cluster) that work together as one system.\n\nKey principles: **horizontal scaling** — add more commodity machines rather than buying a bigger single box; **data locality** — move the code to where the data lives so you don't ship petabytes over the network; **fault tolerance** — machines die constantly, so the system must detect and recover from failures (replication, recomputation); and **shared-nothing architecture** — each node owns a slice of the data and only coordinates when necessary.\n\nThe trade-off is coordination overhead: the more nodes, the more network shuffles, which is why a large portion of big-data engineering is about minimizing data movement."
        },
        {
            number: 2,
            title: "The MapReduce Paradigm",
            content: "**MapReduce** is Google's programming model (2004) that made distributed processing on commodity clusters practical. You express a computation as two pure, parallelizable functions:\n\n- **Map**: take one input record, emit zero or more key/value pairs.\n- **Reduce**: for each distinct key, receive the group of all its values and produce a summary.\n\nThe framework handles partitioning, sorting, shuffling (moving values with the same key to the same reducer), scheduling, and failure retries. A classic example is word count: the mapper emits `(word, 1)` per token, and the reducer sums the 1s per word.\n\n```mermaid\nflowchart LR\n    A[Input split] --> M1[Mapper 1]\n    B[Input split] --> M2[Mapper 2]\n    M1 --> S[Shuffle & sort by key]\n    M2 --> S\n    S --> R1[Reducer 1]\n    S --> R2[Reducer 2]\n    R1 --> O[Output part 1]\n    R2 --> O2[Output part 2]\n```\n\nIts strength is simplicity and fault tolerance; its weakness is disk-heavy intermediate I/O, which is why Spark replaced it with in-memory processing."
        },
        {
            number: 3,
            title: "The Hadoop Ecosystem",
            content: "Hadoop was the open-source implementation that popularized the big data stack. Its core components:\n\n- **HDFS (Hadoop Distributed File System)**: splits files into 128MB blocks, replicates them (default 3x) across nodes, and enables data-locality scheduling.\n- **YARN**: the cluster resource manager that allocates CPU/memory containers to applications.\n- **MapReduce**: the processing engine on top.\n\nAround these grew an ecosystem: **Hive** (SQL over files via HiveQL compiled to MapReduce/Tez), **HBase** (columnar NoSQL on HDFS), **Pig** (scripting), **ZooKeeper** (coordination/service discovery), and **Sqoop/Flume** (data import). The classic flavor is batch-oriented and disk-heavy; modern stacks largely replaced Hive-on-MapReduce with Hive-on-Spark/Tez or engines like Presto/Trino. The ideas — distributed filesystem, resource manager, SQL-on-anything — remain the blueprint for cloud-native systems."
        },
        {
            number: 4,
            title: "Spark Core: RDDs, DataFrames, Transformations and Actions",
            content: "**Apache Spark** is a unified, in-memory analytics engine. Its abstractions, from low to high level:\n\n- **RDD (Resilient Distributed Dataset)**: immutable, fault-tolerant distributed collection of objects. 'Resilient' because lineage tracks how each partition was computed, so lost partitions are recomputed from parents. Low-level API, rarely used directly today.\n- **DataFrame**: a distributed table with a schema, backed by the *Catalyst* optimizer and *Tungsten* (binary in-memory encoding). Like pandas or SQL but distributed. This is the API you use.\n- **Dataset**: typed DataFrame (JVM/Scala).\n\nTwo kinds of operations: **transformations** (lazy — `map`, `filter`, `join`, `groupBy`) build a DAG but compute nothing yet; **actions** (`count`, `collect`, `show`, `write`) trigger execution. Lazy evaluation lets Spark optimize the whole query and avoid materializing intermediate data.\n\n```mermaid\ngraph TD\n    A[Read parquet files] --> B[filter where country = 'US']\n    B --> C[join with dim_table]\n    C --> D[groupBy product_category]\n    D --> E[aggregate sum revenue]\n    E --> F[Action: write results]\n```"
        },
        {
            number: 5,
            title: "Partitioning and Shuffling",
            content: "**Partitioning** is how Spark splits a dataset across executors: each partition is a chunk of rows handled by one task, in one executor, usually one CPU core. Choosing partition count/keys shapes performance: too few partitions underutilize the cluster; too many add overhead. When you *repartition by key* (e.g. by a join key or by date for an output layout), rows with the same key land on the same partition.\n\n**Shuffling** is the expensive all-to-all data transfer that happens when an operation changes the partitioning scheme — `groupByKey`, `reduceByKey`, and joins (except broadcast joins) force Spark to move records across the network so equal keys end up together. Shuffle is where 90% of big-data performance problems live. Mitigations: **broadcast joins** for small tables (replicate to every executor, no shuffle), **pre-partitioning** data, avoiding `groupByKey` in favor of `reduceByKey` (combines locally first), and managing data skew with salting."
        },
        {
            number: 6,
            title: "Streaming vs Batch Processing",
            content: "**Batch** processes finite, already-collected data on a schedule (hourly, nightly) — simple, cheap, easy to backfill. **Streaming** processes events continuously as they arrive, with latency of seconds to minutes, suiting real-time use cases (fraud detection, live dashboards, IoT).\n\nModern systems blur the line. **Spark Structured Streaming** implements *micro-batches*: it processes tiny batches continuously, giving near-real-time latency with exactly-once semantics via the write-ahead log. True event-at-a-time engines like **Kafka Streams** and **Flink** offer lower latency with more operational complexity. The practical model for most pipelines is the **Lambda architecture** (batch + speed layer) or better, **Kappa** (everything is a stream; batch is just a replay of history). A common pattern: stream into object storage / a lakehouse in near-real-time, then batch-optimize (compaction) for interactive queries — the *stream-batch unification* idea."
        },
        {
            number: 7,
            title: "CAP Theorem Basics",
            content: "The **CAP theorem** says a distributed data store can guarantee at most two of three properties at any moment: **Consistency** (every read returns the latest write), **Availability** (every request gets a non-error response, even if stale), and **Partition tolerance** (the system keeps working when the network splits). Because network partitions are inevitable in real clusters, P is mandatory, so you choose between **CP** (consistency, sacrifice availability during a partition — e.g. HBase, ZooKeeper) and **AP** (availability, serve stale data during a partition — e.g. Cassandra, DynamoDB).\n\nRelated, often-confused ideas: **BASE** (Basically Available, Soft state, Eventually consistent) describes AP systems that reconcile via replicas — useful in analytics, where slight staleness is usually fine, and **exactly-once vs at-least-once** delivery describe how sources/sinks behave on retries."
        },
        {
            number: 8,
            title: "When Do You Actually Need Big Data Tools?",
            content: "Big data tools are expensive and operationally complex — the honest answer is 'later than marketing suggests.' Start with: (1) **single-machine scale** — Postgres/MySQL, pandas/polars, DuckDB; (2) **a cloud data warehouse or lakehouse** (BigQuery, Snowflake, Redshift, Delta) which scale out for you before you need your own cluster; (3) **object storage + SQL engine** (S3 + Athena/Trino).\n\nReach for Spark/own-cluster big data when: data exceeds a single machine's practical limits; you need distributed **transformations at huge scale** (1TB+ joins/aggregations); you process data in many formats at lake scale; or you need a *multi-engine* workload (batch + streaming + ML) on one platform. Signals to postpone: you can name the bottleneck as 'the SQL was too slow' — that's an indexing/schema problem, not a scale problem. Recurring tests: will 10x data still fit your warehouse? Will a nightly batch meet latency? Buy a cluster only when a managed warehouse genuinely cannot do the job."
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "What is the core data structure in Spark?",
            answer: "The Resilient Distributed Dataset (RDD) — an immutable, partitioned, fault-tolerant distributed collection. 'Resilient' refers to lineage: Spark remembers how each partition was derived, so if a node fails, lost partitions are recomputed from their parents rather than replicated like HDFS. In practice you mostly use the higher-level DataFrame/Dataset APIs built on top."
        },
        {
            number: 2,
            difficulty: "easy",
            question: "Explain the map and reduce phases of MapReduce.",
            answer: "Map: a parallelizable function that processes each input record independently and emits zero or more key/value pairs (e.g. for word count, emit (word, 1) for each token). Reduce: for each distinct key, the framework groups all values together and the reduce function produces a summary (e.g. sum the 1s per word). The framework inserts a shuffle/sort step between them to route values with the same key to the same reducer, and handles scheduling, fault tolerance, and data partitioning."
        },
        {
            number: 3,
            difficulty: "medium",
            question: "What is the difference between a transformation and an action in Spark?",
            answer: "Transformations (map, filter, join, groupBy) are lazy: they build a lineage/DAG of operations but compute nothing until an action runs. Actions (count, collect, show, save) trigger execution by materializing results or writing output. Lazy evaluation allows the Catalyst optimizer to reorder/fuse operations and avoid materializing intermediate data. A classic pitfall is calling an action inside a loop, which re-reads and re-computes the whole lineage each time."
        },
        {
            number: 4,
            difficulty: "medium",
            question: "Why does a shuffle cost so much in a distributed system, and what can you do to avoid it?",
            answer: "A shuffle moves records across the network so equal keys land on the same executor — that all-to-all transfer includes serialization, disk spills, and often repeated data (e.g. groupByKey sends whole values; joins can amplify). Network I/O and spills dominate job time. Mitigations: use broadcast joins for small dimension tables (send a copy to each executor, no shuffle); pre-partition data by join key; prefer reduceByKey over groupByKey (it locally combines before shuffling); coalesce/repartition deliberately; and fix data skew with salting or per-key hashing so a few partitions don't become hot spots."
        },
        {
            number: 5,
            difficulty: "medium",
            question: "Explain the CAP theorem and what CP vs AP means for a data store.",
            answer: "CAP says a distributed store can guarantee at most two of Consistency (every read sees the latest write), Availability (every request gets a non-error response), and Partition tolerance (system works despite network splits). Network partitions are unavoidable, so P is mandatory in practice, and you choose CP (during a partition, refuse to serve stale data — e.g. HBase, ZooKeeper) or AP (keep serving, possibly stale, reconcile later — e.g. Cassandra, DynamoDB). In analytics, AP/BASE with eventual consistency is usually acceptable; in transactions and financial ledgers you lean CP."
        },
        {
            number: 6,
            difficulty: "medium",
            question: "What is the difference between batch and streaming processing, and what is micro-batch?",
            answer: "Batch processes finite collected data on a schedule (hourly/daily) — simple, cheap, and easy to re-run/backfill. Streaming processes events continuously with seconds-to-minutes latency for real-time use cases. Micro-batch (Spark Structured Streaming) is a hybrid: the engine processes tiny, bounded batches back-to-back, giving near-real-time latency while preserving the fault-tolerance and exactly-once semantics of batch. True event-at-a-time engines (Flink, Kafka Streams) offer the lowest latency with more complexity; the Kappa architecture treats everything as a stream where batch is just replaying history."
        },
        {
            number: 7,
            difficulty: "medium",
            question: "When should you NOT reach for Spark / big data tools?",
            answer: "When the problem fits a single machine or a managed warehouse. Specifically: if your data fits comfortably in Postgres/MySQL or a columnar file you can process with pandas/polars/DuckDB; if a cloud data warehouse or lakehouse (BigQuery, Snowflake, Redshift, Delta Lake) handles your scale with a few hundred dollars a month and no cluster to operate; if the real bottleneck is a slow SQL query that an index, partition, or materialized view fixes; or if you don't yet have a reason latency/size truly exceed a warehouse. Big data tooling adds real operational cost, so the honest guidance is to scale the simplest system that works, and only add a cluster when a managed warehouse genuinely can't."
        },
        {
            number: 8,
            difficulty: "hard",
            question: "A Spark join runs for hours with one executor doing all the work. Diagnose and propose fixes.",
            answer: "Classic **data skew** and/or a missing shuffle strategy. Diagnosis: if one task processes a huge partition while others idle, some keys have far more rows than others (e.g. an empty-country or default user key, a NULL join key, or a super-popular product). Fixes: (1) broadcast join if the 'big' side isn't actually huge and the other table is small; (2) filter/remove NULL keys or give NULLs a random bucket; (3) **salting**: add a random salt to skewed keys on the map side, then expand and re-aggregate on the reduce side to split the hot key across partitions; (4) pre-partition both datasets by the join key with an appropriate number of partitions so one node doesn't own the whole hot key; (5) increase parallelism (more shuffle partitions) and check you're not hitting spill from oversized partitions. Confirm by looking at the Spark UI stage/partition durations before changing code."
        },
        {
            number: 9,
            difficulty: "hard",
            question: "Design a fault-tolerant nightly aggregation job in Spark that must not lose or double-count any rows.",
            answer: "Goals: exactly-once output, crash recovery, cheap reruns. Design: (1) read input as immutable partitioned files; (2) key the job by business date and write to a **staging location** with a unique run token, or write to a **truncate-and-swap** table pattern; (3) write using DataFrame `.write` with a **unique output prefix / overwrite of a partition**, so a rerun replaces rather than appends; (4) use the DataSource writer's atomic commit semantics — Spark writes to a temp dir and commits files only on success; on failure you just rerun and it cleans stale files; (5) idempotency: dedupe with `dropDuplicates` on a business key if the source is at-least-once, and choose **overwrite** on the date partition so two runs produce identical bytes; (6) add a row-count/checksum assertion after writing and an alert on mismatch. This gives exactly-once semantics: each business date has exactly one correct result no matter how many times you rerun."
    }
    ],
    caseStudyQuizzes: [
        {
            case: 1,
            scenario: "A company must analyze 50 TB of raw logs daily. A single machine with a DataFrame library runs out of memory and takes hours.",
            question: "Which architecture fits the scale?",
            options: [
                "Force a bigger single machine",
                "Use a distributed engine (e.g., Spark) that partitions work across a cluster with lazy evaluation",
                "Read the whole file into one string",
                "Sample 1% and claim it is the full answer"
            ],
            answer: "Correct Option: Use a distributed engine (e.g., Spark) that partitions work across a cluster with lazy evaluation"
        },
        {
            case: 2,
            scenario: "Your Spark job is slow because data shuffles across the network for every join, and one task processes far more data than the others.",
            question: "What tuning helps most?",
            options: [
                "Add many tiny files",
                "Reduce shuffling (e.g., better partitioning, broadcast small tables) and address data skew",
                "Increase logging",
                "Run the job on a single executor"
            ],
            answer: "Correct Option: Reduce shuffling (e.g., better partitioning, broadcast small tables) and address data skew"
        }
    ]
    };

if (typeof window !== 'undefined') {
    window.bigDataData = bigDataData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = bigDataData;
}