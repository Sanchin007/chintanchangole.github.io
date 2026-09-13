window.PROJECTS = [
  {
    id:"cma-ecommerce", order:1, company:"Google Cloud | Deployed at CMA CGM HQ", category:"ecommerce", featured:true, spotlight:true,
    kicker:"E-COMMERCE OPERATIONS TRANSFORMATION", title:"CMA CGM E-Commerce Operations & Automation",
    subtitle:"Process diagnosis · operational analytics · functional design · workflow automation · UAT · adoption",
    metric:"€2.3M", metricLabel:"annual efficiency savings contribution", scale:"8 business units · 12 countries · 800 users",
    roleSummary:"Owned the bridge from frontline process diagnosis to buildable requirements, automation, validation and scaled adoption.",
    impact:"Workflow and process improvements contributed to €2.3M in annual efficiency savings, while the broader rollout trained 800 users across 12 countries and strengthened operational consistency.",
    tags:["E-Commerce Operations","Process Diagnosis","SQL / Python","Functional Specs","API Connectors","Workflow Automation","AI Agent Prompts","UAT","Adoption"],
    cardFlow:["Diagnose","Measure","Specify","Automate","Adopt"],
    problem:"Operational workflows across commercial, compliance and operations contained repetitive administrative work, cross-team handoffs and process friction. The transformation needed to start with the real operating process, quantify the problem, define a controlled target state and automate only the work that created measurable value.",
    before:[
      "Frontline process knowledge distributed across users, handoffs and local ways of working.",
      "Repetitive document, data-extraction and routing tasks created avoidable administrative effort.",
      "Operational friction was difficult to prioritize without a consistent baseline and impact view.",
      "Process changes risked becoming technology-led unless requirements and acceptance criteria were defined first."
    ],
    after:[
      "Current-state and target-state workflows made actors, exceptions and ownership explicit.",
      "SQL / Python deep dives and dashboards established measurable baselines and opportunity sizing.",
      "Functional specifications translated business friction into rules, controls and testable acceptance criteria.",
      "Python, API connectors and AI-agent prompts automated document processing, extraction and routing where appropriate.",
      "UAT, documentation, training, super users and adoption tracking carried the change into operations."
    ],
    beforeArchitecture:["Frontline requests","Manual handoffs","Repeated entry / extraction","Fragmented operational tools","Local checks","Limited feedback"],
    afterArchitecture:["Operational user / request","Guided workflow","Rules + Python automation","AI-assisted extraction / routing","API-connected systems","KPI + adoption + support loop"],
    architectureChange:[
      "Control moved from people remembering the process to the workflow making state, ownership and exceptions explicit.",
      "Automation was introduced after process mapping and measurement, not before.",
      "System actions moved behind controlled API / workflow boundaries instead of ad-hoc manual updates.",
      "Usage, support and KPI signals became part of the operating loop rather than post-project reporting."
    ],
    contribution:[
      "Shadowed frontline workflows with functional leads and super users; mapped handoffs, repetitive work, exceptions and failure points.",
      "Used SQL / Python analysis, deep-dive reports and dashboards to quantify friction and size improvement opportunities.",
      "Translated bottlenecks into detailed functional specifications, process/data flows, business rules and acceptance criteria with tech and data teams.",
      "Scripted and coordinated Python/API workflow automation, including AI-agent prompts for document processing, data extraction and operational routing.",
      "Coordinated feature validation and UAT against real operational scenarios before deployment.",
      "Delivered documentation, training, communications and super-user enablement; tracked adoption and support signals after release."
    ],
    runtime:[
      ["Discover","Frontline workflow","Observe real operational requests, documentation, handoffs and exceptions before selecting a solution.","human"],
      ["Quantify","SQL / Python","Measure volume, cycle time, rework, quality issues and repetitive handling to establish a baseline.","data"],
      ["Specify","Functional design","Convert the target process into business rules, requirements, acceptance criteria and exception paths.","spec"],
      ["Orchestrate","Workflow state","Route work through explicit states, deterministic rules, ownership and controlled retries.","process"],
      ["Augment","AI-assisted processing","Use AI-agent prompts for unstructured extraction or routing while keeping business controls explicit.","ai"],
      ["Execute","API / back-office action","Write approved actions into operational tools through controlled integration boundaries.","system"],
      ["Validate","UAT + controls","Test end-to-end scenarios, permissions, exceptions and business outcomes before operational sign-off.","quality"],
      ["Adopt","Training + feedback","Track usage, support demand and KPI movement; feed recurring friction into the next improvement cycle.","outcome"]
    ],
    architecture:[
      ["EXPERIENCE","Operational user / request","Frontline work · guided journey"],
      ["PROCESS","Target-state workflow","State · ownership · business rules"],
      ["AUTOMATION","Python + workflow","Deterministic processing · routing"],
      ["AI ASSIST","AI-agent prompts","Extract · classify · route unstructured input"],
      ["INTEGRATION","API connectors","Controlled system synchronization"],
      ["CONTROL","Permissions · validation · audit","Exceptions · evidence · SLA"],
      ["MEASUREMENT","Dashboard + adoption","Time saved · quality · usage · support"]
    ],
    controls:["Process baseline","Acceptance criteria","Validation before action","Retry / exception path","Human review where needed","Permissions","Audit evidence","UAT evidence","Usage + KPI tracking"],
    toolGroups:[
      ["Process & analysis",["Process mapping","SQL","Python","Deep-dive reporting","Dashboard analysis"]],
      ["Automation & integration",["Python","API connectors","Workflow automation","AI-agent prompts","Low-code tooling"]],
      ["Governance & adoption",["DataHub","User permissions","SaaS administration","Training","Super-user network","Adoption tracking"]],
      ["Delivery",["Functional specifications","Acceptance criteria","Feature testing","UAT","Cross-functional sprint coordination"]]
    ],
    artifacts:["Current-state process drawing","Deep-dive report","Project impact report","Functional specification","Process / data-flow design","UAT evidence","User documentation","Training pack","Adoption / usage dashboard"],
    decisions:[
      "Diagnose and baseline the process before selecting automation.",
      "Keep deterministic business rules explicit; use AI only for unstructured or judgement-heavy steps.",
      "Validate before enterprise-system actions and preserve an exception path.",
      "Treat adoption and support data as product signals for the next release."
    ]
  },
  {
    id:"cma-application", order:2, company:"Google Cloud | Deployed at CMA CGM HQ", category:"architecture", featured:true,
    kicker:"APPLICATION ARCHITECTURE", title:"Back-Office Operations Application Architecture",
    subtitle:"Low-code UI · Python · SQL · APIs · identity & access · auditability · adoption telemetry",
    metric:"12", metricLabel:"countries in scaled operational rollout", scale:"Operational back-office pattern · role-based usage",
    roleSummary:"Translated operational requirements into a structured application boundary spanning user journey, workflow, integrations, data, controls and telemetry.",
    impact:"Production-grade back-office applications and dashboards replaced manual operational tasks and made weekly active users, adoption and platform performance measurable across 12 countries.",
    tags:["Application Architecture","Low-code","Python","SQL","APIs","Identity & Access","Audit","KPI / WAU"],
    cardFlow:["Access","Work","Validate","Integrate","Observe"],
    problem:"Frontline teams needed a simpler operational interface over fragmented enterprise tools. The application had to reduce manual handling while protecting permissions, business rules, data quality, traceability and supportability.",
    before:[
      "Users navigated multiple operational tools and manual handoffs to complete one business task.",
      "Workflow state lived partly in user knowledge rather than a recoverable system state.",
      "Validation and permissions could be applied inconsistently across manual steps.",
      "Usage, error and support signals were not naturally tied to the application journey."
    ],
    after:[
      "A guided low-code user journey presents a clear work queue and role-specific actions.",
      "Workflow state and validation are explicit before downstream actions are executed.",
      "Python / SQL handle custom logic and operational state while APIs isolate enterprise integrations.",
      "Permissions, audit evidence, usage KPIs and support feedback are built into the operating model."
    ],
    beforeArchitecture:["Operations user","Multiple tools","Manual checks","Direct system updates","Local spreadsheets","Reactive support"],
    afterArchitecture:["Role-based user journey","Low-code UI","Workflow + validation","Python / API boundary","SQL operational state","Audit + KPI + support"],
    architectureChange:[
      "The user journey is separated from integration complexity.",
      "Workflow state becomes explicit and recoverable instead of implicit in manual handoffs.",
      "Validation and permission checks happen before downstream actions.",
      "Observability and adoption telemetry become first-class application capabilities."
    ],
    contribution:[
      "Designed the application around the operational journey rather than exposing enterprise-system complexity directly to users.",
      "Structured guided work queues and explicit workflow states for recoverable operations.",
      "Combined low-code delivery with Python and SQL for custom logic, data preparation and operational state.",
      "Kept enterprise integrations behind API boundaries and applied validation before system actions.",
      "Designed role permissions, audit evidence, usage KPIs and support feedback as platform requirements."
    ],
    runtime:[
      ["Access","Identity & permissions","Resolve the user role before exposing workflow actions or business data.","control"],
      ["Work","Guided UI","Present a focused work queue and guided operational journey.","human"],
      ["Validate","Business rules","Check required data, process state and rules before integration calls.","quality"],
      ["Process","Workflow + Python","Manage state and custom logic in a recoverable execution path.","process"],
      ["Integrate","API boundary","Read and write enterprise tools through controlled integrations.","system"],
      ["Persist","SQL + audit","Store operational state and traceable change evidence.","data"],
      ["Observe","KPI + support","Track WAU, completion, errors and tickets to improve the next release.","outcome"]
    ],
    architecture:[
      ["USER","Operations user","Role-based guided journey"],
      ["ACCESS","Identity + permissions","Authentication / authorization pattern"],
      ["APPLICATION","Low-code UI","Work queue · forms · views"],
      ["WORKFLOW","State + validation","Business rules · recoverability"],
      ["LOGIC","Python service","Custom processing · enrichment"],
      ["INTEGRATION","API boundary","Controlled enterprise-system access"],
      ["DATA","SQL operational store","State · history · reconciliation"],
      ["OPERATIONS","Audit + KPI + support","Errors · usage · backlog"]
    ],
    controls:["Role permissions","Validation","Explicit workflow state","API boundary","Audit evidence","Error handling","Usage KPI","Support-to-backlog"],
    toolGroups:[
      ["Application",["Low-code tooling","Python","SQL","Workflow design"]],
      ["Integration",["API connectors","Enterprise SaaS / operational tools","Validation rules"]],
      ["Control",["Identity & access","User permissions","Audit evidence","Data quality"]],
      ["Operations",["Dashboards","Weekly active users","Adoption tracking","Support tickets"]]
    ],
    artifacts:["Application flow","Functional specification","Role / permission model","Validation rules","API / data-flow design","UAT scenarios","Usage dashboard","Support backlog"],
    decisions:[
      "Design from the user journey outward, not from existing system boundaries inward.",
      "Keep integration logic behind APIs rather than coupling the UI directly to enterprise systems.",
      "Make workflow state explicit so failed or interrupted work can be recovered.",
      "Use production telemetry and support demand to prioritize application improvements."
    ]
  },
  {
    id:"cma-process-intelligence", order:3, company:"Google Cloud | Deployed at CMA CGM HQ", category:"analytics", featured:true,
    kicker:"PROCESS INTELLIGENCE + GOVERNANCE", title:"Enterprise Operational Analytics & Process Intelligence",
    subtitle:"SQL · KPI model · Power BI · DataHub · data quality · root-cause analysis",
    metric:"35%", metricLabel:"reduction in data inconsistencies", scale:"Governed operational analytics · 12-country rollout",
    roleSummary:"Connected operational data to governed KPI definitions, process bottlenecks, root-cause analysis and owned improvement actions.",
    impact:"Platform governance, data-quality controls and governed operational analytics supported a 35% reduction in data inconsistencies across the scaled operating model.",
    tags:["SQL","Power BI","DataHub","Data Quality","Process Mapping","KPI Governance","Root Cause"],
    cardFlow:["Source","Model","Detect","Explain","Act"],
    problem:"Operational teams needed a consistent route from raw system data to trustworthy KPIs, process bottlenecks and quantified improvement opportunities.",
    before:[
      "Operational data and local calculations created competing views of performance.",
      "KPI movement could be visible without a clear link to the process step causing it.",
      "Data-quality gaps reduced confidence in prioritization and reporting.",
      "Ownership of definitions and remediation actions was difficult to make explicit."
    ],
    after:[
      "SQL transformations and data-quality checks create a trusted operational foundation.",
      "Governed KPI definitions give stakeholders one performance language.",
      "Process mapping links transactions to steps, handoffs, delay and rework.",
      "Power BI deep dives move from KPI movement to operational cause and owned action.",
      "DataHub documentation strengthens ownership, context and governance evidence."
    ],
    beforeArchitecture:["ERP / SaaS data","Local extracts","Spreadsheet logic","Multiple KPI definitions","Manual root cause","Ad-hoc actions"],
    afterArchitecture:["Source systems","SQL + data quality","Process model","Governed KPI layer","Power BI deep dive","DataHub + owned actions"],
    architectureChange:[
      "Business logic moves from local calculations into a governed transformation / KPI layer.",
      "Process context is modeled alongside data so a metric can be traced to an operational cause.",
      "Data-quality checks become a gate before decision-making.",
      "Insights close with an owner, action and re-measurement loop."
    ],
    contribution:[
      "Connected operational data through SQL transformations and quality controls.",
      "Defined governed KPI logic and dashboard structures for consistent decision-making.",
      "Mapped data signals to process steps and handoffs to expose delay, rework and quality friction.",
      "Built deep-dive patterns that move from KPI movement to operational root cause.",
      "Used DataHub governance and owned improvement actions to close the loop from insight to accountability."
    ],
    runtime:[
      ["Collect","ERP / SaaS / operational data","Align operational signals from source systems.","input"],
      ["Transform","SQL + quality","Clean, join and apply business logic with trust checks.","data"],
      ["Model","Process + KPI","Map data to process stages and governed performance definitions.","model"],
      ["Detect","Bottleneck logic","Identify delay, rework, quality gaps and SLA exceptions.","control"],
      ["Investigate","Power BI + deep dive","Drill from KPI movement to the operational cause.","human"],
      ["Prioritize","Impact report","Convert root causes into owned, quantified actions.","process"],
      ["Re-measure","Closed loop","Measure the result after the intervention and update governance evidence.","outcome"]
    ],
    architecture:[
      ["SOURCE","ERP · SaaS · operational data","Transactions · events"],
      ["PREP","SQL + data quality","Business logic · completeness · reconciliation"],
      ["PROCESS MODEL","Steps + handoffs","Operational context"],
      ["KPI MODEL","Governed definitions","One metric language"],
      ["INSIGHT","Power BI","Dashboard · drill-down · deep dive"],
      ["GOVERNANCE","DataHub","Ownership · documentation"],
      ["ACTION","Impact + owner","Prioritize · execute · re-measure"]
    ],
    controls:["KPI definition","Data quality","Ownership","Baseline","Reconciliation","Root-cause evidence","Action owner","Re-measurement"],
    toolGroups:[
      ["Data & analytics",["SQL","Python","Power BI","Dashboard design"]],
      ["Process intelligence",["Process mapping","KPI modeling","Deep-dive reporting","Impact analysis"]],
      ["Governance",["DataHub","Data quality","Ownership","Documentation"]]
    ],
    artifacts:["KPI dictionary","Dashboard","Deep-dive report","Impact report","Process map","Data-quality checks","DataHub documentation","Action tracker"],
    decisions:[
      "Use one governed KPI definition across stakeholders.",
      "Baseline performance before changing the process.",
      "Design dashboards to drill from metric to cause, not just display status.",
      "Every improvement action needs an owner and a re-measurement point."
    ]
  },
  {
    id:"volvo-optimization", order:4, company:"Volvo Group", category:"volvo", featured:true,
    kicker:"SUPPLY CHAIN PROCESS IMPROVEMENT", title:"Supply Chain & Inventory Optimization",
    subtitle:"SQL · Python · operational deep dives · requirements · automation · planning",
    metric:"15%", metricLabel:"reduction in excess-stock costs", scale:"Supply chain + procurement · Gothenburg / Bengaluru collaboration",
    roleSummary:"Diagnosed operational friction, converted data into structured requirements and coordinated process improvements across international teams.",
    impact:"Data-driven process improvements across supply chain and procurement contributed to a 15% reduction in excess-stock costs.",
    tags:["Volvo Group","SQL","Python","Supply Chain","Procurement","Dashboards","Process Improvement"],
    cardFlow:["Diagnose","Analyze","Prioritize","Intervene","Measure"],
    problem:"Complex supply-chain and procurement flows made excess inventory expensive and operational bottlenecks difficult to prioritize. Planning decisions needed clearer data evidence, structured governance and process discipline.",
    before:[
      "Supply-chain and procurement friction was distributed across teams and system data.",
      "Planning decisions could become reactive when bottlenecks were not quantified consistently.",
      "Excess stock required a clearer view of drivers, ownership and actionable exceptions.",
      "Cross-functional coordination between Gothenburg and Bengaluru needed structured requirements and delivery cadence."
    ],
    after:[
      "SQL / Python deep dives established baselines and identified operational drivers.",
      "Dashboards and impact reports made exceptions and priorities visible.",
      "Bottlenecks were translated into structured functional requirements and improvement actions.",
      "Process change, automation and governance supported planning and inventory decisions.",
      "Outcome tracking connected intervention to the 15% reduction in excess-stock costs."
    ],
    beforeArchitecture:["ERP / supply-chain data","Manual extracts","Reactive analysis","Unstructured exceptions","Local decisions","Limited outcome feedback"],
    afterArchitecture:["Operational data","SQL / Python analysis","Exception / KPI layer","Prioritized action","Planner / procurement decision","Measured outcome"],
    architectureChange:[
      "Operational data becomes a repeatable analysis layer instead of one-off investigation.",
      "Exceptions are prioritized by measurable business impact.",
      "Improvement actions connect to specific planners / procurement decisions.",
      "Realized outcomes are measured against the original baseline."
    ],
    contribution:[
      "Diagnosed process friction across supply chain and procurement using SQL / Python performance analysis.",
      "Produced deep-dive reports and dashboards to quantify bottlenecks and improvement opportunities.",
      "Translated findings into structured requirements and coordinated delivery with Gothenburg and Bengaluru teams.",
      "Supported data-driven process improvements and automation for planning and inventory decisions.",
      "Tracked business outcome through the 15% reduction in excess-stock costs."
    ],
    runtime:[
      ["Collect","Supply-chain data","Bring together orders, inventory and procurement performance signals.","input"],
      ["Analyze","SQL / Python","Segment, join and quantify the operational drivers behind excess stock.","data"],
      ["Detect","Exceptions","Surface high-impact friction and prioritize by business value.","control"],
      ["Specify","Requirements","Translate the analysis into process and system changes.","spec"],
      ["Intervene","Process + automation","Apply standardization, automation and decision-support actions.","process"],
      ["Decide","Planning / procurement","Support accountable planner and buyer decisions.","human"],
      ["Measure","Cost outcome","Compare realized outcome against the baseline.","outcome"]
    ],
    architecture:[
      ["SOURCES","Supply chain + procurement","Orders · stock · performance"],
      ["ANALYSIS","SQL + Python","Clean · join · segment · exception logic"],
      ["KPI","Dashboard + impact","Baseline · root cause · value"],
      ["INTERVENTION","Process / automation","Standardize · automate · prioritize"],
      ["DECISION","Planner / procurement","Review · approve · act"],
      ["OUTCOME","Cost + service","Measure realized impact"]
    ],
    controls:["Baseline","Data quality","Exception logic","Action owner","Cross-functional requirements","KPI cadence","Outcome measurement"],
    toolGroups:[
      ["Analysis",["SQL","Python","Dashboards","Deep-dive reporting"]],
      ["Process",["Process mapping","Functional scoping","LEAN / standardization","Automation"]],
      ["Delivery",["Cross-functional coordination","Sprint delivery","Impact reporting","Change support"]]
    ],
    artifacts:["Process map","Deep-dive report","Dashboard","Project impact report","Functional requirements","Action tracker","Outcome review"],
    decisions:[
      "Quantify the stock problem before prescribing a process change.",
      "Prioritize operational exceptions by business impact, not volume alone.",
      "Keep planners / procurement owners accountable for final decisions.",
      "Judge success by realized cost / service outcome, not analytics output alone."
    ]
  },
  {
    id:"volvo-data-platform", order:5, company:"Volvo Group", category:"volvo", featured:false,
    kicker:"SUPPLY CHAIN DATA ENGINEERING", title:"Supply Chain ETL & Analytics Platform",
    subtitle:"Azure Databricks · PySpark · Informatica IICS · Spark MLlib · data quality",
    metric:"500M+", metricLabel:"rows processed monthly", scale:"Enterprise ETL · supply-chain analytics",
    roleSummary:"Built scalable data-integration and transformation patterns so planning and analytics teams could work from reliable, reusable supply-chain data.",
    impact:"The data platform improved the reliability and scalability of downstream demand planning, parts forecasting and inventory analytics.",
    tags:["Azure Databricks","PySpark","Informatica IICS","Spark MLlib","scikit-learn","Data Quality"],
    cardFlow:["Ingest","Transform","Validate","Model","Serve"],
    problem:"Supply-chain analytics depended on large volumes of ERP and operational data that required scalable integration, transformation and quality controls before planning teams could trust downstream output.",
    before:[
      "ERP and operational data arrived through multiple enterprise integration paths.",
      "Large data volumes made repeatable transformation and performance important engineering concerns.",
      "Analytics and ML use cases depended on consistent data-quality controls upstream.",
      "Downstream planning needed curated rather than source-specific datasets."
    ],
    after:[
      "Informatica IICS provides governed enterprise ingestion.",
      "Azure Databricks / PySpark handle large-scale transformation and enrichment.",
      "Validation and reconciliation act as a trust gate before consumption.",
      "Curated data supports reporting, planning and ML-oriented features.",
      "Performance tuning and quality feedback improve the pipeline over time."
    ],
    beforeArchitecture:["ERP / operational sources","Multiple ingestion paths","Source-specific transforms","Manual quality investigation","Siloed analytics"],
    afterArchitecture:["Informatica IICS","Raw / staged layer","Databricks + PySpark","Quality gate","Curated analytics / ML","Planning consumers"],
    architectureChange:[
      "Ingestion, transformation and validation become explicit layers with clear responsibilities.",
      "Distributed processing handles scale while preserving reusable transformation logic.",
      "Quality controls move before analytics and ML consumption.",
      "Curated datasets decouple downstream teams from source-system complexity."
    ],
    contribution:[
      "Built and supported enterprise ETL patterns processing 500M+ rows per month on Azure Databricks.",
      "Used Informatica IICS to connect ERP data with downstream analytical systems.",
      "Applied PySpark transformations and data-quality controls across supply-chain domains.",
      "Worked with scikit-learn / Spark MLlib patterns for classification and recommendation-oriented use cases.",
      "Focused performance optimization on reliable downstream planning, forecasting and inventory use."
    ],
    runtime:[
      ["Ingest","ERP + operational sources","Move enterprise data through governed integration pipelines.","input"],
      ["Land","Raw / staged data","Preserve source-aligned history for repeatable processing.","data"],
      ["Transform","Databricks / PySpark","Clean, join, enrich and aggregate at distributed scale.","process"],
      ["Validate","Data quality","Check completeness, validity and reconciliation before consumption.","quality"],
      ["Model","Analytics / ML features","Prepare planning, forecasting and classification-ready datasets.","ai"],
      ["Serve","Analytics systems","Expose curated outputs to reporting and decision workflows.","system"],
      ["Optimize","Performance loop","Tune transformations and quality checks based on workload behavior.","outcome"]
    ],
    architecture:[
      ["SOURCE","ERP + operational systems","Supply-chain data"],
      ["INTEGRATION","Informatica IICS","Enterprise ingestion"],
      ["COMPUTE","Azure Databricks + PySpark","Distributed transformation"],
      ["QUALITY","Validation + reconciliation","Trust gate"],
      ["ANALYTICS","Curated datasets","Planning + reporting"],
      ["ML","Spark MLlib / scikit-learn","Classification / recommendations"],
      ["OUTCOME","Planning + inventory","Decision support"]
    ],
    controls:["Schema / completeness","Reconciliation","Partitioning / performance","Release controls","Downstream validation"],
    toolGroups:[
      ["Integration",["Informatica IICS","ERP data integration"]],
      ["Compute",["Azure Databricks","PySpark"]],
      ["ML / analytics",["Spark MLlib","scikit-learn","Curated datasets"]],
      ["Quality",["Validation","Reconciliation","Performance optimization"]]
    ],
    artifacts:["ETL design","Transformation jobs","Data-quality checks","Curated datasets","Performance review","ML-ready feature outputs"],
    decisions:[
      "Separate ingestion from distributed transformation so each layer can scale independently.",
      "Block unreliable data before it reaches analytics / ML consumers.",
      "Keep curated outputs stable even when upstream source structures vary.",
      "Optimize for production reliability, not only transformation speed."
    ]
  },
  {
    id:"maia-rag", order:6, company:"Google Cloud | CMA CGM context", category:"ai", featured:false,
    kicker:"DOCUMENT AI + KNOWLEDGE RETRIEVAL", title:"MAIA AI Platform — NLP, Embeddings & RAG",
    subtitle:"Document processing · entity extraction · embeddings · semantic retrieval · API serving",
    metric:"RAG", metricLabel:"enterprise knowledge retrieval pattern", scale:"Contracts · bills of lading · compliance knowledge",
    roleSummary:"Built the data and retrieval pattern that converts unstructured enterprise documents into searchable, grounded AI context.",
    impact:"AI-ready document pipelines supported compliance automation and faster access to commercial knowledge.",
    tags:["NLP","Embeddings","RAG","Vertex AI","Document AI","Vector Search","Cloud Run"],
    cardFlow:["Ingest","Extract","Embed","Retrieve","Serve"],
    problem:"Useful commercial and compliance knowledge lived inside unstructured documents that traditional structured analytics could not retrieve effectively.",
    before:[
      "Users relied on manual search across long, unstructured enterprise documents.",
      "Important entities and clauses were not available as reusable structured context.",
      "Keyword search alone could miss semantically relevant passages.",
      "Applications had no standardized retrieval service for grounded AI use."
    ],
    after:[
      "Document pipelines extract text, entities and metadata into retrieval-ready chunks.",
      "Embeddings represent semantic meaning for documents and user queries.",
      "Vector search retrieves relevant context before generation.",
      "RAG grounds model output in retrieved enterprise content.",
      "Cloud Run API serving decouples consuming applications from retrieval internals."
    ],
    beforeArchitecture:["Documents","Manual search","Keyword lookup","User interpretation","One-off answers"],
    afterArchitecture:["Document AI / extraction","Chunk + metadata","Vertex AI embeddings","Vector retrieval","RAG","Cloud Run API"],
    architectureChange:[
      "Unstructured documents become a reusable retrieval corpus rather than isolated files.",
      "Semantic retrieval replaces exact-match-only discovery.",
      "Generation happens after retrieval so responses can be grounded in enterprise context.",
      "An API boundary allows multiple applications to consume the same capability."
    ],
    contribution:[
      "Built AI-ready pipelines for document processing and entity extraction.",
      "Prepared chunked content and embeddings for semantic retrieval.",
      "Used vector search to retrieve relevant enterprise context for RAG workflows.",
      "Designed the serving pattern so applications consume the capability through an API boundary."
    ],
    runtime:[
      ["Ingest","Enterprise documents","Receive contracts, bills of lading and compliance content.","input"],
      ["Extract","Text + entities","Normalize unstructured content into searchable units.","process"],
      ["Chunk","Context + metadata","Split content into retrieval-ready passages.","data"],
      ["Embed","Vertex AI","Generate semantic representations for content and queries.","ai"],
      ["Retrieve","Vector search","Select relevant enterprise context before generation.","control"],
      ["Generate","RAG","Produce grounded output using retrieved context.","ai"],
      ["Serve","Cloud Run API","Expose the capability to downstream applications.","system"]
    ],
    architecture:[
      ["DOCUMENTS","Contracts · BoL · compliance","Unstructured content"],
      ["PREP","Document AI + chunking","Text · entities · metadata"],
      ["EMBED","Vertex AI embeddings","Semantic vectors"],
      ["INDEX","Vector search","Retrieval store"],
      ["QUERY","Semantic retrieval","Relevant context"],
      ["RAG","Grounded generation","Context + model"],
      ["SERVE","Cloud Run API","Application access"]
    ],
    controls:["Document metadata","Retrieval relevance","Grounded context","API boundary","Latency monitoring","Sensitive-output validation"],
    toolGroups:[
      ["Document processing",["Document AI","NLP","Entity extraction","Chunking"]],
      ["Retrieval",["Vertex AI embeddings","Vector search","Semantic retrieval"]],
      ["Serving",["RAG","Cloud Run","API serving"]]
    ],
    artifacts:["Document-processing pipeline","Entity schema","Chunk / metadata model","Embedding pipeline","Retrieval flow","API serving design"],
    decisions:[
      "Retrieve enterprise evidence before generation.",
      "Keep metadata with chunks so retrieved context remains traceable.",
      "Separate retrieval from application UI through a service boundary.",
      "Measure retrieval / serving behavior as production system behavior, not only model output."
    ]
  },
  {
    id:"microsoft-ai", order:7, company:"Microsoft", category:"ai", featured:false,
    kicker:"ML CLASSIFICATION + PRODUCTION VALIDATION", title:"Azure AI Classification & Production Sign-Off",
    subtitle:"Azure AI · data quality · classification · validation · stakeholder sign-off",
    metric:"PROD", metricLabel:"production-oriented classification", scale:"Machine-learning engineering internship",
    roleSummary:"Built classification models with data-quality controls and carried results through validation and non-technical stakeholder sign-off.",
    impact:"The project demonstrated controlled ML delivery where data quality, validation and stakeholder acceptance were part of production readiness.",
    tags:["Azure AI","Classification","Data Quality","Validation","Production Sign-Off"],
    cardFlow:["Prepare","Train","Validate","Explain","Sign off"],
    problem:"A classification model can look strong in experimentation and still fail as a business solution if input quality, validation and stakeholder acceptance are not controlled.",
    before:[
      "Classification work depended on manual interpretation and inconsistent repeatability.",
      "Poor-quality input could undermine model output before the model was even evaluated.",
      "Technical metrics alone were insufficient for operational acceptance.",
      "Non-technical stakeholders needed a clear explanation of results before production use."
    ],
    after:[
      "Azure AI classification provides a repeatable prediction workflow.",
      "Data-quality checks protect model inputs.",
      "Validation evidence accompanies model performance.",
      "Results are translated into language non-technical stakeholders can evaluate.",
      "Production sign-off becomes an explicit delivery gate."
    ],
    beforeArchitecture:["Input records","Manual interpretation","Inconsistent checks","Ad-hoc result","Stakeholder review"],
    afterArchitecture:["Quality gate","Azure AI classifier","Validation metrics","Result explanation","Production sign-off"],
    architectureChange:[
      "Input quality becomes a first-class control before model inference.",
      "Model output is paired with validation evidence rather than presented in isolation.",
      "Stakeholder communication is part of the production path.",
      "Release readiness is based on both technical and business acceptance."
    ],
    contribution:[
      "Built ML classification models on Azure AI services.",
      "Applied data-quality controls before production decisioning.",
      "Validated model results and communicated findings to non-technical stakeholders.",
      "Supported the solution through production sign-off."
    ],
    runtime:[
      ["Prepare","Input + quality","Validate data and prepare consistent model input.","quality"],
      ["Classify","Azure AI","Generate the classification result.","ai"],
      ["Validate","Metrics + checks","Evaluate output quality and production suitability.","control"],
      ["Explain","Stakeholder translation","Communicate result, limitations and decision relevance clearly.","human"],
      ["Approve","Production sign-off","Move forward only after technical and stakeholder acceptance.","outcome"]
    ],
    architecture:[
      ["INPUT","Business records","Classification source"],
      ["QUALITY","Data checks","Validity · completeness"],
      ["MODEL","Azure AI","Classification"],
      ["VALIDATION","Metrics + evidence","Production suitability"],
      ["COMMUNICATION","Stakeholder review","Explain outcome"],
      ["SIGN-OFF","Production gate","Approved use"]
    ],
    controls:["Input quality","Validation evidence","Model performance","Stakeholder communication","Production sign-off"],
    toolGroups:[
      ["ML",["Azure AI","Classification"]],
      ["Quality",["Data-quality controls","Validation"]],
      ["Delivery",["Stakeholder communication","Production sign-off"]]
    ],
    artifacts:["Model experiment","Data-quality checks","Validation summary","Stakeholder readout","Production sign-off evidence"],
    decisions:[
      "Treat data quality as part of model performance.",
      "Do not stop at technical metrics; translate results into business decision context.",
      "Use explicit sign-off before production use."
    ]
  },
  {
    id:"cma-governance", order:8, company:"Google Cloud | Deployed at CMA CGM HQ", category:"governance", featured:false,
    kicker:"CHANGE + PLATFORM GOVERNANCE", title:"Scaled Adoption, SaaS Governance & Operational Support",
    subtitle:"Documentation · training · super users · permissions · licences · DataHub · support loop",
    metric:"800+", metricLabel:"users trained across 12 countries", scale:"Change management · SaaS governance · operational support",
    roleSummary:"Carried solutions beyond deployment through user enablement, permissions, licence visibility, DataHub documentation and support-to-backlog feedback.",
    impact:"Structured change management supported full adoption across 12 countries, while governance controls helped reduce data inconsistencies by 35% across deployed platforms.",
    tags:["Change Management","Training","Super Users","SaaS Admin","DataHub","Permissions","Support"],
    cardFlow:["Release","Enable","Adopt","Govern","Improve"],
    problem:"Scaled rollout required more than deployment: users needed role-specific enablement, local support, controlled access, licence visibility, ownership and a structured mechanism for recurring friction.",
    before:[
      "Deployment risked being treated as the end of the project rather than the start of operational adoption.",
      "Permissions, licences, documentation and ownership could become fragmented as usage scaled.",
      "Users needed local champions and support routes for fast operational unblock.",
      "Recurring support themes were not useful unless converted into product / process improvements."
    ],
    after:[
      "Role-based documentation and training prepare users before and after release.",
      "Super-user networks provide local support and reinforce adoption across countries.",
      "Permissions, tool configuration and active-vs-unassigned licences are governed explicitly.",
      "DataHub documentation strengthens ownership and platform context.",
      "Support tickets and open-hour themes feed prioritized backlog improvements."
    ],
    beforeArchitecture:["Release","Users self-learn","Scattered permissions","Unclear licence usage","Reactive support","Issues repeat"],
    afterArchitecture:["Release + UAT","Docs + training","Super users","Permissions + licence governance","DataHub ownership","Support → backlog"],
    architectureChange:[
      "Change management becomes part of the release architecture rather than a communication afterthought.",
      "Access and licence controls are tied to actual usage.",
      "Governance documentation creates explicit ownership and context.",
      "Support demand becomes a structured input to continuous improvement."
    ],
    contribution:[
      "Authored user documentation and designed / delivered training for different user profiles.",
      "Ran communications and supported a super-user network across 12 countries.",
      "Tracked weekly active users and adoption after deployment.",
      "Managed user permissions, tool settings and active-versus-unassigned SaaS licences.",
      "Maintained DataHub governance documentation and converted support themes into improvement priorities."
    ],
    runtime:[
      ["Release","Production","Move the approved solution into the operational environment.","system"],
      ["Enable","Docs + training","Prepare each user role with practical guidance.","human"],
      ["Scale","Super users","Create local champions and first-line support.","human"],
      ["Measure","WAU / adoption","Track whether the system is actually used.","data"],
      ["Govern","Permissions / licences / DataHub","Maintain access, ownership, configuration and cost discipline.","control"],
      ["Support","Tickets / open hours","Unblock users and identify recurring process friction.","process"],
      ["Improve","Backlog","Convert recurring issues into owned product / process changes.","outcome"]
    ],
    architecture:[
      ["RELEASE","Production + UAT","Operational handoff"],
      ["CHANGE","Documentation + communications","Role-specific enablement"],
      ["TRAINING","Sessions + super users","Local capability"],
      ["ADOPTION","WAU / usage","Behavior evidence"],
      ["GOVERNANCE","Permissions + licences","Access + cost discipline"],
      ["DATAHUB","Ownership + documentation","Governed context"],
      ["SUPPORT","Tickets + open hours","Operational friction"],
      ["BACKLOG","Prioritized improvements","Next release"]
    ],
    controls:["Permissions","Licence utilization","Ownership","Role-based guides","Usage tracking","Audit evidence","Support-to-backlog"],
    toolGroups:[
      ["Change",["User documentation","Training design","Internal communications","Super-user network"]],
      ["Governance",["SaaS administration","User permissions","Licence tracking","DataHub"]],
      ["Operations",["Adoption tracking","Weekly active users","Support tickets","Open hours","Backlog management"]]
    ],
    artifacts:["Role-based user guide","Training material","Communications plan","Super-user model","Permission / licence review","DataHub documentation","Adoption dashboard","Support backlog"],
    decisions:[
      "Treat deployment and adoption as separate milestones.",
      "Measure usage instead of assuming rollout equals adoption.",
      "Review permissions and licences against real activity.",
      "Convert recurring support demand into prioritized product / process work."
    ]
  }
];