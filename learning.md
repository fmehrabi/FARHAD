---
layout: default
permalink: /learning/
---

<!-- Learning is intentionally separated by credential type. Skill chips are
     populated by assets/js/skill-explorer.js from its shared evidence registry. -->

<style>
  /* Subtle gold treatment for the linked OpenLearn completion record. */
  .learning-item a.learning-credential--gold,
  .learning-item a.learning-credential--gold:visited {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    border: 1px solid rgba(164, 129, 54, 0.28);
    border-radius: 999px;
    background: rgba(205, 163, 70, 0.10);
    color: #8b7137;
    font-size: 11px;
    font-weight: 600;
    line-height: 1.5;
    text-decoration: none;
    transition: background-color 180ms ease, border-color 180ms ease, transform 180ms ease;
  }

  .learning-item a.learning-credential--gold:hover {
    background: rgba(205, 163, 70, 0.17);
    border-color: rgba(164, 129, 54, 0.45);
    text-decoration: none;
    transform: translateY(-1px);
  }

  .learning-item a.learning-credential--gold:focus-visible {
    outline: 2px solid #b4944a;
    outline-offset: 3px;
  }

  html[data-theme="dark"] .learning-item a.learning-credential--gold,
  html[data-theme="dark"] .learning-item a.learning-credential--gold:visited {
    background: rgba(208, 171, 94, 0.12);
    border-color: rgba(208, 171, 94, 0.35);
    color: #dec38b;
  }

  html[data-theme="dark"] .learning-item a.learning-credential--gold:hover {
    background: rgba(208, 171, 94, 0.20);
  }
</style>

<div class="learning-intro">
  <h2>Learning &amp; Professional Development</h2>
  <p>Selected courses, workshops, and independent learning that complement my research and professional work. Completion records and audited or self-directed learning are identified separately.</p>
</div>

<div class="research-section learning-section">
  <h3 class="research-section-title">Certifications &amp; Courses</h3>

  <article class="research-project learning-item" data-skill-record="learning-business-models">
    <h4 class="research-project-title">Business Models in Strategic Management</h4>
    <p class="research-project-meta">The Open University · OpenLearn · 2026</p>
    <a class="learning-credential learning-credential--gold"
       href="{{ '/assets/certificates/Business_models_in_strategic_management_statement_Farhad%20Mehrabi.pdf' | relative_url }}"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="View Statement of Participation for Business models in strategic management (PDF, opens in a new tab)">Statement of Participation <span aria-hidden="true">↗</span></a>
    <p class="research-project-summary">Studied the theory and practice of business models in strategic management, including different business model types, e-commerce models, and business model design using the Business Model Canvas. The course also explored applications to professional development and career planning.</p>
    <details class="expandable-details">
      <summary class="details-toggle">View details</summary>
      <div class="details-content">
        <p>The course examined the emergence of the business model concept in strategy literature, classifications of business models, e-commerce business models, and methods for designing business models. It also introduced the use of business model thinking beyond organizations, particularly for professional development and career growth.</p>
        <p><strong>Learning outcomes:</strong></p>
        <ul>
          <li>Distinguish among different types of business models and understand their applications.</li>
          <li>Use the Business Model Canvas to structure and design a business model.</li>
          <li>Apply the Business Model Canvas to professional development and career planning.</li>
        </ul>

        <p><a href="https://www.open.edu/openlearn/money-business/business-models-strategic-management/content-section-0?active-tab=description-tab" target="_blank" rel="noopener noreferrer">Official course overview ↗</a> <span class="learning-note">(course information; the linked statement above is my completion record)</span></p>
      </div>
    </details>
  </article>

  <article class="research-project learning-item" data-skill-record="learning-business-analysis">
    <h4 class="research-project-title">Career Essentials in Business Analysis</h4>
    <p class="research-project-meta">Microsoft &amp; LinkedIn Learning · 2025</p>
    <div class="learning-credential">Certificate</div>
    <p class="research-project-summary">Training in business analysis, requirements engineering, process modeling, project management, and data fundamentals.</p>
  </article>

  <article class="research-project learning-item" data-skill-record="learning-powerbi">
    <h4 class="research-project-title">Power BI for Business Analytics</h4>
    <p class="research-project-meta">2023</p>
    <div class="learning-credential">Certificate</div>
    <p class="research-project-summary">Completed training in dashboarding, business intelligence, and analytical reporting with Power BI.</p>
  </article>

  <article class="research-project learning-item" data-skill-record="learning-celonis">
    <h4 class="research-project-title">Celonis Process Mining Fundamentals</h4>
    <p class="research-project-meta">2023</p>
    <div class="learning-credential">Certificate</div>
    <p class="research-project-summary">Foundational study of process mining and process analytics using Celonis.</p>
  </article>

  <article class="research-project learning-item" data-skill-record="learning-systems-thinking">
    <h4 class="research-project-title">Introduction to Systems Thinking with Practical Simulation Project</h4>
    <p class="research-project-meta">2023</p>
    <div class="learning-credential">Certificate</div>
    <p class="research-project-summary">An introductory systems thinking course that included a practical simulation project.</p>
  </article>
</div>

<div class="research-section learning-section">
  <h3 class="research-section-title">Workshops &amp; Training</h3>

  <article class="research-project learning-item" data-skill-record="learning-visual-paradigm">
    <h4 class="research-project-title">Visual Paradigm for BPMN 2.0 and Process Design</h4>
    <p class="research-project-meta">Workshop · 2025</p>
    <div class="learning-credential">Certificate</div>
    <p class="research-project-summary">Workshop on modeling and designing business processes with Visual Paradigm.</p>
  </article>

  <article class="research-project learning-item" data-skill-record="learning-camunda">
    <h4 class="research-project-title">BPMN and Camunda Workshop</h4>
    <p class="research-project-meta">Sharif University of Technology · 2023</p>
    <div class="learning-credential">Certificate</div>
    <p class="research-project-summary">Workshop covering BPMN and Camunda for business process modeling and workflows.</p>
  </article>
</div>

<div class="research-section learning-section">
  <h3 class="research-section-title">Audited &amp; Independent Learning</h3>

  <article class="research-project learning-item" data-skill-record="learning-research-design">
    <h4 class="research-project-title">Advanced Research Design and Methodological Alignment</h4>
    <p class="research-project-meta">Prof. Sepehr Ghazinoory · Tarbiat Modares University · 2026</p>
    <div class="learning-credential">Audited course</div>
    <p class="research-project-summary">Audited advanced instruction in research design and the alignment of research questions, methods, and philosophical assumptions.</p>
  </article>

  <article class="research-project learning-item" data-skill-record="learning-machine-learning">
    <h4 class="research-project-title">Foundations of Machine Learning</h4>
    <p class="research-project-meta">Prof. Ali Sharifi-Zarchi · Sharif University of Technology · 2025</p>
    <div class="learning-credential">Audited course</div>
    <p class="research-project-summary">Audited instruction introducing foundational concepts and approaches in machine learning.</p>
  </article>

  <article class="research-project learning-item" data-skill-record="learning-methodology">
    <h4 class="research-project-title">Research Methodology and Proposal Development</h4>
    <p class="research-project-meta">Prof. Payam Hanafizadeh · Allameh Tabataba’i University · 2025</p>
    <div class="learning-credential">Audited doctoral seminar</div>
    <p class="research-project-summary">Audited a doctoral seminar on research methodology and proposal development.</p>
  </article>

  <article class="research-project learning-item" data-skill-record="learning-tableau-powerbi">
    <h4 class="research-project-title">Data Visualization and Dashboarding with Tableau &amp; Power BI</h4>
    <p class="research-project-meta">2026</p>
    <div class="learning-credential">Self-directed learning</div>
    <p class="research-project-summary">Independent learning in interactive data visualization and business intelligence dashboards.</p>
  </article>

  <article class="research-project learning-item" data-skill-record="learning-data-science">
    <h4 class="research-project-title">Foundations of Data Science</h4>
    <p class="research-project-meta">2025</p>
    <div class="learning-credential">Self-directed learning</div>
    <p class="research-project-summary">Independent foundational study in data science.</p>
  </article>
</div>
