/// <reference types="cypress" />

describe("Handling Tables", () => {
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/tables");
  });

  it("Get the lenght of  whole table", () => {
    cy.get("#table1").as("table");
    cy.get("@table").find("tr").as("rows");
    cy.get("@rows").find("td").as("cells");
    cy.get("@cells").should("have.length", 24);
  });

  it("Get table cell text", () => {
    cy.get("#table1").as("table");
    cy.get("@table").find("tr").as("rows");
    cy.get("@rows").find("td").as("cells");
    cy.get("@cells").then(($cells) => {
      for (let i = 0; i < $cells.length; i++) {
        cy.log($cells[i].innerText);
      }
    });
  });

  it("Get table cell data", () => {
    cy.get("#table1>tbody>tr").each(($row, index, $list) => {
      cy.wrap($row).within(() => {
        cy.get("td").each(($cellData, index, $list) => {
          cy.log($cellData.text());
        });
      });
    });
  });

  it("Get single row data", () => {
    cy.get("#table1")
      .find("tr")
      .eq(2)
      .then(($row) => {
        cy.wrap($row)
          .find("td")
          .each(($td, index, $list) => {
            cy.log($td.text());
          });
      });
  });

  it("GEt specific cell value based on another call", () => {
    cy.get("#table1")
      .contains("Conway")
      .parent()
      .within(() => {
        cy.get("td")
          .eq(4)
          .then(($websiteLink) => {
            cy.log($websiteLink.text());
          });
      });
  });
});
