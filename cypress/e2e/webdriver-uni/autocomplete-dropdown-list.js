/// <reference types="Cypress" />

describe("Verify Autocomplete drop down lists via webdriveruni", () => {
  it("Select specific product via auotcomplete list", () => {
    cy.visit("https://www.webdriveruniversity.com");
    cy.get("#autocomplete-textfield")
      .invoke("removeAttr", "target")
      .click({ force: true });
    cy.get("#myInput").type("A");
    // star means look for anything inside this element
    cy.get("#myInputautocomplete-list > *")
      .each(($el, index, $list) => {
        const prod = $el.text();
        const productToSelect = "Avacado";

        if (prod === productToSelect) {
          $el.click();
          cy.get("#submit-button").click();
          cy.url().should("include", productToSelect);
          return false;
        }
        // instead of writing a it block we can continue out test with diffrent parameters
        //by using then actually we can chain the test
      })
      .then(() => {
        cy.get("#myInput").type("g");
        // this will iterate through the dropdown list through each method
        // and assign it to $el variable
        cy.get("#myInputautocomplete-list > *").each(($el, index, $list) => {
          //This will get all the options in the dropdown list as text
          const prod = $el.text();
          const productToSelect = "Grapes";
          if (prod === productToSelect) {
            //click command depriciated with this version of cypress
            //$el.click();
            $el.trigger("click");
            cy.get("#submit-button").click();
            cy.url().should("include", productToSelect);
          }
        });
      });
  });
});
