const USERS_URL = "http://localhost:3000/users";

async function getUsersByEmail(email) {
  const response = await fetch(`${USERS_URL}?email=${encodeURIComponent(email)}`);

  if (!response.ok) {
    throw new Error("Unable to connect to the user service. Please try again.");
  }

  return response.json();
}

export async function registerUser({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUsers = await getUsersByEmail(normalizedEmail);

  if (existingUsers.length > 0) {
    throw new Error("An account with this email already exists.");
  }

  const response = await fetch(USERS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.trim(),
      email: normalizedEmail,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Registration failed. Please try again.");
  }

  return response.json();
}

export async function loginUser({ email, password }) {
  const users = await getUsersByEmail(email.trim().toLowerCase());
  const user = users.find((registeredUser) => registeredUser.password === password);

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  return user;
}