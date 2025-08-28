import { type Term } from "../schemas/term";
import { generateSlug, extractAcronym } from "../schemas/term";

/**
 * FitSM Terms Data
 *
 * Complete vocabulary from FitSM-0: Overview and vocabulary Version 3.0
 * Chapter 6: Terms and definitions
 *
 * All 80 terms with their definitions, notes, and metadata as defined
 * in the official FitSM standard.
 */

export const fitsmTerms: Term[] = [
  {
    id: 1,
    number: "6.1",
    term: "Activity",
    slug: generateSlug("Activity"),
    definition: "Set of actions carried out within a process",
  },
  {
    id: 2,
    number: "6.2",
    term: "Assessment",
    slug: generateSlug("Assessment"),
    definition:
      "Set of actions to evaluate the capability level of a process or the overall maturity level of a management system",
  },
  {
    id: 3,
    number: "6.3",
    term: "Audit",
    slug: generateSlug("Audit"),
    definition:
      "Systematic, independent and documented process for obtaining audit evidence and evaluating it objectively to determine the extent to which the audit criteria are fulfilled",
    notes: [
      "Audit evidence is typically based on documented information, information provided during an audit interview, and information gathered through observation.",
      "Audit criteria may be based on requirements from a management system (including policies, processes and procedures), agreements (including service level agreements and underpinning agreements), contracts, standards or legislation.",
      "An audit may be an internal audit, if it is conducted under the direct responsibility of the organisation or federation that is subject to the audit, or an external audit, if it is conducted by an external party.",
      "Both internal and external audits should be conducted by skilled and experienced auditors, and auditors should not audit their own work or areas of responsibilities to ensure the impartiality of the results.",
    ],
  },
  {
    id: 4,
    number: "6.4",
    term: "Availability",
    slug: generateSlug("Availability"),
    definition:
      "Ability of a service or service component to fulfil its intended function at a specific time or over a specific period of time",
  },
  {
    id: 5,
    number: "6.5",
    term: "Availability of information",
    slug: generateSlug("Availability of information"),
    definition:
      "Property of information being available to and usable by an authorized party",
    notes: [
      "Availability of information may also be referred to as accessibility of information.",
    ],
  },
  {
    id: 6,
    number: "6.6",
    term: "Capability level",
    slug: generateSlug("Capability level"),
    definition:
      "Achieved level of effectiveness of an individual process or general aspect of management",
  },
  {
    id: 7,
    number: "6.7",
    term: "Capacity",
    slug: generateSlug("Capacity"),
    definition:
      "Maximum extent to which a certain element of the infrastructure (such as a configuration item) can be used",
    notes: [
      "This might mean the total disk capacity or network bandwidth. It could also be the maximum transaction throughput of a system.",
    ],
  },
  {
    id: 8,
    number: "6.8",
    term: "Change",
    slug: generateSlug("Change"),
    definition:
      "Alteration (such as addition, removal, modification, replacement) of a configuration item (CI) or another entity that requires change control",
  },
  {
    id: 9,
    number: "6.9",
    term: "Classification",
    slug: generateSlug("Classification"),
    definition:
      "Assignment of items to defined groups based on common attributes, relations or other criteria",
    notes: [
      "Items that are subject to classification may include documents, records (such as incident records or change records), services, configuration items (CIs), etc. Defined groups may include categories (such as incident categories or change categories) or priority levels.",
      "The act of classification often comprises the application of more than one classification scheme. For instance, an incident record might be assigned to a technical incident category such as 'software related', 'network related', etc., and also to a priority level like 'low priority', 'medium priority', etc. The assignment of various incidents, service requests, changes and problems to an affected CI is also a classification.",
      "Besides the presentation and analysis of relationships, classification is often used as input for controlling the workflow of a process, e.g. by assigning a priority level to an incident.",
    ],
  },
  {
    id: 10,
    number: "6.10",
    term: "Closure",
    slug: generateSlug("Closure"),
    definition:
      "Final activity in a workflow of a process to indicate no further action is required for a specific case",
    notes: [
      "Cases that are subject to closure may include incidents, problems, service requests or changes. The activity of closure puts the connected record (such as the incident record, problem record, service request record or change record) in its final status, usually called 'closed'.",
    ],
  },
  {
    id: 11,
    number: "6.11",
    term: "Competence",
    slug: generateSlug("Competence"),
    definition:
      "Sum of knowledge, skills and experience that an individual or group needs to effectively take on a specific role",
  },
  {
    id: 12,
    number: "6.12",
    term: "Confidentiality of information",
    slug: generateSlug("Confidentiality of information"),
    definition:
      "Property of information not being accessible to unauthorized parties",
  },
  {
    id: 13,
    number: "6.13",
    term: "Conformity",
    slug: generateSlug("Conformity"),
    definition: "Extent to which requirements are met in some context",
    notes: [
      "In the context of FitSM, the term compliance is generally used as a synonym for conformity. However, sometimes conformity is used in the context of adherence to internal regulations and requirements as defined by policies, processes and procedures, while compliance is used in the context of adherence to external requirements, such as laws, standards and contracts.",
    ],
  },
  {
    id: 14,
    number: "6.14",
    term: "Configuration",
    slug: generateSlug("Configuration"),
    definition:
      "State of a specified set of attributes, relationships and other relevant properties of one or more configuration items (CIs)",
    notes: [
      "The documented configuration of a number of CIs at a given point in time is called a configuration baseline, which is usually taken prior to the deployment of one or more changes to these CIs in the live environment.",
    ],
  },
  {
    id: 15,
    number: "6.15",
    term: "Configuration item (CI)",
    slug: generateSlug("Configuration item (CI)"),
    definition:
      "Element that contributes to the delivery of one or more services or service components, therefore requiring control of its configuration",
    acronym_expansion: extractAcronym("Configuration item (CI)"),
    notes: [
      "CIs can vary widely, from technical components (e.g. computer hardware, network components, software) to non-technical items such as documents (e.g. service level agreements, manuals, license documentation).",
      "The data necessary for effective control of a CI is stored in a CI record. In addition to attributes of the CI, the CI record likely includes information on relationships it has with other CIs, service components and services. CI records are stored in a configuration management database (CMDB).",
    ],
  },
  {
    id: 16,
    number: "6.16",
    term: "Configuration management database (CMDB)",
    slug: generateSlug("Configuration management database (CMDB)"),
    definition: "Store for data about configuration items (CIs)",
    acronym_expansion: extractAcronym(
      "Configuration management database (CMDB)",
    ),
    notes: [
      "A CMDB is not necessarily a single database covering all configuration items (CIs). It may rather be composed of multiple data stores.",
    ],
  },
  {
    id: 17,
    number: "6.17",
    term: "Continuity",
    slug: generateSlug("Continuity"),
    definition:
      "Property of a service to maintain all or parts of its functionality, even in exceptional circumstances",
    notes: [
      "Exceptional circumstances include emergencies, crises or disasters which affect the ability to provide services over extended periods of time.",
    ],
  },
  {
    id: 18,
    number: "6.18",
    term: "Customer",
    slug: generateSlug("Customer"),
    definition:
      "Organisation or part of an organisation that commissions a service provider in order to receive one or more services",
    notes: ["A customer usually represents a number of users."],
  },
  {
    id: 19,
    number: "6.19",
    term: "Demand",
    slug: generateSlug("Demand"),
    definition: "Potential or identified desire of customers for a service",
  },
  {
    id: 20,
    number: "6.20",
    term: "Document",
    slug: generateSlug("Document"),
    definition: "Information and its supporting medium",
    notes: [
      "Examples of documents include policies, plans, process descriptions, procedures, service level agreements, contracts or records of activities performed.",
    ],
  },
  {
    id: 21,
    number: "6.21",
    term: "Effectiveness",
    slug: generateSlug("Effectiveness"),
    definition: "Extent to which goals and expectations are met",
    notes: [
      "In a management system, effectiveness is mostly measured against the defined goals of the processes that are subject to this system.",
    ],
  },
  {
    id: 22,
    number: "6.22",
    term: "Efficiency",
    slug: generateSlug("Efficiency"),
    definition:
      "Degree of ability to meet goals and expectations with minimum consumption of resources",
    notes: [
      "In a management system, efficiency is mostly considered in the context of the processes that are subject to this system.",
      "Resources may be human, technical, informational or financial.",
    ],
  },
  {
    id: 23,
    number: "6.23",
    term: "Emergency change",
    slug: generateSlug("Emergency change"),
    definition:
      "Change with a very high urgency to being implemented in order to avoid negative consequences",
  },
  {
    id: 24,
    number: "6.24",
    term: "Escalation",
    slug: generateSlug("Escalation"),
    definition:
      "Change of responsibility for a case (such as an incident, service request, problem or change) or activity to another individual or group",
    notes: [
      "There are two basic types of escalation: Hierarchical escalation transfers responsibility (temporarily) to someone with a higher level of authority. Functional escalation transfers responsibility to someone with a different set of competencies or privileges required to handle the case or activity.",
    ],
  },
  {
    id: 25,
    number: "6.25",
    term: "Federation",
    slug: generateSlug("Federation"),
    definition:
      "Situation in which multiple parties, the federation members, jointly contribute to the delivery of services to customers without being organised in a strict hierarchical setup or supply chain",
  },
  {
    id: 26,
    number: "6.26",
    term: "Federation member",
    slug: generateSlug("Federation member"),
    definition:
      "Individual, organisation or body that works together with other federation members in a federation to provide one or more services",
    notes: [
      "Often, federation members will not be bound together by strict contractual agreements.",
    ],
  },
  {
    id: 27,
    number: "6.27",
    term: "Federator",
    slug: generateSlug("Federator"),
    definition: "Body that acts to coordinate a set of federation members",
  },
  {
    id: 28,
    number: "6.28",
    term: "Improvement",
    slug: generateSlug("Improvement"),
    definition:
      "Action or set of actions carried out to increase the level of conformity, effectiveness or efficiency of a management system, process or activity, or to increase the quality or performance of a service or service component",
    notes: [
      "An improvement is usually implemented after an opportunity for improvement has been identified, for instance during a service review, audit or management review.",
    ],
  },
  {
    id: 29,
    number: "6.29",
    term: "Incident",
    slug: generateSlug("Incident"),
    definition:
      "Unplanned disruption of operation in a service or service component, or degradation of service quality versus the expected or agreed service level or operational level according to service level agreements (SLAs), operational level agreements (OLAs) and underpinning agreements (UAs)",
  },
  {
    id: 30,
    number: "6.30",
    term: "Information security",
    slug: generateSlug("Information security"),
    definition:
      "Preservation of confidentiality, integrity and availability of information",
  },
  {
    id: 31,
    number: "6.31",
    term: "Information security control",
    slug: generateSlug("Information security control"),
    definition:
      "Means of controlling or treating one or more risks to information security",
  },
  {
    id: 32,
    number: "6.32",
    term: "Information security event",
    slug: generateSlug("Information security event"),
    definition:
      "Occurrence or previously unknown situation indicating a possible breach of information security",
    notes: [
      "An occurrence or situation is considered a potential breach of information security if it may lead to a negative impact on the confidentiality, integrity and / or availability of information of one or more information assets.",
    ],
  },
  {
    id: 33,
    number: "6.33",
    term: "Information security incident",
    slug: generateSlug("Information security incident"),
    definition:
      "Single information security event or a series of information security events with a significant probability of having a negative impact on the delivery of services to customers, and therefore on the customers' business operations",
  },
  {
    id: 34,
    number: "6.34",
    term: "Integrity of information",
    slug: generateSlug("Integrity of information"),
    definition:
      "Property of information not being subject to unauthorized modification, duplication or deletion",
  },
  {
    id: 35,
    number: "6.35",
    term: "IT service",
    slug: generateSlug("IT service"),
    definition:
      "Service that is enabled by the use of information technology (IT)",
  },
  {
    id: 36,
    number: "6.36",
    term: "IT service management (ITSM)",
    slug: generateSlug("IT service management (ITSM)"),
    definition:
      "Entirety of activities performed by an IT service provider to plan, deliver, operate and control IT services offered to customers",
    acronym_expansion: extractAcronym("IT service management (ITSM)"),
    notes: [
      "The activities carried out in the ITSM context should be directed by policies and structured and organised by processes and supporting procedures.",
    ],
  },
  {
    id: 37,
    number: "6.37",
    term: "Key performance indicator (KPI)",
    slug: generateSlug("Key performance indicator (KPI)"),
    definition:
      "Metric that is used to track the performance, effectiveness or efficiency of a service or process",
    acronym_expansion: extractAcronym("Key performance indicator (KPI)"),
    notes: [
      "KPIs are generally important metrics that will be aligned to critical success factors and important goals. KPIs are therefore a subset of all possible metrics, intended to allow for monitoring a service or process.",
    ],
  },
  {
    id: 38,
    number: "6.38",
    term: "Known error",
    slug: generateSlug("Known error"),
    definition:
      "Problem which has not (yet) been resolved, but for which there are documented workarounds or measures to reduce or prevent negative impact on services",
  },
  {
    id: 39,
    number: "6.39",
    term: "Major change",
    slug: generateSlug("Major change"),
    definition:
      "Change that (may) have a significant impact on one or more services",
  },
  {
    id: 40,
    number: "6.40",
    term: "Major incident",
    slug: generateSlug("Major incident"),
    definition: "Incident that (may) have significant impact on the customer",
  },
  {
    id: 41,
    number: "6.41",
    term: "Management review",
    slug: generateSlug("Management review"),
    definition:
      "Periodic evaluation of the suitability, maturity and efficiency of the entire management system by its accountable owner(s), from which opportunities for improvement are identified and follow-up actions are determined",
    notes: [
      "The accountable owner of a management system is usually a top management representative of the organisation operating the management system. In a federation, the accountable owner is usually one person nominated by top management representatives of all organisations (i.e. federation members) involved.",
    ],
  },
  {
    id: 42,
    number: "6.42",
    term: "Management system",
    slug: generateSlug("Management system"),
    definition:
      "Entirety of policies, processes, procedures and related resources and capabilities aiming at effectively performing management tasks in a given context and for a given subject",
    notes: [
      "A management system is generally intangible. It is based on the idea of a systematic, structured and process-oriented way of managing.",
      "While documentation (such as process definitions, procedures and records) and tools (such as workflow support and monitoring tools) can be parts of a management system, management system considerations are not limited to the questions of documentation and tool support.",
      "With respect to (IT) service management and the FitSM standard series, the idea of a service management system (SMS) is a central concept, where the context of the management system is the organisational context of the service provider, and the subject is to plan, deliver, operate and control (IT) services.",
    ],
  },
  {
    id: 43,
    number: "6.43",
    term: "Maturity level",
    slug: generateSlug("Maturity level"),
    definition:
      "Achieved overall effectiveness of a service management system, based on the combination of the capability levels of its processes and general aspects of management",
  },
  {
    id: 44,
    number: "6.44",
    term: "Nonconformity",
    slug: generateSlug("Nonconformity"),
    definition: "Case or situation where a requirement is not fulfilled",
    notes: ["This may also be referred to as noncompliance."],
  },
  {
    id: 45,
    number: "6.45",
    term: "Operational level agreement (OLA)",
    slug: generateSlug("Operational level agreement (OLA)"),
    definition:
      "Documented agreement between a service provider and an internal supplier that specifies the underpinning service(s) or service component(s) to be provided by the internal supplier or federation member, together with the related service targets",
    acronym_expansion: extractAcronym("Operational level agreement (OLA)"),
    notes: [
      "In a federation, OLAs may be agreed between the federator and federation members.",
    ],
  },
  {
    id: 46,
    number: "6.46",
    term: "Operational target",
    slug: generateSlug("Operational target"),
    definition:
      "Reference / target value for a parameter used to measure the performance of a service component, listed in an operational level agreement (OLA) or underpinning agreement (UA) related to this service component",
    notes: [
      "Typical operational targets might include availability or allowed resolution times for incidents.",
    ],
  },
  {
    id: 47,
    number: "6.47",
    term: "Policy",
    slug: generateSlug("Policy"),
    definition:
      "Documented set of intentions, expectations, goals, rules and requirements, often formally expressed by top management representatives in an organisation or federation",
    notes: [
      "Policies are then realised in processes, which are in turn made up of activities that people carry out according to defined procedures.",
    ],
  },
  {
    id: 48,
    number: "6.48",
    term: "Post implementation review (PIR)",
    slug: generateSlug("Post implementation review (PIR)"),
    definition:
      "Review after the implementation of a change that determines if the change was successful",
    acronym_expansion: extractAcronym("Post implementation review (PIR)"),
    notes: [
      "Depending on the specific type and complexity of the change, the post implementation review may vary widely in its depth.",
    ],
  },
  {
    id: 49,
    number: "6.49",
    term: "Priority",
    slug: generateSlug("Priority"),
    definition: "Relative importance of a target, object or activity",
    notes: [
      "Often incidents, service requests, problems and changes are given a priority. In the case of incidents and problems, priority is usually based on the specific impact and urgency of the situation.",
    ],
  },
  {
    id: 50,
    number: "6.50",
    term: "Problem",
    slug: generateSlug("Problem"),
    definition:
      "Underlying cause of one or more incidents that requires further investigation to prevent incidents from recurring or reduce the negative impact on services",
  },
  {
    id: 51,
    number: "6.51",
    term: "Procedure",
    slug: generateSlug("Procedure"),
    definition:
      "Specified set of steps or instructions to be carried out by an individual or group to perform one or more activities of a process",
  },
  {
    id: 52,
    number: "6.52",
    term: "Process",
    slug: generateSlug("Process"),
    definition:
      "Structured set of activities, with clearly defined responsibilities, that bring about a specific objective or set of results from a set of defined inputs",
    notes: [
      "Generally, a process consists of a number of activities used to manage services, if the process is part of a service management system (SMS).",
    ],
  },
  {
    id: 53,
    number: "6.53",
    term: "Record",
    slug: generateSlug("Record"),
    definition:
      "Documentation of an event or of the results of performing a process or activity",
  },
  {
    id: 54,
    number: "6.54",
    term: "Release",
    slug: generateSlug("Release"),
    definition:
      "Set of one or more changes that are grouped together and deployed as a logical unit",
  },
  {
    id: 55,
    number: "6.55",
    term: "Release and deployment strategy",
    slug: generateSlug("Release and deployment strategy"),
    definition:
      "Approach taken to manage releases and their deployment for a given set of service components and related configuration items (CIs), including organisational and technical aspects of planning, building, testing, evaluating, accepting and deploying releases",
    notes: [
      "Typical release and deployment strategies include continuous integration (a DevOps practice where changes to software source code are regularly merged into a central repository, followed by running automated builds and tests) and fixed release cycles (where minor and major releases are planned according to a long-term schedule, with emergency releases being deployed between release cycles as necessary).",
    ],
  },
  {
    id: 56,
    number: "6.56",
    term: "Report",
    slug: generateSlug("Report"),
    definition:
      "A structured record communicating results gathered through measurement, monitoring, assessment, audit or observation",
    notes: [
      "A common report generated from a service management system is a service report targeted to customers of a service that details the performance of that service versus the service targets defined in a service level agreement (SLA).",
      "The recipients of reports may be internal or external, including customers, suppliers, federation members, service owners and the SMS owner.",
    ],
  },
  {
    id: 57,
    number: "6.57",
    term: "Request for change (RFC)",
    slug: generateSlug("Request for change (RFC)"),
    definition: "Documented proposal for a change",
    acronym_expansion: extractAcronym("Request for change (RFC)"),
  },
  {
    id: 58,
    number: "6.58",
    term: "Risk",
    slug: generateSlug("Risk"),
    definition:
      "Possible negative occurrence that would have a negative impact on the service provider's ability to deliver agreed services to customers, or that would decrease the value generated through some service",
    notes: [
      "Risk is made up of the probability of the threat entailed, the vulnerability to that threat of some asset, and the impact the threat would have, if it occurred.",
    ],
  },
  {
    id: 59,
    number: "6.59",
    term: "Role",
    slug: generateSlug("Role"),
    definition:
      "Set of responsibilities and connected behaviours or actions collected into a logical unit that can be assigned to an individual or group",
    notes: ["An individual may hold multiple roles."],
  },
  {
    id: 60,
    number: "6.60",
    term: "Service",
    slug: generateSlug("Service"),
    definition:
      "Way to provide value to customers through bringing about results that they want to achieve",
    notes: [
      "In the context of the FitSM standard series, when referring to services, usually IT services are meant.",
    ],
  },
  {
    id: 61,
    number: "6.61",
    term: "Service acceptance criteria",
    slug: generateSlug("Service acceptance criteria"),
    definition:
      "Criteria that must be fulfilled by the time a new or changed service is deployed and made available to customers / users",
    notes: [
      "Service acceptance criteria are defined when a new or changed service is designed, and they may be updated or refined during the development or transition phase. They may cover functional and non-functional aspects of the specific service to be deployed.",
    ],
  },
  {
    id: 62,
    number: "6.62",
    term: "Service catalogue",
    slug: generateSlug("Service catalogue"),
    definition:
      "Customer-facing list of all live services offered along with relevant information about these services",
    notes: [
      "A service catalogue can be regarded as a filtered version of and customers' view on the service portfolio.",
      "Based on one service portfolio, one or more service catalogues can be created.",
    ],
  },
  {
    id: 63,
    number: "6.63",
    term: "Service component",
    slug: generateSlug("Service component"),
    definition:
      "Logical part of a service that provides a function enabling or enhancing a service",
    notes: [
      "A service is usually composed of several service components.",
      "A service component is usually built from one or more configuration items (CIs).",
      "Although a service component underlies one or more services, it usually does not create value for a customer alone and is therefore not a service by itself.",
    ],
  },
  {
    id: 64,
    number: "6.64",
    term: "Service level agreement (SLA)",
    slug: generateSlug("Service level agreement (SLA)"),
    definition:
      "Documented agreement between a customer and service provider that specifies the service to be provided and the service targets that define how it will be provided",
    acronym_expansion: extractAcronym("Service level agreement (SLA)"),
  },
  {
    id: 65,
    number: "6.65",
    term: "Service lifecycle",
    slug: generateSlug("Service lifecycle"),
    definition:
      "The series of phases a service may move through in its lifetime",
    notes: [
      "Specific service lifecycle phases are typically defined for each organisation, depending on the complexity needed. These may include initial idea, proposal, design, development, deployment, production and retirement.",
      "Service design and transition plans, sometimes referred to as the service design and transition package (SDTP), should be produced or updated for every new or majorly altered service. It may consist of a number of documented plans and other relevant information including a list of requirements and service acceptance criteria, a project plan, communication and training plans, technical plans and specifications, resource plans, development and deployment schedules / timetables, etc.",
    ],
  },
  {
    id: 66,
    number: "6.66",
    term: "Service management",
    slug: generateSlug("Service management"),
    definition:
      "Entirety of activities performed by a service provider to plan, deliver, operate and control services offered to customers",
    notes: [
      "The activities carried out in the service management context should be directed by policies and structured and organised by processes and supporting procedures.",
      "In the context of the FitSM standard series, when referring to service management, usually IT service management is meant.",
    ],
  },
  {
    id: 67,
    number: "6.67",
    term: "Service management plan",
    slug: generateSlug("Service management plan"),
    definition:
      "Overall plan for implementing and operating a service management system (SMS)",
  },
  {
    id: 68,
    number: "6.68",
    term: "Service management system (SMS)",
    slug: generateSlug("Service management system (SMS)"),
    definition:
      "Overall management system that controls and supports management of services within an organisation or federation",
    acronym_expansion: extractAcronym("Service management system (SMS)"),
    notes: [
      "The SMS can be regarded as the entirety of interconnected policies, processes, procedures, roles, agreements, plans, related resources and other elements needed and used by a service provider to effectively manage the delivery of services to customers.",
    ],
  },
  {
    id: 69,
    number: "6.69",
    term: "Service portfolio",
    slug: generateSlug("Service portfolio"),
    definition:
      "Internal list that details all the services offered by a service provider, including those in preparation, live and discontinued",
    notes: [
      "For each service, the service portfolio may include information such as its value proposition, target customer base, service description, relevant technical specifications, cost and price, risks to the service provider, service level packages offered, etc.",
    ],
  },
  {
    id: 70,
    number: "6.70",
    term: "Service provider",
    slug: generateSlug("Service provider"),
    definition:
      "Organisation or federation (or part of an organisation or federation) that manages and delivers a service or services to customers",
  },
  {
    id: 71,
    number: "6.71",
    term: "Service request",
    slug: generateSlug("Service request"),
    definition:
      "User request for information, advice, access to a service or a change",
    notes: [
      "Service requests are often handled by the same process and tools as incidents.",
    ],
  },
  {
    id: 72,
    number: "6.72",
    term: "Service review",
    slug: generateSlug("Service review"),
    definition:
      "Periodic evaluation of the quality and performance of a service together with the customer or under consideration of customer feedback, from which opportunities for improvement are identified, follow-up actions to increase the value of the service are determined",
  },
  {
    id: 73,
    number: "6.73",
    term: "Service target",
    slug: generateSlug("Service target"),
    definition:
      "Reference / target values for a parameter used to measure the performance of a service, listed in a service level agreement (SLA) related to this service",
    notes: [
      "Typical service targets include availability or resolution time for incidents.",
    ],
  },
  {
    id: 74,
    number: "6.74",
    term: "Supplier",
    slug: generateSlug("Supplier"),
    definition:
      "Organisation or party that provides a (supporting) service or service component(s) to the service provider, which the service provider needs to provide services to their customers / users",
    notes: [
      "A supplier may be internal or external to the organisation of the service provider.",
      "In a federation, the federation members are regarded as internal suppliers.",
    ],
  },
  {
    id: 75,
    number: "6.75",
    term: "Top management",
    slug: generateSlug("Top management"),
    definition:
      "Senior management within an organisation who has authority to set policies and exercise overall control of the organisation",
  },
  {
    id: 76,
    number: "6.76",
    term: "Underpinning agreement (UA)",
    slug: generateSlug("Underpinning agreement (UA)"),
    definition:
      "Documented agreement between a service provider and an external supplier that specifies the underpinning service(s) or service component(s) to be provided by the supplier, together with the related service targets",
    acronym_expansion: extractAcronym("Underpinning agreement (UA)"),
    notes: [
      "A UA can be seen as a service level agreement (SLA) with an external supplier where the service provider is in the customer role.",
      "A UA may also be referred to as an underpinning contract (UC).",
    ],
  },
  {
    id: 77,
    number: "6.77",
    term: "Underpinning contract (UC)",
    slug: generateSlug("Underpinning contract (UC)"),
    definition: "See: Underpinning agreement (UA)",
    acronym_expansion: extractAcronym("Underpinning contract (UC)"),
  },
  {
    id: 78,
    number: "6.78",
    term: "User",
    slug: generateSlug("User"),
    definition: "Individual that primarily benefits from and uses a service",
  },
  {
    id: 79,
    number: "6.79",
    term: "Value",
    slug: generateSlug("Value"),
    definition: "Benefit to a customer and their users delivered by a service",
    notes: [
      "Value should be considered as a composition of the function (fitness for purpose) and quality (fitness for use, covering sufficient availability / continuity, capacity / performance and information security) connected to a service.",
    ],
  },
  {
    id: 80,
    number: "6.80",
    term: "Workaround",
    slug: generateSlug("Workaround"),
    definition:
      "Means of circumventing or mitigating the symptoms of a known error that helps to resolve incidents caused by this known error, while the underlying root cause is not permanently eliminated",
    notes: [
      "Workarounds are often applied in a situation, when the actual root cause of (recurring) incidents cannot be resolved due to lack of resources or ability.",
      "A workaround may consist of a set of actions to be carried out by either the service provider or the user of the service.",
      "A workaround is also referred to as a temporary fix or temporary solution.",
    ],
  },
];
