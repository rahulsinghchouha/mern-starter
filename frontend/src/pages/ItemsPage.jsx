import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteItem, getItems } from "../services/api.js";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    getItems()
      .then(setItems)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(item) {
    if (!window.confirm(`Delete "${item.name}"? This cannot be undone.`)) return;

    setDeletingId(item._id);
    setError("");
    try {
      await deleteItem(item._id);
      setItems((currentItems) =>
        currentItems.filter((currentItem) => currentItem._id !== item._id),
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setDeletingId("");
    }
  }

  return (
    <section className="content-card">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Your collection</p>
          <h1>Items</h1>
          <p className="intro">Create, update, and remove items in your database.</p>
        </div>
        <Link className="button-link" to="/items/new">
          + New item
        </Link>
      </div>

      {error && <p className="message error" role="alert">{error}</p>}

      {loading ? (
        <p className="message">Loading items...</p>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <h2>No items yet</h2>
          <p className="message">Create your first item to see it listed here.</p>
          <Link className="button-link" to="/items/new">
            Create an item
          </Link>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Created</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td className="item-name">{item.name}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="row-actions">
                      <Link className="text-link" to={`/items/${item._id}/edit`}>
                        Edit
                      </Link>
                      <button
                        className="button-danger"
                        type="button"
                        onClick={() => handleDelete(item)}
                        disabled={deletingId === item._id}
                      >
                        {deletingId === item._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
