import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import Contact from "./Contact";

jest.mock("@emailjs/browser", () => ({
  sendForm: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { error: jest.fn(), success: jest.fn() },
  ToastContainer: () => null,
}));

const fillValidForm = () => {
  fireEvent.change(screen.getByPlaceholderText("Your Name"), {
    target: { value: "Test User" },
  });
  fireEvent.change(screen.getByPlaceholderText("Your Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
    target: { value: "9843771236" },
  });
  fireEvent.change(screen.getByPlaceholderText("Subject"), {
    target: { value: "Hello" },
  });
  fireEvent.change(screen.getByPlaceholderText("Your Message"), {
    target: { value: "Message body" },
  });
};

describe("Contact", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form and updates message character count", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { name: /get in touch/i })).toBeInTheDocument();
    const msg = screen.getByPlaceholderText("Your Message");
    fireEvent.change(msg, { target: { value: "abc" } });
    expect(screen.getByText(/497 Characters/)).toBeInTheDocument();
  });

  it("opens success modal when email sends successfully", async () => {
    emailjs.sendForm.mockResolvedValueOnce({ text: "OK" });
    render(<Contact />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /^send$/i }));

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /success!!/i })).toBeInTheDocument();
    });
    expect(screen.getByText(/successfully sent email/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: /success!!/i })).not.toBeInTheDocument();
    });
  });

  it("shows toast error when email send fails", async () => {
    emailjs.sendForm.mockRejectedValueOnce({ message: "network" });
    render(<Contact />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /^send$/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it("closes modal via dismiss button", async () => {
    emailjs.sendForm.mockResolvedValueOnce({ text: "OK" });
    render(<Contact />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /^send$/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "×" })).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("button", { name: "×" }));

    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: /success!!/i })).not.toBeInTheDocument();
    });
  });

  it("does not open success modal when sendForm resolves with a falsy result", async () => {
    emailjs.sendForm.mockResolvedValueOnce(null);
    render(<Contact />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: /^send$/i }));

    await waitFor(() => expect(emailjs.sendForm).toHaveBeenCalled());

    expect(screen.queryByRole("heading", { name: /success!!/i })).not.toBeInTheDocument();
  });

});
