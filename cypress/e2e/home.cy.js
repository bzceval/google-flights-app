describe("home-page", () => {
  it("home-page-redirect", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-test='logo']").should("be.visible");
    const expectedLogoSrc = "/static/media/googlelogo_dark";
    cy.get("[data-test='logo']")
      .should("have.attr", "src")
      .and("include", expectedLogoSrc);
  });
  it("flights-search", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-test='landing-text']")
      .should("be.visible")
      .contains("Flights");
  });
});
