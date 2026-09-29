import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Authapp.css";

/**
 * AuthApp Wrapper with page header and navigation
 */
function AuthPage() {
  const handleLogin = (userData) => {
    console.log('User logged in:', userData);
    // Handle login logic here
    alert('Login successful! (This is a demo)');
  };

  const handleCreateAccount = (userData) => {
    console.log('User account created:', userData);
    // Handle account creation logic here
    alert('Account created successfully! (This is a demo)');
  };

  return (
    <div className="auth-page-wrapper">
      {/* Page Header */}
      <div className="auth-header">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / Login
        </div>
      </div>
      
      <AuthApp onLogin={handleLogin} onCreateAccount={handleCreateAccount} />
    </div>
  );
}

/**
 * AuthApp
 * A self-contained login / create-account system matching the reference
 * design: serif headings, colored field labels, thin-bordered inputs,
 * and a dark rectangular button.
 */
function AuthApp({ onLogin, onCreateAccount }) {
  const [view, setView] = useState("login"); // "login" | "create"

  return (
    <div className="auth-page">
      {view === "login" ? (
        <LoginForm
          onSwitch={() => setView("create")}
          onSubmit={onLogin}
        />
      ) : (
        <CreateAccountForm
          onSwitch={() => setView("login")}
          onSubmit={onCreateAccount}
        />
      )}
    </div>
  );
}

function CreateAccountForm({ onSwitch, onSubmit }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <h1 className="auth-title">Create Account</h1>

      <label className="auth-label label-blue" htmlFor="firstName">
        First Name
      </label>
      <input
        id="firstName"
        className="auth-input"
        type="text"
        value={form.firstName}
        onChange={handleChange("firstName")}
        required
      />

      <label className="auth-label label-blue" htmlFor="lastName">
        Last Name
      </label>
      <input
        id="lastName"
        className="auth-input"
        type="text"
        value={form.lastName}
        onChange={handleChange("lastName")}
        required
      />

      <label className="auth-label label-orange" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        className="auth-input"
        type="email"
        value={form.email}
        onChange={handleChange("email")}
        required
      />

      <label className="auth-label label-orange" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        className="auth-input"
        type="password"
        value={form.password}
        onChange={handleChange("password")}
        required
      />

      <button type="submit" className="auth-button">
        CREATE
      </button>

      <p className="auth-link-row">
        <button type="button" className="auth-link" onClick={onSwitch}>
          Already have an account? Sign in
        </button>
      </p>
      
      <p className="auth-link-row">
        <Link to="/" className="auth-link">
          ← Back to Home
        </Link>
      </p>
    </form>
  );
}

function LoginForm({ onSwitch, onSubmit }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <h1 className="auth-title">Login</h1>

      <label className="auth-label label-orange" htmlFor="loginEmail">
        Email
      </label>
      <input
        id="loginEmail"
        className="auth-input"
        type="email"
        value={form.email}
        onChange={handleChange("email")}
        required
      />

      <label className="auth-label label-orange" htmlFor="loginPassword">
        Password
      </label>
      <input
        id="loginPassword"
        className="auth-input"
        type="password"
        value={form.password}
        onChange={handleChange("password")}
        required
      />

      <p className="auth-forgot">
        <button type="button" className="auth-link">
          Forgot your password?
        </button>
      </p>

      <button type="submit" className="auth-button">
        SIGN IN
      </button>

      <p className="auth-link-row">
        <button type="button" className="auth-link" onClick={onSwitch}>
          Create account
        </button>
      </p>
      
      <p className="auth-link-row">
        <Link to="/" className="auth-link">
          ← Back to Home
        </Link>
      </p>
    </form>
  );
}

export default AuthPage;