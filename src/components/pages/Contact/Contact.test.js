import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from './Contact';

// Mock emailjs
jest.mock('@emailjs/browser', () => ({
  sendForm: jest.fn(),
}));

// Mock react-toastify
jest.mock('react-toastify', () => ({
  ToastContainer: () => <div data-testid="toast-container" />,
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Contact Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Contact form with all inputs', () => {
    render(<Contact />);

    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Subject')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  test('updates character count on message input', () => {
    render(<Contact />);

    const textarea = screen.getByPlaceholderText('Your Message');
    fireEvent.change(textarea, { target: { value: 'Hello' } });

    expect(screen.getByText('495 Characters')).toBeInTheDocument();
  });

  test('submits form successfully and opens modal', async () => {
    const mockSendForm = require('@emailjs/browser').sendForm;
    mockSendForm.mockResolvedValue({ text: 'OK' });

    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText('Your Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByPlaceholderText('Subject'), {
      target: { value: 'Test Subject' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your Message'), {
      target: { value: 'Test Message' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(mockSendForm).toHaveBeenCalled();
      expect(screen.getByText('Success!!')).toBeInTheDocument();
      expect(screen.getByText('successfully sent email.')).toBeInTheDocument();
    });
  });

  test('shows error on form submission failure', async () => {
    const mockSendForm = require('@emailjs/browser').sendForm;
    const mockToastError = require('react-toastify').toast.error;
    mockSendForm.mockRejectedValue(new Error('Send failed'));

    render(<Contact />);

    fireEvent.change(screen.getByPlaceholderText('Your Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByPlaceholderText('Subject'), {
      target: { value: 'Test Subject' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your Message'), {
      target: { value: 'Test Message' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith(
        'Please fill contact details correctly',
        NaN
      );
    });
  });

  test('closes modal when close button is clicked', async () => {
    const mockSendForm = require('@emailjs/browser').sendForm;
    mockSendForm.mockResolvedValue({ text: 'OK' });

    render(<Contact />);

    // Fill and submit form
    fireEvent.change(screen.getByPlaceholderText('Your Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByPlaceholderText('Subject'), {
      target: { value: 'Test Subject' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your Message'), {
      target: { value: 'Test Message' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(screen.getByText('Success!!')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(screen.queryByText('Success!!')).not.toBeInTheDocument();
    });
  });
});
