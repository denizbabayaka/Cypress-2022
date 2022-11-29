/// <reference types="Cypress" />

describe("Interact with dropdownlists", () => {
  it("Selacrt specific values via select dropdown lists", () => {
    cy.visit("https://www.webdriveruniversity.com");
    cy.get("#dropdown-checkboxes-radiobuttons")
      .invoke("removeAttr", "target")
      .click({ force: true });
    cy.get("#dropdowm-menu-1").select("c#");
    cy.get("#dropdowm-menu-2").select("maven").should("have.value", "maven");
    cy.get("#dropdowm-menu-3").select("JQuery");
    cy.get("#dropdowm-menu-3").select("JavaScript");
    cy.get("#dropdowm-menu-2").select("TestNG").contains("TestNG");
  });
});
