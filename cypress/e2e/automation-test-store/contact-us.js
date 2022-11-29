/// <reference types="Cypress" />
/// <reference types="cypress-xpath" />
 

  describe('Test Contact us form via Automation Test Store', () => {

    it('Should be able to submit a succesful submission via contact us form', () => {

        cy.visit("https://www.automationteststore.com/");
        //cy.get('.info_links_footer > :nth-child(5) > a').click();
        //cy.xpath("//a[contains(@href, 'contact')]").click();
        cy.get("a[href$=contact]").click().then(function(linkText) {
            cy.log('Clicked on link: ' + linkText.text());
        })
        cy.get("#ContactUsFrm_first_name").type("Joe");
        cy.get('#ContactUsFrm_email').type("Dones@gmail.com");
        cy.get('#ContactUsFrm_email').should('have.attr', 'name', 'email')
        cy.get("#ContactUsFrm_enquiry").type("Doing some testing");
        cy.get("button[title='Submit']").click();
        cy.get(".mb40 > :nth-child(3)").should(
          "have.text",
          "Your enquiry has been successfully sent to the store owner!"
        );

        
        
    });
    
  });

  // a[href$='contact'] =>ends with contact
  // a[href*='contact'] =>contains contact
  // a[href^='https'] => starts with https