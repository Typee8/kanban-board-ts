import { NavLink } from "react-router";

export default function LoginScreen() {
  return (
    <main>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
        }}
      >
        <label htmlFor="username">Username:</label>
        <input id="username" />
        <label htmlFor="password">Password:</label>
        <input id="password" />
        <input type="submit" value="Login" />
        <button>
          <NavLink to="/">Register</NavLink>
        </button>
      </form>
    </main>
  );
}
