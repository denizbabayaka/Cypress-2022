/// <reference types="cypress" />

describe("Alias and invoke", () => {
  it("Validate a specific hair care products", () => {
    cy.visit("https://www.automationteststore.com/");
    cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
    // below code will return the product name which is at index 0 invoke it as text
    cy.get(".fixed_wrapper .prdocutname")
      .eq(0)
      .invoke("text")
      .as("productThumbnail");
    //lenght should be greater than 5
    cy.get("@productThumbnail").its("length").should("be.gt", 5);
    cy.get("@productThumbnail").should("include", "Seaweed Conditioner");
  });

  it("Validate the index of products", () => {
    cy.visit("https://www.automationteststore.com/");
    //assign the element to a variable productThunbnail1
    cy.get(".thumbnail").as("productThumbnail1");
    cy.get("@productThumbnail1").should("have.length", 16);
    cy.get("@productThumbnail1")
      //since .productcart few steps down we use find to get the element
      .find(".productcart")
      // invoke will get the title attribute of the element
      .invoke("attr", "title")
      .should("include", "Add to Cart");
  });

  it.only("Calculate total of normal and sale products products", () => {
    cy.visit("https://www.automationteststore.com/");
    cy.get(".thumbnail").as("productThumbnail1");
    // cy.get("@productThumbnail1")
    //   .find(".oneprice")
    //   .each(($el, index, $list) => {
    //     cy.log($el.text());
    //   });

    cy.get("@productThumbnail1")
      .find(".pricenew")
      .invoke("text")
      .as("itemPrice");
    cy.get("@productThumbnail1")
      .find(".oneprice")
      .invoke("text")
      .as("saleItemPrice");
    var itemsTotal = 0;
    cy.get("@itemPrice").then(($linkText) => {
      var itemsPriceTotal = 0;
      //this will split the string from $ sign and get the price only
      var itemPrice = $linkText.split("$");
      // this will print only 1 item
      cy.log("Item Price " + itemPrice[1]);
      var index;
      for (let index = 0; index < itemPrice.length; index++) {
        //print all itemPrice in aloop based on the index
        cy.log(itemPrice[index]);
        //this will get the total price of all items as a Number
        itemsPriceTotal += Number(itemPrice[index]);
      }
      itemsTotal += itemsPriceTotal;
      cy.log("Non sale price items total " + itemsPriceTotal);
    });

    cy.get("@saleItemPrice")
      .then(($linkText) => {
        var saleItemsPrice = 0;
        var saleItemPrice = $linkText.split("$");
        var index;
        for (let index = 0; index < saleItemPrice.length; index++) {
          //print all itemPrice in aloop based on the index
          cy.log(saleItemPrice[index]);
          //this will get the total price of all items as a Number
          saleItemsPrice += Number(saleItemPrice[index]);
        }
        itemsTotal += saleItemsPrice;
        cy.log("Non sale price items total " + saleItemsPrice);
      })
      .then(() => {
        cy.log("Total price of all items " + itemsTotal);
        //this will get the total price of all items as a Number
        expect(itemsTotal).to.eq(625.6); 
      });
  });
});
