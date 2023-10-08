"use client";

import { useRef } from "react";

export default function MenuItem({ icon, title, action, isActive = null, disabled = null}) {
  const ref = useRef();

  return title === "Image" ? (
    <button
      className={`menu-item ${isActive && isActive() ? ' is-active' : ''}`}
      title={title}
      disabled={disabled}
      onClick={function() {
        ref.current.click();
      }}
    >
      <input  
        type="file" 
        ref={ref} 
        style={{ display: "none" }} 
        onChange={function(e) {
          const formData = new FormData();
          formData.append("file", e.target.files[0]);
          formData.append("caption", "Image upload using TipTap");
          formData.append("category", "TipTap");
          action(formData);
        }}
      />
      <i className={`ri-${icon}`} />
    </button>
  ) : (
    <button
      className={`menu-item ${isActive && isActive() ? ' is-active' : ''}`}
      onClick={action}
      title={title}
      disabled={disabled}
    >
      <i className={`ri-${icon}`} />
    </button>
  );
}