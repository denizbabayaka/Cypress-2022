/// <reference types="Cypress" />
/// <reference types="cypress-xpath" />

//const { constant } = require("cypress/types/lodash");

describe('Verifying variables, cypress commands and jquery commands', () => {

    it('Navigating to specific product page', () => {
        cy.visit("https://www.automationteststore.com/");
        //get the link from element and assign to makeupLink
        // this code below is not recommended
        // const makeupLink = cy
        //   .get("a[href*='product/category&path=']")
        //   .contains("Makeup");
        //   makeupLink.click();
        //   const skincareLink = cy
        //   .get("a[href*='product/category&path=']")
        //   .contains("Skincare");
        //   skincareLink.click();
         
        
         //this code below recommended 
           cy.get("a[href*='product/category&path=']")
             .contains("Skincare")
             .click();
             
           cy.get("a[href*='product/category&path=']")
           .contains("Makeup")
           .click();
       
   });
   
       it('Navigating to specific product page', () => {
         cy.visit("https://www.automationteststore.com/");
         //locator cover more than one  element with contains we click specific one 
         cy.get("a[href*='product/category&path=']").contains("Makeup").click();

         // This code will fail
         // const header = cy.get("h1 .maintext");
         // cy.log("Printing header text: " + header.text());

         // below we make a promise(then()) get the element assign it to variable
         // and then we use .then to get the text and log it  and then print the text
         cy.get("h1 .maintext").then(($headerText) => {
           const headerText = $headerText.text();
           cy.log("Printing header text: " + headerText);
           expect(headerText).is.eq("Makeup");
         });
       });

       it.only('Validate properties of the Contact Us Page', () => {
         cy.visit(
           "https://www.automationteststore.com/index.php?rt=content/contact"
         );

         //Uses cypress commands and chaning
         //below contains() get 2 parameter 1 is element 2 is text and validate the text 
         cy.contains("#ContactUsFrm", "Contact Us Form")
           .find("#field_11")
           .should("contain", "First name");

           //JQuery Approach then() is promise => is call back 
           cy.contains("#ContactUsFrm", "Contact Us Form").then((text) => {
             const firstNameText = text.find("#field_11").text();
             expect(firstNameText).to.contain("First name");

             //Embedded commands then(fnText brings us t the text of the element)
             cy.get("#field_11").then((fnText) => {
               cy.log(fnText.text());
               //this only print the element text not the text of the element
               cy.log(fnText)
             });
           }); 
       });

});