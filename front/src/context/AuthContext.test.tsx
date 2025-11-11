import React from "react";
import { render, screen, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";

const TestComponent = () => {
  const { role, setRole, isAuthenticated, setIsAuthenticated, userId, setUserId } = useAuth();

  return (
    <div>
      <div data-testid="role">{role}</div>
      <div data-testid="auth">{isAuthenticated ? "true" : "false"}</div>
      <div data-testid="userId">{userId ?? "null"}</div>
      <button onClick={() => setRole("admin")}>SetRole</button>
      <button onClick={() => setIsAuthenticated(true)}>AuthTrue</button>
      <button onClick={() => setUserId(42)}>SetUserId</button>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("provides default values correctly", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("role").textContent).toBe("guest");
    expect(screen.getByTestId("auth").textContent).toBe("false");
    expect(screen.getByTestId("userId").textContent).toBe("null");
  });

  it("updates and stores role in localStorage", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      screen.getByText("SetRole").click();
    });

    expect(screen.getByTestId("role").textContent).toBe("admin");
    expect(localStorage.getItem("role")).toBe("admin");
  });

  it("updates and stores authentication state", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      screen.getByText("AuthTrue").click();
    });

    expect(screen.getByTestId("auth").textContent).toBe("true");
    expect(localStorage.getItem("isAuthenticated")).toBe("true");
  });

  it("updates and stores userId correctly", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      screen.getByText("SetUserId").click();
    });

    expect(screen.getByTestId("userId").textContent).toBe("42");
    expect(localStorage.getItem("userId")).toBe("42");
  });
});
