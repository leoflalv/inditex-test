import { describe, expect, it } from 'vitest';
import { fireEvent,render, screen } from '@testing-library/react';

import { CATEGORY } from '../../../../__mocks__/category';
import { ModalProvider } from '../../../../shared/presentation/ui/modal/ModalContext';
import { CategoryManagerProvider } from '../context/categoryManagerContext';
import InnerCategoryEditor from '../InnerCategoryEditor';

const renderWithProviders = () => render(
    <ModalProvider>
      <CategoryManagerProvider category={CATEGORY}>
        <InnerCategoryEditor />
      </CategoryManagerProvider>
    </ModalProvider>,
  );

describe('InnerCategoryEditor', () => {
  it('should render the category name', () => {
    renderWithProviders();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('should toggle edit mode when clicking the edit button', () => {
    renderWithProviders();

    expect(screen.queryByTestId('edit-mode-footer')).not.toBeInTheDocument();

    const editButton = screen.getByTestId('edit-mode-toggle');
    fireEvent.click(editButton);

    expect(screen.getByTestId('edit-mode-footer')).toBeInTheDocument();

    fireEvent.click(editButton);

    expect(screen.queryByTestId('edit-mode-footer')).not.toBeInTheDocument();
  });

  it('should show all initial sections', () => {
    renderWithProviders();

    // Check if all products from the mock data are rendered
    expect(screen.getByText('Smartphone')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Headphones')).toBeInTheDocument();
    expect(screen.getByText('Tablet')).toBeInTheDocument();
  });
});
