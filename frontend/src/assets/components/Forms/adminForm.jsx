import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import "../styles/adminForm.css";

export default function AdminForm() {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!login.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!login.password.trim()) {
      newErrors.password = "Password is required";
    } else if (login.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onLogin = async (evt) => {
    evt.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoggingIn(true);
    console.log("Log In Attempt: ", login);

    try {
      const response = await fetch("/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: login.username,
          password: login.password,
        }),
      });

      if (response.redirected) {
        localStorage.setItem("adminLoggedIn", "true");
        window.location.href = response.url;
      } else {
        const data = await response.json();
        console.log("Login response:", data);
        alert(
          "Login failed: " + (data.message || "Invalid username or password")
        );
      }
    } catch (error) {
      console.error("Error in sending POST with user info:", error);
      alert("Network error during login. Please check your connection.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const onRegister = async (evt) => {
    evt.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsRegistering(true);
    console.log("Register Attempt: ", login);

    try {
      const response = await fetch("/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: login.username,
          password: login.password,
        }),
      });

      const data = await response.json();
      console.log("Register response:", response.status, data);

      if (response.ok) {
        alert("Registration successful! Please log in.");
        setLogin({ username: "", password: "" });
        setErrors({});
      } else {
        alert(
          "Registration failed: " +
            (data.message || "Username may already exist")
        );
      }
    } catch (error) {
      console.error("Error in sending POST with user info:", error);
      alert("Network error during registration. Please check your connection.");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Container className="filmFormContainer">
      <h1>Admin Login</h1>
      <Form onSubmit={onLogin} noValidate>
        <Form.Group className="mb-3" controlId="formBasicUser">
          <Form.Label className="text-white">
            Username <span aria-label="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={login.username}
            onChange={(e) => {
              setLogin({ ...login, username: e.target.value });
              if (errors.username) {
                setErrors({ ...errors, username: "" });
              }
            }}
            required
            aria-required="true"
            aria-invalid={errors.username ? "true" : "false"}
            aria-describedby={errors.username ? "username-error" : undefined}
            autoComplete="username"
          />
          {errors.username && (
            <Form.Text id="username-error" className="text-danger" role="alert">
              {errors.username}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="text-white">
            Password <span aria-label="required">*</span>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={login.password}
            onChange={(e) => {
              setLogin({ ...login, password: e.target.value });
              if (errors.password) {
                setErrors({ ...errors, password: "" });
              }
            }}
            required
            aria-required="true"
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
            autoComplete="current-password"
          />
          {errors.password && (
            <Form.Text id="password-error" className="text-danger" role="alert">
              {errors.password}
            </Form.Text>
          )}
        </Form.Group>

        <div className="d-flex gap-2">
          <Button
            className="submitButton"
            type="button"
            onClick={onRegister}
            disabled={isRegistering || isLoggingIn}
            variant="secondary"
          >
            {isRegistering ? "Registering..." : "Register"}
          </Button>
          <Button
            className="submitButton"
            type="submit"
            disabled={isLoggingIn || isRegistering}
            variant="primary"
          >
            {isLoggingIn ? "Logging In..." : "Log In"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
