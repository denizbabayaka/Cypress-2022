/// <reference types="Cypress" />

describe("Handle js alerts", () => {
  it("Confirm js alert contains the correct text", () => {
    cy.visit("https://www.webdriveruniversity.com");
    // if we want to stay at the same page after clicking the button we use below code
    cy.get("#popup-alerts")
      .invoke("removeAttr", "target")
      .click({ force: true });

    cy.get("#button1").click();
    // this will get the alert message and assign to a string
    cy.on("window:alert", (str) => {
      expect(str).to.equal("I am an alert box!");
    });

    cy.get("#button2").click();
    cy.get(".modal-footer > .btn").click();
  });

  it("Validate js confirm alert box works correctly by clicking on ok", () => {
    cy.visit("https://www.webdriveruniversity.com");
    cy.get("#popup-alerts")
      .invoke("removeAttr", "target")
      .click({ force: true });
    cy.get("#button4").click();
    cy.on("window:alert", (str) => {
      return true;
    });
    cy.get("#confirm-alert-text").contains("You pressed OK!");
  });

  it("Validate js confirm alert box works correctly by clicking on ok", () => {
    cy.visit("https://www.webdriveruniversity.com");
    cy.get("#popup-alerts")
      .invoke("removeAttr", "target")
      .click({ force: true });
    cy.get("#button4").click();
    //this will click on cancel button
    cy.on("window:confirm", (str) => {
      return false;
    });
    cy.get("#confirm-alert-text").contains("You pressed Cancel!");
  });

  it("Validate js confirm alert box works correctly by clicking on ok", () => {
    cy.visit("https://www.webdriveruniversity.com");
    cy.get("#popup-alerts")
      .invoke("removeAttr", "target")
      .click({ force: true });

    //this will click on cancel button
    const stub = cy.stub();
    //when event fired it will store all event data into stub
    cy.on("window:confirm", stub);

    cy.get("#button4")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Press a button!");
      })
      .then(() => {
        return true;
      })
      .then(() => {
        cy.get("#confirm-alert-text").contains("You pressed OK!");
      });
  });
});
