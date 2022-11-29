/// <reference types="Cypress" />
describe('Teat Contact us form via WbdriverUni', () => {
    before(function() {
        cy.fixture('example').then(function(data) {
            globalThis.data = data;            
        })
    })
    before(function()  {
        cy.fixture("profile").as("user")
      
    });

    it('Should be able to submit a succesful submit via contact us form', () => {
        
        //cy.visit("https://www.webdriveruniversity.com/Contact-Us/contactus.html");
        cy.visit("/") //this is coming from baseUrl inside cypress.config.js
        cy.get('#contact-us').invoke('removeAttr','target').click({force:true});
        cy.document().should('have.property','charset').and('eq', 'UTF-8');
        cy.title().should('include', 'WebDriver | Contact Us');
        cy.url().should('include', 'contactus');
        //cy.get('#contact-us').click();
        cy.get('[name="first_name"]').type(data.first_name);
        cy.get('[name="last_name"]').type(data.last_name);
        cy.get('[name="email"]').type(data.email);
        cy.get('textarea.feedback-input').type("Awesome site");
        cy.get('[type="submit"]').click();
        cy.get('h1').should('have.text','Thank You for your Message!');
        

    });

    it.only('Should not able to submit a succesful submit via contact us form', () => {

        //cy.visit("https://www.webdriveruniversity.com/Contact-Us/contactus.html");
        cy.visit("https://www.webdriveruniversity.com")
        //this code will open a new tab which is contact-us page
        cy.get('#contact-us').invoke('removeAttr','target').click({force:true});
        //below code  will use profile fixture  refer to line 8
        cy.get("@user").then((user)=>{
        cy.get('[name="first_name"]').type(user.first_Name);
        cy.get('[name="last_name"]').type(user.last_Name);
       })
        cy.get('textarea.feedback-input').type("Awesome site");
        cy.get('[type="submit"]').click();
        cy.get('body').contains('Error: all fields are required');

        
        
    });
    
});

//Selectors => //h2[starts-with(text(),'Con')]  
// //input[contains(@name.'email')]
// //h2[starts-with(text(),'Con')]/following-sibling::ul/li
// ./node_modules/.bin/cypress run => running from command line with headless form 
// ./node_modules/.bin/cypress run --headed  => running with headed
// ./node_modules/.bin/cypress run --browser chrome  
// ./node_modules/.bin/cypress run --spec cypress/e2e/webdriver-uni/contact-us.js  =>specific test run
// ,/node_modules/.bin/cypress run --spec cypress/e2e/webdriver-uni/* => run all of them 

