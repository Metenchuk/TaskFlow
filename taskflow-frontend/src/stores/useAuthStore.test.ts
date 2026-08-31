import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "./authStore";

const mockUser = {
  id: "1",
  email: "test@example.com",
  fullName: "Test User",
  role: "member",
};

beforeEach(() => {
  useAuthStore.setState({ user: null, token: null, isAuthenticated: false });
});

describe("useAuthStore", () => {
  it("початковий стан — не автентифікований", () => {
    const { user, token, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(token).toBeNull();
    expect(isAuthenticated).toBe(false);
  });

  it("setAuth встановлює user і token", () => {
    useAuthStore.getState().setAuth({ user: mockUser, token: "abc123" });
    const { user, token, isAuthenticated } = useAuthStore.getState();
    expect(user).toEqual(mockUser);
    expect(token).toBe("abc123");
    expect(isAuthenticated).toBe(true);
  });

  it("logout скидає стан до початкового", () => {
    useAuthStore.getState().setAuth({ user: mockUser, token: "abc123" });
    useAuthStore.getState().logout();
    const { user, token, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(token).toBeNull();
    expect(isAuthenticated).toBe(false);
  });

  it("isAuthenticated false до setAuth", () => {
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it("setAuth зберігає role у user", () => {
    useAuthStore.getState().setAuth({ user: mockUser, token: "xyz" });
    expect(useAuthStore.getState().user?.role).toBe("member");
  });
});