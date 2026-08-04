const cloudDataData = {
    title: "Cloud Data Platforms",
    metadata: {
        track: 'data-engineer',
        category: 'Cloud',
        icon: '☁️',
        description: "An overview of data warehousing and processing services on major cloud platforms like AWS, GCP, and Azure."
    },
    lessons: [
        {
            number: 1,
            title: "Data Warehouse Services: Redshift BigQuery Snowflake",
            content: "Modern cloud data warehouses separate **compute** from **storage** so you pay for each independently. The big three:\n\n- **Amazon Redshift (AWS)**: columnar warehouse on a cluster of nodes. You size the cluster (RA3 nodes separate compute/storage) and it scales out by adding nodes. Great fit for heavy SQL workloads inside AWS.\n- **Google BigQuery (GCP)**: **serverless** — no cluster to provision. You pay per query / per stored TB; it auto-scales to thousands of slots and supports real-time streaming ingestion. Ideal for interactive analytics at petabyte scale.\n- **Snowflake (multi-cloud)**: a warehouse-as-a-service that runs on AWS/GCP/Azure, famous for **multi-cluster shared data**: storage is one central object store, and independent virtual warehouses compute on it — you can scale compute without touching data.\n\nAll three use columnar storage, compression, and cluster/partition pruning for speed. Choosing one is usually about vendor ecosystem, cost model, and team familiarity.\n\n```mermaid\ngraph TD\n    S[Cloud object storage: S3 / GCS / ADLS] -->|raw files Parquet JSON| L[(Data lake zone)]\n    S -->|governed modeled tables| DW[Warehouse: Redshift / BigQuery / Snowflake]\n    L --> Q[Serverless query: Athena / Synapse / external tables]\n    DW --> BI[BI tools & dashboards]\n    Q --> BI\n    DW --> A[Application analytics]\n```"
        },
        {
            number: 2,
            title: "Object Storage: S3 GCS and ADLS",
            content: "**Object storage** is the backbone of the cloud data lake: flat, highly durable (11 nines in S3), infinitely scalable, and cheap. Objects are addressed by a URL/key rather than a file path; there are no directories, though keys can contain `/` for prefixes that act like folders.\n\n- **AWS S3**: the de-facto standard. Storage classes (Standard, Infrequent Access, Glacier) trade price for retrieval speed. Supports versioning, lifecycle policies (auto-archive), and server-side encryption.\n- **GCP Cloud Storage**: unified object storage, with **gs://** URIs; regional and multi-regional buckets.\n- **Azure ADLS Gen2 (Azure Data Lake Storage)**: blob storage plus a hierarchical namespace that supports true folders and POSIX ACLs, plus the `abfs://` driver.\n\nObject storage is where you land raw files (Parquet, JSON, CSV) and from which warehouses and query engines read. Lifecycle rules and partition-by-date prefixes (e.g. `events/date=2024-01-01/`) are core data-engineering habits."
        },
        {
            number: 3,
            title: "Compute: EC2 Dataproc and Azure VM",
            content: "Data processing needs compute. The main shapes:\n\n- **EC2 (AWS) / Azure VMs / GCE**: raw virtual machines. You install and run anything — Airflow, Spark, Jupyter — and you own patching, scaling, and cost control. Maximum flexibility, maximum ops burden.\n- **Managed clusters**: **Amazon EMR** (AWS) and **Dataproc** (GCP) launch Spark/Hadoop clusters on demand from config; you pay per node-hour and can scale or shrink with autoscaling, terminating idle clusters to save money. **Azure HDInsight** and **Databricks** are the equivalents.\n- **Serverless compute**: **AWS Lambda / GCP Cloud Functions / Azure Functions** run small, short jobs with zero servers; **Cloud Run / Fargate** run containers without managing nodes.\n\nThe rule: use managed services (EMR/Dataproc) over raw VMs unless you need full control. Terminating idle clusters and right-sizing instances are the two biggest cloud-data cost levers."
        },
        {
            number: 4,
            title: "Managed Services vs Self-Hosted",
            content: "**Managed services** — the cloud provider runs the software, patches it, and handles failover for you. Examples: RDS, BigQuery, Snowflake, S3, EMR, SQS. You get SLAs and less ops, at a premium and with less control.\n\n**Self-hosted** — you run the software yourself on VMs or containers (e.g. self-hosted Airflow, Postgres, Kafka, Spark). You own version upgrades, backups, security patches, scaling, and high availability. It's cheaper at the margin and highly customizable, but the total cost of ownership (TCO) includes your engineering time.\n\nFor data engineering the sensible split: choose managed for **commodity** components (warehouse, object storage, managed Airflow like MWAA, managed Kafka like Confluent/MSK), and self-host only where you need customization or where a managed option doesn't exist. The question is never 'managed or not' but 'which box has the best TCO and least risk for this workload.'"
        },
        {
            number: 5,
            title: "Serverless Querying: Athena and BigQuery",
            content: "**Serverless query engines** let you run SQL directly over files in object storage with no servers or clusters to manage.\n\n- **Amazon Athena**: SQL over S3 using Presto/Trino under the hood. You pay per byte scanned, so **file format and partitioning matter enormously**: Parquet with compression scans 5-10x fewer bytes than CSV, and partition pruning limits the scan to relevant prefixes. Athena is perfect for ad-hoc exploration of a data lake and light ETL via CTAS.\n- **BigQuery**: serverless warehouse; queries over tables stored natively in Google's storage or *external tables* on GCS. Its slot-based pricing charges per query and per stored TB.\n- **Azure Synapse Serverless**: SQL over ADLS.\n\nThese blur the warehouse/lake boundary: you can query a lake without loading it. Watch out for **query costs**: a poorly-partitioned, CSV data lake can make an Athena query scan terabytes. Design patterns: partition by date, use columnar formats, and `SELECT` only needed columns."
        },
        {
            number: 6,
            title: "Data Transfer: Ingest and Replication",
            content: "Getting data into and between clouds is a discipline in itself. Options by use case:\n\n- **File upload/ingest**: SDKs, `aws s3 cp`, `gsutil`, `azcopy`, plus **managed transfer** like AWS DataSync, S3 Transfer Acceleration, and the **Snowball/Snowmobile** physical-appliance family for 10s of TB+ (you ship a disk).\n- **Database CDC / replication**: **AWS DMS**, **Azure Data Factory**, **GCP Datastream** stream changes from source DBs into lakes/warehouses; for Kafka-like streaming, managed **MSK**, **Confluent Cloud**, and **GCP Pub/Sub**.\n- **Cross-cloud**: public-internet transfer, **CDN-accelerated** uploads, or Google **BigQuery Data Transfer** / AWS **Glue** for batch moves.\n- **Streaming ingest**: **Kinesis Data Firehose** (AWS) and **Pub/Sub** (GCP) buffer events and land them in object storage near-real-time.\n\nKey decisions: batch vs streaming, encryption in transit, network egress costs (egress across cloud providers is billed and not cheap), and idempotent re-runs."
        },
        {
            number: 7,
            title: "Cost Optimization",
            content: "Cloud-data bills balloon from three sources: **storage**, **compute**, and **network egress**. Cost levers:\n\n- **Storage**: lifecycle policies to move cold data to cheaper tiers (S3 IA/Glacier, GCS Nearline/Coldline); compress columnar formats; delete orphaned staging tables and old backups; use reservation discounts (S3 Reserved Capacity, BigQuery flat-rate, Snowflake capacity commits).\n- **Compute**: terminate idle clusters; autoscale; use spot/preemptible instances for resumable batch jobs; right-size instance types (the 'downsizing is free' audit); serverless querying means you pay per query — so partition and use columnar formats to slash bytes scanned.\n- **Warehouse**: separate BI/ad-hoc vs batch concurrency (Snowflake virtual warehouses); BigQuery slot reservations vs on-demand pricing; never `SELECT *` in production jobs.\n- **Network**: avoid cross-region and cross-cloud joins; use VPC endpoints; compress in transit.\n\nBest practice: tag resources by team/job, set budgets and alerts at 50/80/90%, and build a 'cost per pipeline run' dashboard so spending is visible."
        },
        {
            number: 8,
            title: "Security and IAM Basics",
            content: "Cloud data security is identity-centric: **least privilege** — every user and service gets only the permissions it needs. The model:\n\n- **IAM** (Identity and Access Management): AWS IAM roles/policies, GCP IAM roles, Azure RBAC. A service (like a Spark job or a Lambda) authenticates with a **role** and gets temporary credentials (STS), never long-lived keys. Bucket-level: **bucket policies / ACLs**, block public access.\n- **Data protection**: encryption at rest (**SSE-S3, GCS default AES-256, Azure SSE**) and in transit (TLS); server-side keys, or KMS-managed keys for compliance; **KMS** (AWS KMS, GCP Cloud KMS, Azure Key Vault) centralizes key management and rotation.\n- **Secrets**: never hard-code credentials — use **AWS Secrets Manager / SSM Parameter Store, GCP Secret Manager, Azure Key Vault**, and inject them at runtime.\n- **Governance**: **VPC/network isolation** with endpoints so data services never cross the public internet; **audit logs** (CloudTrail, Cloud Logging, Azure Monitor) record who accessed what; **data classification and masking** (row/column-level) protect PII in shared environments.\n\nFoundational habit: use roles, not keys; keep buckets private; encrypt everything; and review audit logs periodically."
        }
    ],
    questions: [
        {
            number: 1,
            difficulty: "easy",
            question: "Which AWS service is commonly used as a data lake?",
            answer: "Amazon S3 (Simple Storage Service) — a highly durable, scalable object store where raw files (Parquet, JSON, CSV) are landed as a data lake. Other storage analogs: GCP Cloud Storage (gs://) and Azure ADLS Gen2 (abfs://). Queries can run directly over the lake with Athena or load into Redshift."
        },
        {
            number: 2,
            difficulty: "easy",
            question: "What does 'serverless' mean for BigQuery and Athena?",
            answer: "Serverless means there is no cluster or server to provision, size, patch, or shut down — the provider runs the engine and you pay only for what you use. BigQuery charges per query and per TB stored; Athena charges per byte scanned from S3. You get automatic scaling and no operational overhead, at the cost of less control and a usage-based bill that rewards good partitioning and columnar file formats."
        },
        {
            number: 3,
            difficulty: "medium",
            question: "Compare Amazon Redshift, Google BigQuery, and Snowflake as data warehouses.",
            answer: "Redshift is a columnar MPP cluster on AWS: you pick node types and scale by adding nodes; RA3 separates compute from storage, and managed storage extends capacity independently. BigQuery is serverless: no cluster, pay-per-query and per-stored-TB, auto-scaling slots, real-time streaming ingest, tight GCP integration. Snowflake is a multi-cloud warehouse (AWS/GCP/Azure) with a central storage layer and independent virtual warehouses, so you scale compute concurrency without touching data, and it's famous for near-zero ops. Choose by ecosystem (Redshift in AWS), serverless scale (BigQuery in GCP), or multi-cloud flexibility + concurrency isolation (Snowflake)."
        },
        {
            number: 4,
            difficulty: "medium",
            question: "Why does file format and partitioning dramatically affect Athena query cost?",
            answer: "Athena bills per byte scanned. A CSV lake forces the engine to scan every byte of every column, and without partition keys it scans the entire table for any query. Parquet/ORC are columnar and compressed, so the engine reads only the columns the query needs and 5-10x fewer bytes; partition pruning (e.g. date=2024-01-01/ prefixes) lets it skip whole prefixes. A well-designed lake can make the same query 20-50x cheaper than the naive version — and also faster. Best practices: Parquet + gzip/snappy, partition on high-cardinality query filters like date, and avoid SELECT *."
        },
        {
            number: 5,
            difficulty: "medium",
            question: "What is the difference between a managed service and a self-hosted one, and how do you decide?",
            answer: "A managed service is run by the cloud provider: patching, failover, upgrades, and SLAs are their job (e.g. RDS, BigQuery, MWAA managed Airflow, MSK). A self-hosted setup runs the software on your own VMs or containers — you own upgrades, backups, security, scaling, and high availability. Managed costs more per unit but dramatically cuts engineering time and risk; self-hosted gives more control and customization at lower marginal cost but higher TCO when you count your team's time. The sensible split: managed for commodity components (warehouse, object storage, orchestration, queues), self-hosted only where you need customization or no managed option fits. Pick the option with the best total cost of ownership for the workload, not the cheapest sticker price."
        },
        {
            number: 6,
            difficulty: "medium",
            question: "List the main strategies for reducing a cloud data warehouse or lake bill.",
            answer: "(1) Storage: lifecycle/archive policies (S3 IA/Glacier, GCS Coldline), delete orphaned staging tables and old backups, use columnar compressed formats. (2) Compute: terminate idle Spark/EMR clusters, use spot/preemptible instances for resumable batches, autoscale, right-size instances, and use managed per-query engines instead of always-on clusters where possible. (3) Query: partition data and query only needed columns so per-byte-scanned engines bill less; separate batch vs interactive concurrency on Snowflake. (4) Network: avoid cross-region/cross-cloud data movement and egress. (5) Governance: tag resources, set budgets with alerts at 50/80/90%, and track cost per pipeline run."
        },
        {
            number: 7,
            difficulty: "medium",
            question: "How does IAM enforce least privilege for a data pipeline that reads S3 and writes Redshift?",
            answer: "The pipeline runs as a workload identity (e.g. an EC2 instance profile, EMR role, or a service account) instead of with static credentials. That identity is granted a scoped IAM policy: read access to only the S3 prefixes it ingests, and write access to only the Redshift cluster/database and schema it loads. Temporary credentials come from STS, are rotated automatically, and the policy can be versioned. Best practice: block public bucket access, deny access to unrelated buckets/databases, use KMS keys the role can decrypt, and log actions to CloudTrail/Audit Logs so you can review who did what. Least privilege means a compromised task or a misbehaving job can only touch its own slice of data."
        },
        {
            number: 8,
            difficulty: "hard",
            question: "Design a cost-efficient, secure multi-stage lakehouse on a single cloud. Include storage, processing, querying, and identity.",
            answer: "Layering (AWS example): (1) Raw zone on S3 with prefix partitioning (raw/date=YYYY-MM-DD/) in Standard; a lifecycle rule transitions untouched partitions to S3 IA after 30 days and Glacier after 180 days. (2) Processing with a managed, ephemeral engine — a Spark job on EMR Serverless or AWS Glue, autoscaled and terminated when idle, using spot-capable fleets, reading raw S3 and writing **Parquet, compressed, partitioned** into a Bronze/Silver lakehouse (Delta/Iceberg on S3). (3) Querying serverlessly: Athena for ad-hoc SQL on the lake (bills per byte scanned — hence Parquet + partitioning), and a small Redshift/Redshift Serverless cluster (or BigQuery/Snowflake equivalents) for governed modeled tables and BI concurrency. (4) Identity and security: IAM roles with least privilege per stage; S3 bucket policies with public-access block; KMS encryption at rest, TLS in transit; secrets in Secrets Manager; VPC endpoints so services never traverse the public internet; CloudTrail audit logging. (5) Cost controls: budgets at 50/80/90%, resource tags per job, and a cost-per-pipeline dashboard. This is cheap (serverless + lifecycle + columnar), secure (identity + encryption + audit), and scalable."
        },
        {
            number: 9,
            difficulty: "hard",
            question: "You must move 200 TB of on-premises data to S3 over a 1 Gbps link within 30 days. Design the transfer and explain the trade-offs.",
            answer: "First compute the math: 1 Gbps ~ 0.125 GB/s → ~10.8 TB/day theoretical, ~270 TB/25 days at 80% efficiency — it can fit but barely, and depends on uplink stability. The robust design: (1) Use **AWS Snowball Edge** for the bulk — ship a physical appliance, load the 200 TB on-prem, send it to AWS to be loaded into S3; a 200 TB transfer by physical media takes days not weeks and avoids network costs entirely. (2) While the Snowball ships, stream the small hot/recent datasets via **S3 Transfer Acceleration** or parallel `aws s3 sync` from the on-prem site to keep recent data fresh. (3) Use **S3 multipart upload** with parallel streams and resume-able checkpoints; verify with checksums (ETags/md5) and a reconciliation pass comparing source vs S3 object counts and sizes. Trade-offs: Snowball is fast, cheap for bulk, and offline, but has 2-4 weeks end-to-end latency and requires physical handling; direct network transfer is continuous and near-real-time but costs egress bandwidth, takes ~30 days at the margin, and competes with production bandwidth. The practical answer is hybrid: appliance for the baseline, streaming for the delta, then a final reconciliation to close the gap."
    }
    ]
};

if (typeof window !== 'undefined') {
    window.cloudDataData = cloudDataData;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = cloudDataData;
}