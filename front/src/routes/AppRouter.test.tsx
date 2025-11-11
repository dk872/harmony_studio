import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { useAuth } from "../context/AuthContext";

jest.mock("../context/AuthContext");

jest.mock("../components/MainPage/MainPage", () => () => <div>MainPage</div>);
jest.mock("../pages/Login/LoginPage", () => () => <div>LoginPage</div>);
jest.mock("../pages/Register/RegisterPage", () => () => <div>RegisterPage</div>);
jest.mock("../pages/Profile/ProfilePage", () => () => <div>ProfilePage</div>);
jest.mock("../pages/Admin/AdminPage", () => () => <div>AdminPage</div>);

jest.mock("../pages/Service/ServicePage", () => {
  return () => {
    const React = require("react");
    const { useParams } = require("react-router-dom");
    const { serviceId } = useParams();
    return <div>{`ServicePage ${serviceId}`}</div>;
  };
});

jest.mock("../pages/Master/MasterPage", () => {
  return () => {
    const React = require("react");
    const { useParams } = require("react-router-dom");
    const { masterId } = useParams();
    return <div>{`MasterPage ${masterId}`}</div>;
  };
});

describe("AppRouter", () => {
  const mockUseAuth = useAuth as jest.Mock;

  it("renders MainPage on /", () => {
    mockUseAuth.mockReturnValue({ role: "user", isAuthenticated: false });
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("MainPage")).toBeInTheDocument();
  });

  it("renders LoginPage on /login", () => {
    mockUseAuth.mockReturnValue({ role: "user", isAuthenticated: false });
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("LoginPage")).toBeInTheDocument();
  });

  it("renders RegisterPage on /register", () => {
    mockUseAuth.mockReturnValue({ role: "user", isAuthenticated: false });
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("RegisterPage")).toBeInTheDocument();
  });

  it("renders ServicePage with id", () => {
    mockUseAuth.mockReturnValue({ role: "user", isAuthenticated: false });
    render(
      <MemoryRouter initialEntries={["/services/42"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("ServicePage 42")).toBeInTheDocument();
  });

  it("renders MasterPage with id", () => {
    mockUseAuth.mockReturnValue({ role: "user", isAuthenticated: false });
    render(
      <MemoryRouter initialEntries={["/masters/99"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("MasterPage 99")).toBeInTheDocument();
  });

  it("redirects to login if unauthenticated user visits /profile", () => {
    mockUseAuth.mockReturnValue({ role: "user", isAuthenticated: false });
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("LoginPage")).toBeInTheDocument();
  });

  it("renders ProfilePage if authenticated user visits /profile", () => {
    mockUseAuth.mockReturnValue({ role: "user", isAuthenticated: true });
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("ProfilePage")).toBeInTheDocument();
  });

  it("redirects to / if non-admin visits /admin", () => {
    mockUseAuth.mockReturnValue({ role: "user", isAuthenticated: true });
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("MainPage")).toBeInTheDocument();
  });

  it("renders AdminPage if admin visits /admin", () => {
    mockUseAuth.mockReturnValue({ role: "admin", isAuthenticated: true });
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("AdminPage")).toBeInTheDocument();
  });

  it("redirects unknown path to /", () => {
    mockUseAuth.mockReturnValue({ role: "user", isAuthenticated: false });
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("MainPage")).toBeInTheDocument();
  });
});
