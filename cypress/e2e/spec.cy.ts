describe('Heygo frontend test site', () => {
  describe('critical positive paths', () => {
    it('searches and navigates to a locations page and back to home', () => {
      cy.visit('/');

      // Confirm home page content
      cy.findByRole('heading', { name: /where do you want to go?/i });

      // Find a long city name
      cy.findByRole('combobox', { name: /find a location/i }).type('tunbri');
      cy.findByText(/loading/i);
      cy.findByRole('option', { name: /Royal Tunbridge Wells/i })
        .click()
        .wait(1100); // Waiting on api rate limit;
      cy.findByRole('link', { name: /take me there/i });

      // Find a short city name
      cy.findByRole('combobox', { name: /find a location/i }).type('coka');
      cy.findByText(/loading/i);
      cy.findByRole('option', { name: /Cokato/i, exact: true, timeout: 3000 })
        .click()
        .wait(1100); // Waiting on api rate limit;

      cy.findByRole('link', { name: /take me to Cokato/i }).click();

      // Confirm location page content
      cy.url().should('include', '/location/121210');
      cy.findByRole('heading', { name: /great choice/i });
      cy.findByRole('heading', {
        name: /Now let's discover more about Cokato/i,
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

  describe('critical negative paths', () => {
    it('shows message when requests are too frequent and allows you to navigate home', () => {
      cy.wait(1100);

      // Navigate and confirm page contents
      cy.visit('/location/121210');
      cy.findByRole('heading', {
        name: /Now let's discover more about Cokato/i,
      });

      // Simulate an immediate refresh
      cy.reload(true);

      // Confirm error message contents
      cy.findByRole('heading', {
        name: /too many searches/i,
      });

      cy.findByRole('link', { name: /let's go home/i }).click();

      // Confirm we are back home
      cy.findByRole('heading', { name: /where do you want to go?/i });
    });
    it('shows message when an invalid location url is visited and allows you to navigate home', () => {
      cy.wait(1100);

      // Navigate and confirm page contents
      cy.visit('/location/invalid');
      cy.findByRole('heading', {
        name: /Location unknown/i,
      });

      cy.findByRole('link', { name: /let's go home/i }).click();

      // Confirm we are back home
      cy.findByRole('heading', { name: /where do you want to go?/i });
    });
    it('shows message when an invalid url is visited and allows you to navigate home', () => {
      cy.wait(1100);

      // Navigate and confirm page contents
      cy.visit('/something-invalid');
      cy.findByRole('heading', {
        name: /page not found/i,
      });

      cy.findByRole('link', { name: /let's go home/i }).click();

      // Confirm we are back home
      cy.findByRole('heading', { name: /where do you want to go?/i });
    });
  });
});
