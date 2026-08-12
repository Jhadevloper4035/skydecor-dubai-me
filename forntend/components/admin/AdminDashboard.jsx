"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  clearAdminSession,
  createAdmin,
  deleteAdmin,
  getAdmins,
  getCurrentAdmin,
  getStoredAdminSession,
  saveAdminSession,
  updateAdmin,
} from "@/lib/adminAuth";

const blankAdminForm = {
  fullName: "",
  email: "",
  mobileNumber: "",
  password: "",
  role: "admin",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState(blankAdminForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const token = session?.token;
  const currentAdmin = session?.admin;
  const canManageAdmins = currentAdmin?.role === "superadmin";

  const visibleAdmins = useMemo(
    () => admins.filter((admin) => admin?._id !== currentAdmin?._id),
    [admins, currentAdmin?._id]
  );

  const logout = () => {
    clearAdminSession();
    router.replace("/admin/login");
  };

  const loadAdmins = useCallback(async (authToken = token) => {
    if (!authToken || !canManageAdmins) return;

    const data = await getAdmins(authToken);
    setAdmins(data.admins || []);
  }, [canManageAdmins, token]);

  useEffect(() => {
    const boot = async () => {
      const storedSession = getStoredAdminSession();

      if (!storedSession?.token) {
        router.replace("/admin/login");
        return;
      }

      try {
        const data = await getCurrentAdmin(storedSession.token);
        const nextSession = { token: storedSession.token, admin: data.admin };
        setSession(nextSession);
        saveAdminSession(nextSession);
      } catch {
        clearAdminSession();
        router.replace("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    boot();
  }, [router]);

  useEffect(() => {
    if (!token || !canManageAdmins) return;

    loadAdmins(token).catch((err) => setError(err.message || "Unable to load admins."));
  }, [token, canManageAdmins, loadAdmins]);

  const updateForm = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleCreateAdmin = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSaving(true);

    try {
      await createAdmin(token, form);
      setForm(blankAdminForm);
      setMessage("Admin created.");
      await loadAdmins(token);
    } catch (err) {
      setError(err.message || "Unable to create admin.");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleBlocked = async (admin) => {
    setError("");
    setMessage("");

    try {
      await updateAdmin(token, admin._id, { isBlocked: !admin.isBlocked });
      setMessage(admin.isBlocked ? "Admin unblocked." : "Admin blocked.");
      await loadAdmins(token);
    } catch (err) {
      setError(err.message || "Unable to update admin.");
    }
  };

  const removeAdmin = async (admin) => {
    setError("");
    setMessage("");

    try {
      await deleteAdmin(token, admin._id);
      setMessage("Admin deleted.");
      await loadAdmins(token);
    } catch (err) {
      setError(err.message || "Unable to delete admin.");
    }
  };

  if (isLoading) {
    return <main className="admin-dashboard-page">Loading dashboard...</main>;
  }

  return (
    <main className="admin-dashboard-page">
      <header className="admin-dashboard-header">
        <div>
          <p className="admin-eyebrow">Dashboard</p>
          <h1>Welcome, {currentAdmin?.fullName || "Admin"}</h1>
          <p>{currentAdmin?.email}</p>
        </div>
        <button className="admin-secondary-btn" type="button" onClick={logout}>
          Logout
        </button>
      </header>

      {message ? <p className="admin-success">{message}</p> : null}
      {error ? <p className="admin-error">{error}</p> : null}

      <section className="admin-section">
        <h2>Account</h2>
        <dl className="admin-profile-grid">
          <div>
            <dt>Role</dt>
            <dd>{currentAdmin?.role}</dd>
          </div>
          <div>
            <dt>Mobile</dt>
            <dd>{currentAdmin?.mobileNumber || "-"}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{currentAdmin?.isBlocked ? "Blocked" : "Active"}</dd>
          </div>
        </dl>
      </section>

      {canManageAdmins ? (
        <>
          <section className="admin-section">
            <h2>Create Admin</h2>
            <form className="admin-form admin-grid-form" onSubmit={handleCreateAdmin}>
              <label>
                Full name
                <input name="fullName" value={form.fullName} onChange={updateForm} required />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateForm}
                  required
                />
              </label>
              <label>
                Mobile number
                <input
                  name="mobileNumber"
                  value={form.mobileNumber}
                  onChange={updateForm}
                  required
                />
              </label>
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={updateForm}
                  minLength={8}
                  required
                />
              </label>
              <label>
                Role
                <select name="role" value={form.role} onChange={updateForm}>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </label>
              <button className="admin-primary-btn" type="submit" disabled={isSaving}>
                {isSaving ? "Creating..." : "Create"}
              </button>
            </form>
          </section>

          <section className="admin-section">
            <h2>Admins</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleAdmins.map((admin) => (
                    <tr key={admin._id}>
                      <td>{admin.fullName}</td>
                      <td>{admin.email}</td>
                      <td>{admin.mobileNumber || "-"}</td>
                      <td>{admin.role}</td>
                      <td>{admin.isBlocked ? "Blocked" : "Active"}</td>
                      <td>
                        <div className="admin-actions">
                          <button type="button" onClick={() => toggleBlocked(admin)}>
                            {admin.isBlocked ? "Unblock" : "Block"}
                          </button>
                          <button type="button" onClick={() => removeAdmin(admin)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!visibleAdmins.length ? (
                    <tr>
                      <td colSpan={6}>No other admins found.</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}
