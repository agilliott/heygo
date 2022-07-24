describe('Heygo frontend test site', () => {
  describe('critial positive paths', () => {
    it('searches and navigates to a locations page and back to home', () => {
      cy.visit('/');

      // Confirm home page content
      cy.findByRole('heading', { name: /where do you want to go?/i });
      cy.findByRole('combobox', { name: /find a location/i })
        .type('tunbri')
        .wait(1100); // API limits 1 call per second so lets wait to make sure
      cy.findByRole('option', { name: /Royal Tunbridge Wells/i })
        .click()
        .wait(1100); // We need to await again as a computer is fast than a human
      cy.findByRole('link', { name: /take me there/i }).click();

      // Confirm location page content
      cy.url().should('include', '/location/44077');
      cy.findByRole('heading', { name: /great choice/i });
      cy.findByRole('heading', {
        name: /Now let's discover more about Royal Tunbridge Wells/i,
      });

      // Find map
      cy.get('.pigeon-overlays');
      // Find map marker
      cy.get('.pigeon-click-block');

      cy.findByRole('link', { name: /take me home/i }).click();

      // Confirm we are back home
      cy.findByRole('heading', { name: /where do you want to go?/i });
    });
  });
  // Test negative paths
  // - Check error pages and conditions
  // - Load test
});
