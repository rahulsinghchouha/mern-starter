import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createItem, getItem, updateItem } from "../services/api.js";

export default function ItemFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    getItem(id)
      .then((item) => {
        if (!cancelled) setName(item.name);
      })
      .catch((requestError) => {
        if (!cancelled) setError(requestError.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    setSaving(true);
    setError("");
    try {
      if (isEditing) {
        await updateItem(id, trimmedName);
      } else {
        await createItem(trimmedName);
      }
      navigate("/");
    } catch (requestError) {
      setError(requestError.message);
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="content-card">
        <p className="message">Loading item...</p>
      </section>
    );
  }

  return (
    <section className="content-card form-card">
      <p className="eyebrow">{isEditing ? "Update your collection" : "Add to your collection"}</p>
      <h1>{isEditing ? "Edit item" : "Create item"}</h1>
      <p className="intro">
        {isEditing ? "Change the item name and save your update." : "Give your new item a name."}
      </p>

      {error && <p className="message error" role="alert">{error}</p>}

      <form className="item-form" onSubmit={handleSubmit}>
        <label htmlFor="item-name">Item name</label>
        <input
          id="item-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Learn MongoDB"
          maxLength={120}
          required
          autoFocus
        />
        <div className="form-actions">
          <Link className="button-secondary" to="/">
            Cancel
          </Link>
          <button type="submit" disabled={saving || !name.trim()}>
            {saving ? "Saving..." : isEditing ? "Save changes" : "Create item"}
          </button>
        </div>
      </form>
    </section>
  );
}
