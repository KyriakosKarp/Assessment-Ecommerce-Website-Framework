# E2E Automation Framework – SauceDemo

[![E2E Test Pipeline](https://github.com/KyriakosKarp/Assessment-Ecommerce-Website-Framework/actions/workflows/ci.yml/badge.svg)](https://github.com/KyriakosKarp/Assessment-Ecommerce-Website-Framework/actions/workflows/ci.yml)

End-to-end automation framework built with **WebdriverIO v9**, **Mocha (BDD)** and **JavaScript (CommonJS)**.

The framework validates:

- Authentication
- Products page
- Add to cart
- Cart behavior
- Checkout flow
- Burger menu functionality

---

## Tech Stack

- WebdriverIO v9
- Mocha (BDD)
- expect-webdriverio
- Allure Reporter
- GitHub Actions (CI)
- JavaScript (CommonJS modules)

---

## Installation

npm install

---

## Run Tests

### Run full regression suite: 
    npm run test:all
### Run specific suites:
    npm run test:auth
    npm run test:inventory
    npm run test:cart
    npm run test:checkout
    npm run test:burger

---

## Allure Reporting

### Generate & open report locally
    npm run test:all
    npm run report
### Available report scripts
    npm run report:clean        # Remove previous allure results & report
    npm run report:generate     # Generate report from allure results
    npm run report:open         # Open generated report
    npm run report              # Clean + generate + open

---

## Continuous Integration

GitHub Actions pipeline:
- Installs dependencies (npm ci)
- Executes full E2E suite
- Uploads screenshots on failure
- Uploads Allure results and report
- Supports manual trigger via workflow_dispatch

---

## Design Decisions

### CommonJS over ES Modules

CommonJS was chosen for simplicity and alignment with WebdriverIO configuration.

### Fixed Viewport (1920x1080)

A fixed viewport ensures deterministic UI rendering and prevents responsive layout flakiness in CI environments.

### Page Object Model with Components

Pages represent full screens, while reusable UI elements (e.g. Header, Burger Menu) are implemented as components to maintain separation of concerns and scalability.

### Data-Driven Testing

Authentication and checkout negative scenarios use data-driven patterns to:
- Avoid duplication
- Improve maintainability
- Increase coverage clarity

### Deterministic Cart State Handling

Due to application behavior where **Reset App State does not revert inventory button states**, a clearCart()) strategy was implemented to ensure test isolation and deterministic execution.

### Item Details Flow

This test validates:
- Data consistency between inventory and item details pages
- UI state mutation after cart interaction
- Cart badge synchronization
- Browser-level back navigation state persistence
- Cross-page data integrity

The goal was to validate behavioral integrity across navigation layers rather than isolated UI checks.

---

## Edge Case Coverage

### Authentication
- Empty username
- Empty password
- Both empty
- Wrong username
- Wrong password
- Locked user

### Checkout
- Missing first name
- Missing last name
- Missing postal code
- Missing all fields
- Validation message verification

---

## Findings

### Reset App State Behavior

Resetting the application clears the cart badge but does not revert inventory button from "Remove" back to "Add to cart".
Handled via explicit cart cleanup logic to prevent state leakage between tests.

---

## Coverage Summary

| Feature | Covered |
|--------------|----|
| Authentication| ✅ |
| Products Page| ✅ |
| Add to Cart | ✅ |
| Cart | ✅ |
| Checkout | ✅ |
| Burger Menu | ✅ |
| Edge Cases | ✅ |
| Item Details | ✅ |
| State persistence & cross-page validation | ✅ |

---

# Framework Architecture
``` ##
test/
├── specs/
│    ├── auth.spec.js
│    ├── inventory.spec.js
│    ├── cart.spec.js
│    ├── checkout.spec.js
│    └── burgerMenu.spec.js
│    └── itemDetails.spec.js
│
└── data/
├── authentication/
└── checkout/

pageObjects/
├── loginPage.js
├── inventoryPage.js
├── cartPage.js
├── checkoutPage.js
└── components/
├── header.comp.js
└── burgerMenu.comp.js
```

### Structure Principles

- `specs/` → Test scenarios
- `data/` → Test data separation
- `pageObjects/` → Page-level abstraction
- `components/` → Reusable UI logic
- `wdio.conf.js` → Centralized configuration

Author: Kyriakos Karpontinis