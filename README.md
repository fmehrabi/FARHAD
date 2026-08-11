Farhad Mehrabi — Academic Website

Personal academic website of Farhad Mehrabi, presenting research interests, selected research projects, publications, and academic/professional experience.

Live website: https://fmehrabi.github.io/FARHAD/

Website Sections

About — academic background, research profile, and current interests

Research — current research and selected research projects

Publication — peer-reviewed publication information and research significance

Experience — research, teaching, and professional experience

Design and Features

The website is built with Jekyll and hosted on GitHub Pages. It uses the GitHub Pages Minimal theme as its original foundation, with extensive custom development and visual customization.

Current custom features include:

Responsive desktop and mobile layout

Light and dark themes with saved user preference

Animated sliding navigation indicator

Staggered page-content reveal animations

Smooth expandable/collapsible research details

Custom connected section hierarchy for grouped content

Theme-aware hover states, borders, shadows, and navigation effects

Academic profile links for Google Scholar, ResearchGate, ORCID, LinkedIn, GitHub, and email

Custom research, publication, experience, and profile-card styling

Project Structure

FARHAD/
├── _config.yml
├── _layouts/
│   └── default.html
├── assets/
│   ├── css/
│   │   └── style.scss
│   ├── img/
│   │   └── farhad.jpg
│   └── js/
│       └── scale.fix.js
├── index.md
├── research.md
├── publications.md
├── experience.md
├── Gemfile
└── README.md

Local Development

The site uses the GitHub Pages gem.

Install dependencies:

bundle install

Run the site locally:

bundle exec jekyll serve

Then open the local Jekyll address shown in the terminal.

Theme Attribution

This website was originally based on the Minimal Jekyll theme for GitHub Pages:

Theme repository: https://github.com/pages-themes/minimal

Original theme author: orderedlist

GitHub Pages theme project: pages-themes/minimal

The current website has been extensively customized, including its navigation system, page layout, responsive behavior, dark mode, animations, content presentation, section hierarchy, academic profile components, and visual styling.

The original Minimal theme is distributed under the CC0 1.0 Universal dedication.
