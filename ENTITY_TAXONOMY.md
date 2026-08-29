# AI industry entity taxonomy

## Design rule

Primary divisions are canonical typed tables. Secondary divisions are versioned terms in the single-cardinality `entity_subtype` facet. Orthogonal properties—domain, modality, architecture role, access, deployment, lifecycle, maturity, sector, evidence state, and production concern—remain independent facets and may be multi-valued.

This avoids forcing multi-dimensional organizations, products, and multimodal models into one brittle category tree. A new type earns a canonical table only when it has distinct identity, intrinsic fields, and relationships.

## Primary and secondary divisions

| Primary entity | Canonical table | Secondary divisions |
| --- | --- | --- |
| Library | `corpus.library` | SDK/client, application framework, agent framework, training library, inference runtime, evaluation library, data/retrieval/vector library, observability library |
| Repository | `corpus.repository` | source repository, monorepo, reference implementation, specification repository, benchmark repository, model artifact repository |
| Paper | `corpus.paper` | methods, empirical, systems, survey/review, position, dataset, benchmark paper |
| Person | `corpus.person` | professional roles are multi-valued in `person_role`: researcher, engineer, maintainer, founder, executive, product lead, standards contributor, educator/advocate, investor/analyst; temporal roles remain relationship data |
| Organization | `corpus.organization` | intrinsic subtype: commercial company, research lab, academic institution, government agency, standards body, nonprofit/foundation, open-source community, publisher/media, investor/funder; multi-valued ecosystem behavior belongs in `organization_role` |
| AI product | `corpus.product` | developer tool, assistant app, model API, AI platform, agent product, observability/evaluation, security/governance, data/retrieval, infrastructure/hardware |
| AI model | `corpus.ai_model` + `ai_model_version` | foundation, instruction, reasoning, code, multimodal, embedding, reranker, safety, fine-tuned, distilled model |
| Benchmark | `corpus.benchmark` | capability, knowledge, reasoning, coding, multimodal, agentic/tool-use, safety, robustness, efficiency/systems |
| AI interoperability protocol or standard | `corpus.ai_protocol` + `ai_protocol_version` | interoperability, tool interface, agent communication, context exchange, model-serving API, data format, safety/governance specification |
| Case study | `corpus.case_study` | implementation, adoption, migration, comparative benchmark, incident/failure, business outcome |
| Claim | `evidence.claim` | attribute, relationship, measurement, capability, compatibility, event, recommendation, definition, provenance; verdict is separate verification history |

MCP and A2A are protocols. The broader UI label is **AI interoperability protocols and standards**, because the table also admits API conventions, formats, and governance specifications without claiming that every record is a formally ratified standard.

## Organization product ingestion

Ingest an organization separately from its product families, products, versions, and features. Use `organization_product_relationship` roles such as developer, vendor, owner, operator, distributor, implementation partner, or customer. Large vendors and one-product startups follow the same graph; size changes row count, not ontology.

Product identity evidence should come from official catalogs, documentation, release pages, or registries. Marketing capability and outcome language must be extracted into claims and independently assessed before it becomes accepted knowledge.

## Relationship coverage

The schema includes typed provenance-bearing joins for organization hierarchy and products, repository maintainers, product repositories, paper/model introduction, model lineage, protocol evolution, benchmark datasets and model versions, and case-study models/libraries/benchmarks. Quantitative benchmark results remain observations in `ranking.metric_observation`, not mutable columns on a join.
