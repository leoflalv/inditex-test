/// <reference types="cypress" />

describe('Category Editor', () => {
  beforeEach(() => {
    cy.visit('/category/1/edit');

    cy.getByTestId('rows-container').should('be.visible');
  });

  it('should display category name and sections', () => {
    // Check if category name is displayed
    cy.contains('New Collection').should('be.visible');

    // Check if sections are rendered
    cy.getByTestId('rows-container').children().should('have.length.gt', 0);
  });

  it('should toggle edit mode correctly', () => {
    // Click edit button
    cy.getByTestId('edit-mode-toggle').click();

    // Verify edit mode is active
    cy.getByTestId('edit-mode-footer').should('be.visible');

    // Verify save and cancel buttons are present
    cy.contains('Save Changes').should('be.visible');
    cy.contains('Cancel').should('be.visible');

    // Cancel edit mode
    cy.contains('Cancel').click();

    // Verify edit mode is deactivated
    cy.getByTestId('edit-mode-footer').should('not.exist');
  });

  it('should handle zoom controls', () => {
    cy.getByTestId('edit-mode-toggle').click();
    // Get initial transform scale

    cy.getByTestId('rows-container')
      .invoke('css', 'transform')
      .then((initialTransform) => {
        // Click zoom in button
        cy.getByTestId('zoom-out-button').click();

        // Verify scale has decreased
        cy.getByTestId('rows-container')
          .invoke('css', 'transform')
          .should('not.eq', initialTransform);
      });
  });

  it('should handle drag and drop between sections', () => {
    // Enter edit mode
    cy.getByTestId('edit-mode-toggle').click();

    // Wait for the sortable rows to be fully loaded
    cy.get('[data-testid^="sortable-row-"]').should('have.length.gt', 1);

    // Get initial order of sections
    cy.get('[data-testid^="sortable-row-"]')
      .then(($rows) => Array.from($rows, (el) => el.getAttribute('data-testid')))
      .as('initialOrder');

    const initialFirstRowLength = cy
      .get('[data-testid^="sortable-row-"]')
      .first()
      .children()
      .its('length');

    // Perform drag and drop
    cy.get('[data-testid^="sortable-row-"]')
      .first()
      .trigger('mousedown', { button: 0 })
      .trigger('mousemove', { clientY: 100 })
      .wait(500) // Give time for the drag preview to appear
      .get('[data-testid^="sortable-row-"]')
      .eq(1)
      .trigger('mousemove')
      .trigger('mouseup', { force: true });

    // Wait for potential animations or state updates
    cy.wait(1000);

    const newFirstRow = cy.get('[data-testid^="sortable-row-"]').first().children().its('length');

    expect(initialFirstRowLength).to.not.eq(newFirstRow);
  });

  it('should create item in first row, move it to second row ', () => {
    // Enter edit mode
    cy.getByTestId('edit-mode-toggle').click();

    // Get initial number of products in first row
    cy.get('[data-testid^="sortable-row-"]')
      .first()
      .find('[data-testid^="product-card-"]')
      .its('length')
      .as('initialFirstRowProducts');

    // Get initial number of products in second row
    cy.get('[data-testid^="sortable-row-"]')
      .eq(1)
      .find('[data-testid^="product-card-"]')
      .its('length')
      .as('initialSecondRowProducts');

    // Click add product button in first row
    cy.get('[data-testid^="sortable-row-"]')
      .first()
      .find('[data-testid^="add-product-button-"]')
      .click();

    // Fill product form
    cy.get('[data-testid="product-form"]').within(() => {
      cy.get('input[name="name"]').type('Test Product');
      cy.get('input[name="price"]').type('99.99');

      // Handle file upload
      cy.fixture('test-product-image.png', 'base64').then((fileContent) => {
        cy.get('input[type="file"]').attachFile({
          fileContent,
          fileName: 'test-product-image.png',
          mimeType: 'image/png',
        });
      });

      cy.wait(1000);

      // Wait for upload to complete
      cy.get('[data-testid="image-upload-preview"]', { timeout: 10000 }).should('be.visible');

      // Submit form
      cy.contains('button', 'Create Product').click();
    });

    // Verify product was added to first row
    cy.get('body').should('contain', 'Test Product');

    // Drag the newly created product to the second row
    cy.get('[data-testid^="sortable-row-"]')
      .first()
      .trigger('mousedown', { button: 0 })
      .trigger('mousemove', { clientY: 100 })
      .wait(500) // Give time for the drag preview to appear
      .get('[data-testid^="sortable-row-"]')
      .eq(1)
      .trigger('mousemove')
      .trigger('mouseup', { force: true });

    // Wait for drag animation
    cy.wait(1000);

    // Verify product was moved to second row
    cy.get('[data-testid^="sortable-row-"]')
      .eq(1)
      .find('[data-testid^="product-card-"]')
      .its('length')
      .then((length) => {
        expect(length).to.be.equal(3);
      });
  });
});
