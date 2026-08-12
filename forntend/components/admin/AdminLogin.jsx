"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/adminAuth";

export default function AdminLogin() {
  const router = useRouter();
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateValue = (event) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await loginAdmin(values);
      router.replace("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Unable to login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-panel" aria-labelledby="admin-login-title">
        <div>
          <p className="admin-eyebrow">Curve and Comfort Dashboard</p>
          <h1 id="admin-login-title">Admin Login</h1>
        </div>

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={updateValue}
              required
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              value={values.password}
              onChange={updateValue}
              required
            />
          </label>

          {error ? <p className="admin-error">{error}</p> : null}

          <button className="admin-primary-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}
