import React, { useState, useCallback, useEffect } from "react";

/**
 * ContactForm
 * - onAdd({ name, number })
 * - formats phone number as XXX-XX-XX-X (max 8 digits)
 */

function formatPhoneDigits(digits) {
  // allow up to 8 digits
  const d = digits.slice(0, 8);
  const parts = [];
  if (d.length >= 3) {
    parts.push(d.slice(0, 3));
    if (d.length >= 5) {
      parts.push(d.slice(3, 5));
      if (d.length >= 7) {
        parts.push(d.slice(5, 7));
        if (d.length >= 8) {
          parts.push(d.slice(7, 8));
        } else if (d.length > 7) {
          parts.push(d.slice(7));
        }
      } else {
        parts.push(d.slice(5));
      }
    } else {
      parts.push(d.slice(3));
    }
  } else {
    parts.push(d);
  }
  return parts.filter(Boolean).join("-");
}

export default function ContactForm({ onAdd }) {
  const [name, setName] = useState("");
  const [rawNumber, setRawNumber] = useState(""); // digits only string
  const [displayNumber, setDisplayNumber] = useState("");

  // update displayNumber when rawNumber changes
  useEffect(() => {
    setDisplayNumber(formatPhoneDigits(rawNumber));
  }, [rawNumber]);

  const handleNumberChange = useCallback((e) => {
    // accept only digits
    const input = e.target.value;
    // remove non-digits
    const digits = input.replace(/\D/g, "");
    // limit to 8 digits for the format
    setRawNumber(digits.slice(0, 8));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const trimmedName = name.trim();
      if (!trimmedName) {
        alert("Please enter a name.");
        return;
      }
      if (rawNumber.length < 8) {
        const proceed = window.confirm(
          "Number seems short. Do you want to add anyway?"
        );
        if (!proceed) return;
      }

      onAdd({
        name: trimmedName,
        number: formatPhoneDigits(rawNumber),
      });

      // clear
      setName("");
      setRawNumber("");
    },
    [name, rawNumber, onAdd]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          className="input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-row">
        <input
          className="input"
          placeholder="Phone (digits only, will format)"
          value={displayNumber}
          onChange={handleNumberChange}
          // allow pasting digits
        />
        <button type="submit" className="button small">
          Add
        </button>
      </div>

      <div style={{ color: "#6b6f76", fontSize: 13 }}>
        Format: <strong>XXX-XX-XX-X</strong> — up to 8 digits. Non-digit characters are ignored.
      </div>
    </form>
  );
}
