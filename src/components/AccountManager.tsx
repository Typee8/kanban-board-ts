import Menu from "./Menu";

export default function AccountManager() {
  return (
    <main>
      <Menu />
      <div>
        <h2>Your profile</h2>
        <ul>
          <li>
            Your email: Random@gmail.com<button>Change email</button>
          </li>
          <li>
            <button>Change password</button>
          </li>
          <li>
            <button>delete the account</button>
          </li>
        </ul>
      </div>
    </main>
  );
}
