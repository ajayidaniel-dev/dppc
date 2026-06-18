import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { useAuth } from "../utils/useAuth";
import LoginPage from "../screens/auth/LoginPage";
import OverviewPage from "../screens/dashboard/OverviewPage";
import PortfolioPage from "../screens/portfolio/PortfolioPage";
import ProjectsPage from "../screens/projects/ProjectsPage";
import MilestonesPage from "../screens/milestones/MilestonesPage";
import PerformancePage from "../screens/performance/PerformancePage";
import RisksPage from "../screens/risks/RisksPage";
import ReportsPage from "../screens/reports/ReportsPage";
import KnowledgePage from "../screens/knowledge/KnowledgePage";
import MediaPage from "../screens/media/MediaPage";
import HighlightsPage from "../screens/highlights/HighlightsPage";
import StakeholdersPage from "../screens/stakeholders/StakeholdersPage";
import CompanyProfilePage from "../screens/company/CompanyProfilePage";
import SettingsPage from "../screens/settings/SettingsPage";
import DashboardLayout from "../layouts/DashboardLayout";
import NotFoundPage from "../screens/NotFoundPage";
import ProjectDetailsPage from "../screens/projects/ProjectDetailsPage";

function PageRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path={routes.LOGIN}
        element={
          isAuthenticated ? (
            <Navigate to={routes.DASHBOARD} replace />
          ) : (
            <LoginPage />
          )
        }
      />

      {isAuthenticated ? (
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="overview" element={<OverviewPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="milestones" element={<MilestonesPage />} />
          <Route path="performance" element={<PerformancePage />} />
          <Route path="risks" element={<RisksPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="knowledge" element={<KnowledgePage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="highlights" element={<HighlightsPage />} />
          <Route path="stakeholders" element={<StakeholdersPage />} />
          <Route path="company" element={<CompanyProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      ) : (
        <Route
          path="/dashboard/*"
          element={<Navigate to={routes.LOGIN} replace />}
        />
      )}

      <Route path={routes.NOT_FOUND} element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to={routes.NOT_FOUND} replace />} />
    </Routes>
  );
}

export default PageRouter;
