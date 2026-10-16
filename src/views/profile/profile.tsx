import { Link } from "react-router";
import { useAuth } from "../../contexts/authContext";
import { BsBoxSeam } from "react-icons/bs";
import ProfileIcon from "../../components/navbar/profileIcon";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <section className="container px-4 py-10 mx-auto">
      <h1 className="text-3xl font-heading text-primary mb-8 text-center">
        Il mio profilo
      </h1>

      <div className="card bg-base-200 shadow-sm border border-base-300 max-w-2xl mx-auto">
        <div className="card-body gap-6">
          <div className="flex items-center gap-4">
            <ProfileIcon name={user?.name} size="lg" />

            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-sm text-base-content/60">{user?.email}</p>
            </div>
          </div>

          <div className="divider my-0" />

          <div>
            <h3 className="font-semibold mb-3">I tuoi dati</h3>

            <ul className="flex flex-col gap-3">
              <li className="flex flex-col gap-1">
                <span className="text-sm text-base-content/60">
                  Nome completo
                </span>
                <span>{user?.name}</span>
              </li>

              <li className="flex flex-col gap-1">
                <span className="text-sm text-base-content/60">Email</span>
                <span>{user?.email}</span>
              </li>
            </ul>
          </div>

          <div className="divider my-0" />

          <Link
            to="/profile/orders"
            className="btn btn-outline btn-primary justify-between"
          >
            <span className="flex items-center gap-2">
              <BsBoxSeam className="text-lg" />I tuoi ordini
            </span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
