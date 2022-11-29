/// <reference types="Cypress" />
/// <reference types="cypress-xpath" />

describe('Inspect Automation Test Store items using chain of commands', () => {

    it('Click on the first item using chain f commands', () => {

        cy.visit("https://www.automationteststore.com/");
        cy.get(
          "#block_frame_featured_1769 > .thumbnails > :nth-child(1) > .fixed_wrapper > .fixed > .prdocutname"
        ).click();

    });

        it.only('Click on the first item using item text', () => {
            cy.visit("https://www.automationteststore.com/");
            //chain of commands 
            // then() will store the text inside element and print it 
            cy.get(".prdocutname").contains("Skinsheen Bronzer Stick").click().then(function(itemHeaderText){
                console.log(
                  "Selected the following item " + itemHeaderText.text()
                );
            })
                
       

        });
    

    it('Click on the first item using index', () => {
        cy.visit("https://www.automationteststore.com/");
        //chain of commands inside .fixed_wrapper we will look for .prdocutname and index 0 
        cy.get('.fixed_wrapper').find('.prdocutname').eq(0).click();
        
    });
    
});