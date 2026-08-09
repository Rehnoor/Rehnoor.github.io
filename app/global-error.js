"use client";

export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          textAlign: "center",
          padding: "2rem",
          fontFamily: "system-ui, sans-serif",
          background: "#0b0e17",
          color: "#ededed",
        }}
      >
        <p style={{ fontFamily: "monospace", color: "#5A9FFF" }}>500</p>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700 }}>
          The whole page gave up.
        </h1>
        <p style={{ color: "rgba(237,237,237,0.7)", maxWidth: "24rem" }}>
          Something broke badly enough to take the layout down with it.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            borderRadius: "9999px",
            background: "#5A9FFF",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
