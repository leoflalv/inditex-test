import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act,fireEvent, render, screen } from '@testing-library/react';

import { Snackbar } from '../Snackbar';

describe('Snackbar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render success message', () => {
    const onClose = vi.fn();
    render(
      <Snackbar
        message="Success message"
        type="success"
        onClose={onClose}
        autoHideDuration={5000}
      />,
    );

    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('should render error message', () => {
    const onClose = vi.fn();
    render(
      <Snackbar message="Error message" type="error" onClose={onClose} autoHideDuration={5000} />,
    );

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Snackbar message="Test message" type="success" onClose={onClose} autoHideDuration={5000} />,
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should auto-hide after specified duration', () => {
    const onClose = vi.fn();
    render(
      <Snackbar message="Test message" type="success" onClose={onClose} autoHideDuration={5000} />,
    );

    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should use default autoHideDuration when not specified', () => {
    const onClose = vi.fn();
    render(<Snackbar message="Test message" type="success" onClose={onClose} />);

    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(5000); // Default duration
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
