import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token?: string;
}

const STORAGE_KEY = "@auth_user";
const DEMO_EMAIL = "demo@mayotte.fr";
const DEMO_PASSWORD = "password123";

// Simulated user database (in production, this would be a backend)
const users: Record<string, { password: string; user: User }> = {
  "demo@mayotte.fr": {
    password: "password123",
    user: {
      id: "1",
      email: "demo@mayotte.fr",
      firstName: "Jean",
      lastName: "Dupont",
      token: "demo_token_123",
    },
  },
};

export async function login(
  email: string,
  password: string
): Promise<User> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const userRecord = users[email];
  if (!userRecord || userRecord.password !== password) {
    throw new Error("Email ou mot de passe incorrect");
  }

  const user = userRecord.user;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export async function signup(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<User> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (users[email]) {
    throw new Error("Cet email est déjà utilisé");
  }

  if (password.length < 6) {
    throw new Error("Le mot de passe doit contenir au moins 6 caractères");
  }

  const user: User = {
    id: Math.random().toString(),
    email,
    firstName,
    lastName,
    token: `token_${Math.random().toString()}`,
  };

  users[email] = { password, user };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export async function logout(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export async function getAuthUser(): Promise<User | null> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to restore auth:", error);
    return null;
  }
}

export async function updateUser(user: User): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}
