/// <reference types="cypress" />

describe("Test date picker via webdriveruni", () => {
  it("Select date from the datepicker", () => {
    cy.visit("http://www.webdriveruniversity.com");
    cy.get("#datepicker").invoke("removeAttr", "target").click({ force: true });
    cy.get("#datepicker").click();

    // let date = new Date();
    // date.setDate(date.getDate()); // get durrent date
    // cy.log(date.getDate());// get current date
    // let date2 = new Date();
    // date2.setDate(date2.getDate() + 5);
    // cy.log(date2.getDate());// get current date i.e 22+5=27

    var date = new Date();
    date.setDate(date.getDate() + 366);
    var futureYear = date.getFullYear();
    var futureMonth = date.toLocaleString("default", { month: "long" });
    var futureDay = date.getDate();
    cy.log("new date is :" + futureMonth + "/" + futureDay + "/" + futureYear);

    function selectMonthAndYear() {
      cy.get(".datepicker-dropdown")
        .find(".datepicker-switch")
        .first()
        .then((currentDate) => {
          if (!currentDate.text().includes(futureYear)) {
            cy.get(".next").first().click();
            selectMonthAndYear();
          }
        })
        .then(() => {
          cy.get(".datepicker-dropdown")
            .find(".datepicker-switch")
            .first()
            .then((currentDate) => {
              if (!currentDate.text().includes(futureMonth)) {
                cy.get(".next").first().click();
                selectMonthAndYear();
              }
            });
        });
    }
    function selectFutureDay() {
      cy.get('[class="day"]').contains(futureDay).click();
    }
    selectMonthAndYear();
    selectFutureDay();
  });
});
