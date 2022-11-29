/// <reference types="cypress" />

describe("Iterate over elements", () => {
  it("Log information of all hair care products", () => {
    cy.visit("https://www.automationteststore.com/");
    cy.get("a[href*='product/category&path=']").contains("Hair Care").click();

    //this code will get the list of elements and index numbers and assign to $el variable
    cy.get(".fixed_wrapper .prdocutname").each(($el, index, $list) => {
      //and print all the  index number and text of the element
      cy.log("Index: " + index + " : " + $el.text());
    });
  });

  it("Add specific product to besket", () => {
    cy.visit("https://www.automationteststore.com/");
    cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
    cy.get(".fixed_wrapper .prdocutname").each(($el, index, $list) => {
      if ($el.text().includes("Curls to straight Shampoo")) {
        //wrap has all the elements locator
        cy.wrap($el).click();
      }
      
    });
  });
});
