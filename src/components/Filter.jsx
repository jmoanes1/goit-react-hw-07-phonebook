
/**
 * Filter
 * - value: string
 * - onChange: function(value)
 */
import React from "react";

export default function Filter({ value, onChange }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <input
        className="filter-input"
        placeholder="Search contacts by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
