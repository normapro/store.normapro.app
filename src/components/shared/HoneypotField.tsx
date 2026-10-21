"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

// Campo trampa para bots: invisible para personas y lectores de pantalla.
// Si llega relleno, la API descarta el lead sin avisar.
const HoneypotField = ({ value, onChange }: Props) => (
  <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
    <label>
      No rellenes este campo
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  </div>
);

export default HoneypotField;
