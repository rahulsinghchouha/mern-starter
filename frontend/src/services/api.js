const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "The request could not be completed.");
  }

  return data;
}

export function getItems() {
  return request("/items");
}

export function createItem(name) {
  return request("/items", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

export function getItem(id) {
  return request(`/items/${encodeURIComponent(id)}`);
}

export function updateItem(id, name) {
  return request(`/items/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
  });
}

export function deleteItem(id) {
  return request(`/items/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
