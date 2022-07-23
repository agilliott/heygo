describe('Heygo frontend test site', () => {
  describe('critial paths', () => {
    it('searches and navigates to a locations page and back to home', () => {
      cy.visit('/');

      cy.findByRole('heading', { name: /where do you want to go?/i });
      cy.findByRole('combobox', { name: /find a location/i }).type('Aixiri');
      cy.findByRole('option', { name: /aixirivall/i })
        .click()
        .wait(2000); // API limits 1 call per second so lets wait to make sure
      cy.findByRole('link', { name: /take me to aixirivall/i }).click();

      cy.url().should('include', '/location/3350606');
      cy.findByRole('heading', { name: /great choice/i });
      cy.findByRole('heading', { name: /now, about aixirivall/i });
      cy.get('.pigeon-overlays');

      cy.findByRole('link', { name: /take me home/i }).click();
      cy.findByRole('heading', { name: /where do you want to go?/i });
    });
  });
});
