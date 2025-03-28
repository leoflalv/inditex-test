import '@testing-library/cypress/add-commands';
import 'cypress-file-upload';

// Cypress Testing Library adds custom commands like cy.findByRole()
// and provides better error messages focused on accessibility

// You can add more custom commands here
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// Prevent TypeScript from showing errors for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
