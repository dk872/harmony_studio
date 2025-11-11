import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ServiceCard from "./ServiceCard";

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("ServiceCard", () => {
  it("renders service card correctly and handles button click", () => {
    const service = {
      id: 1,
      name: "Test Service",
      description: "Service description",
      img: "test.jpg",
    };

    render(<ServiceCard {...service} />);

    expect(screen.getByText(service.name)).toBeInTheDocument();
    expect(screen.getByText(service.description)).toBeInTheDocument();
    const img = screen.getByAltText(service.name) as HTMLImageElement;
    expect(img.src).toContain(service.img);

    const button = screen.getByRole("button", { name: /see more/i });
    fireEvent.click(button);
  });
});
