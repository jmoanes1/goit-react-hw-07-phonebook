
/**
 * ContactList
 * props:
 *  - contacts: array [{ id, name, number }]
 *  - onDelete(id)
 */

import React, { useMemo } from "react";

export default function ContactList({ contacts, onDelete }) {
  // memoize rendered list items to avoid unnecessary re-renders
  const items = useMemo(() => {
    return contacts.map((c) => (
      <div className="contact" key={c.id}>
        <div className="meta">
          <div className="avatar">{getInitials(c.name)}</div>
          <div>
            <div className="name">{c.name}</div>
            <div className="number">{c.number}</div>
          </div>
        </div>
        <div>
          <button
            className="icon-button"
            onClick={() => {
              if (window.confirm(`Delete ${c.name}?`)) onDelete(c.id);
            }}
            title="Delete contact"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  }, [contacts, onDelete]);

  if (!contacts || contacts.length === 0) {
    return <div style={{ color: "#6b6f76" }}>No contacts found.</div>;
  }

  return <div className="list">{items}</div>;
}

function getInitials(name) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
