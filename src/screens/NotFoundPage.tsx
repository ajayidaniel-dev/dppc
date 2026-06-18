import { useNavigate } from "react-router-dom";
import { Button } from "../components/elements";
import { routes } from "../router/routes";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-4 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="text-xl font-semibold text-foreground">Page not found</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Button onClick={() => navigate(routes.DASHBOARD)}>
        Back to Dashboard
      </Button>
    </div>
  );
}

export default NotFoundPage;
