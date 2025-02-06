describe("responsive-test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  // iPhone 12 Pro - Mobile
  it("iphone-12pro", () => {
    cy.viewport(390, 884);
    cy.home();
    cy.wait(5000);
  });

  // iPad Air - Tablet
  it("ipadAir", () => {
    cy.viewport(820, 1180);
    cy.home();
    cy.wait(5000);
  });

  // Desktop
  it("desktop", () => {
    cy.viewport(1512, 982); // MacBook Pro 14"
    cy.home();
    cy.wait(4000);
  });

  // Extra: Check for mobile layout
  it("mobile", () => {
    cy.viewport(375, 667);
    cy.get("[data-test='logo']").should("be.visible");
    cy.home();
    cy.wait(4000);
  });
});
