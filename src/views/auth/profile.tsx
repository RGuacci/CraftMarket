import { useUser } from "../../hooks/queries/useUser";

export default function Profile() {
  const { data: user } = useUser();

  return (
    <section>
      <h1>Profilo</h1>
      {user && <p>Ciao {user.name}</p>}
    </section>);
}
