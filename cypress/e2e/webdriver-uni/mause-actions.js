/// <reference types="Cypress" />

describe("Test moause actions", () => {
  it("Scrolll element into view", () => {
    cy.visit("https://www.webdriveruniversity.com");
    //below command  scrolling down to element
    cy.get("#actions")
      .scrollIntoView()
      .invoke("removeAttr", "target")
      .click({ force: true });
  });

  it("I shoul be able to dran anfd drop a draggable item", () => {
    cy.visit("https://www.webdriveruniversity.com");
    //below command  scrolling down to element
    cy.get("#actions")
      .scrollIntoView()
      .invoke("removeAttr", "target")
      .click({ force: true });

    cy.get("#draggable").trigger("mousedown", { which: 1 });
    cy.get("#droppable")
      .trigger("mousemove")
      .trigger("mouseup", { force: true });
  });

  it("I shoul be able to perform a doule mouse click", () => {
    cy.visit("https://www.webdriveruniversity.com");
    //below command  scrolling down to element
    cy.get("#actions")
      .scrollIntoView()
      .invoke("removeAttr", "target")
      .click({ force: true });

    cy.get("#double-click").dblclick();
  });

  it.only("I should be able to hold the left mouse click button on a given element", () => {
    cy.visit("https://www.webdriveruniversity.com");
    //below command  scrolling down to element
    cy.get("#actions")
      .scrollIntoView()
      .invoke("removeAttr", "target")
      .click({ force: true });

    cy.get("#click-box")
      .trigger("mousedown", { which: 1 })
      .then(($el) => {
        expect($el).to.have.css("background-color", "rgb(0, 255, 0)");
        cy.wait(1000);
      });
  });
});
