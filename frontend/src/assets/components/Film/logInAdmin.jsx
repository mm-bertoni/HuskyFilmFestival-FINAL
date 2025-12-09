import Container from "react-bootstrap/esm/Container";
import AdminForm from "../Forms/adminForm";

export default function LoginAdmin() {
  return (
    <main>
      <Container>
        <header>
          <h1>Husky Film Festival Admin Portal</h1>
        </header>
      </Container>
      <Container>
        <AdminForm />
      </Container>
    </main>
  );
}
