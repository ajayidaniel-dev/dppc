import { useMemo, useState } from "react";
import {
  Check,
  Moon,
  Pencil,
  Plus,
  Search,
  Sun,
  Trash2,
  UserPlus,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  Avatar,
  Badge,
  Button,
  Card,
  FormInput,
  Modal,
  PageHeader,
  Select,
  Tabs,
  Toggle,
  type TabItem,
} from "../../components/elements";
import { useAuth } from "../../utils/useAuth";
import { useTheme } from "../../utils/useTheme";
import { cn, formatDate } from "../../utils/helpers";
import { routes } from "../../router/routes";
import {
  capabilities,
  defaultRoleCaps,
  roleName,
  roleVariant,
  roles,
  seedMembers,
  statusVariant,
  type CapabilityId,
  type Member,
  type MemberStatus,
  type RoleId,
} from "./settingsData";

const tabs: TabItem[] = [
  { id: "profile", label: "Profile" },
  { id: "team", label: "Team Members" },
  { id: "roles", label: "Roles & Permissions" },
  { id: "preferences", label: "Preferences" },
  { id: "notifications", label: "Notifications" },
];

const roleOptions = roles.map((r) => ({ label: r.name, value: r.id }));
const roleFilterOptions = [
  { label: "All roles", value: "all" as const },
  ...roleOptions,
];
const statusOptions: { label: MemberStatus; value: MemberStatus }[] = [
  { label: "Active", value: "Active" },
  { label: "Invited", value: "Invited" },
  { label: "Suspended", value: "Suspended" },
];

const landingOptions = [
  { label: "Executive Overview", value: routes.DASHBOARD },
  { label: "Portfolio", value: routes.PORTFOLIO },
  { label: "Projects", value: routes.PROJECTS },
  { label: "Risks & Issues", value: routes.RISKS },
  { label: "Reports", value: routes.REPORTS },
];
const densityOptions = [
  { label: "Comfortable", value: "comfortable" },
  { label: "Compact", value: "compact" },
];

function SettingRow({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function SettingsPage() {
  const { user } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile
  const [profileName, setProfileName] = useState(user?.name ?? "");
  const [profileEmail, setProfileEmail] = useState(user?.email ?? "");
  const [profileTitle, setProfileTitle] = useState("Executive Sponsor");

  // Team
  const [members, setMembers] = useState<Member[]>(seedMembers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState(roleFilterOptions[0]);
  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState(roleOptions[3]);
  const [editing, setEditing] = useState<Member | null>(null);
  const [editRole, setEditRole] = useState(roleOptions[0]);
  const [editStatus, setEditStatus] = useState(statusOptions[0]);

  // Roles & permissions
  const [roleCaps, setRoleCaps] = useState<Record<RoleId, CapabilityId[]>>(
    () => structuredClone(defaultRoleCaps),
  );

  // Preferences
  const [landing, setLanding] = useState(landingOptions[0]);
  const [density, setDensity] = useState(densityOptions[0]);

  // Notifications
  const [notifications, setNotifications] = useState({
    riskEscalations: true,
    reportReady: true,
    weeklyDigest: false,
    mentions: true,
    productUpdates: false,
  });

  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return members.filter((m) => {
      const matchesQuery =
        !q || [m.name, m.email].join(" ").toLowerCase().includes(q);
      const matchesRole =
        roleFilter.value === "all" || m.role === roleFilter.value;
      return matchesQuery && matchesRole;
    });
  }, [members, search, roleFilter]);

  const handleAdd = () => {
    if (!newName.trim() || !newEmail.trim()) {
      toast.error("Name and email are required.");
      return;
    }
    setMembers((prev) => [
      {
        id: `u${Date.now()}`,
        name: newName.trim(),
        email: newEmail.trim(),
        role: newRole.value as RoleId,
        status: "Invited",
        lastActive: "—",
      },
      ...prev,
    ]);
    toast.success(`Invitation sent to ${newName.trim()}`);
    setNewName("");
    setNewEmail("");
    setNewRole(roleOptions[3]);
    setAddOpen(false);
  };

  const openEdit = (member: Member) => {
    setEditing(member);
    setEditRole(roleOptions.find((o) => o.value === member.role) ?? roleOptions[0]);
    setEditStatus(
      statusOptions.find((o) => o.value === member.status) ?? statusOptions[0],
    );
  };

  const handleSaveEdit = () => {
    if (!editing) return;
    setMembers((prev) =>
      prev.map((m) =>
        m.id === editing.id
          ? { ...m, role: editRole.value as RoleId, status: editStatus.value }
          : m,
      ),
    );
    toast.success(`Updated ${editing.name}`);
    setEditing(null);
  };

  const handleRemove = (member: Member) => {
    setMembers((prev) => prev.filter((m) => m.id !== member.id));
    toast.success(`Removed ${member.name}`);
  };

  const toggleCap = (role: RoleId, cap: CapabilityId) => {
    setRoleCaps((prev) => {
      const has = prev[role].includes(cap);
      return {
        ...prev,
        [role]: has
          ? prev[role].filter((c) => c !== cap)
          : [...prev[role], cap],
      };
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Settings"
        subtitle="Manage your profile, team access, and platform preferences."
      />

      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />

      {activeTab === "profile" && (
        <Card title="Account">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Avatar name={profileName || "User"} size="lg" />
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success("Upload photo (demo)")}
                >
                  Change photo
                </Button>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  PNG or JPG, up to 2MB.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormInput
                label="Full name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
              <FormInput
                label="Email"
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
              />
              <FormInput
                label="Job title"
                value={profileTitle}
                onChange={(e) => setProfileTitle(e.target.value)}
              />
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground">
                  Role
                </span>
                <div className="flex h-10 items-center">
                  <Badge variant="info">{user?.role ?? "Executive"}</Badge>
                  <span className="ml-2 text-xs text-muted-foreground">
                    Set by an administrator
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end border-t border-border pt-4">
              <Button onClick={() => toast.success("Profile saved")}>
                Save changes
              </Button>
            </div>
          </div>
        </Card>
      )}

      {activeTab === "team" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30 sm:max-w-xs">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search people…"
                aria-label="Search team members"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-44">
                <Select
                  options={roleFilterOptions}
                  value={roleFilter}
                  onChange={(opt) => opt && setRoleFilter(opt)}
                  isSearchable={false}
                  aria-label="Filter by role"
                />
              </div>
              <Button
                leftIcon={<UserPlus className="h-4 w-4" />}
                onClick={() => setAddOpen(true)}
              >
                Add person
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
            <ul className="divide-y divide-border">
              {filteredMembers.length === 0 ? (
                <li className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No people match your filters.
                </li>
              ) : (
                filteredMembers.map((m) => (
                  <li
                    key={m.id}
                    className="flex flex-wrap items-center gap-4 px-4 py-3.5"
                  >
                    <Avatar name={m.name} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {m.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {m.email}
                      </p>
                    </div>
                    <Badge
                      variant={roleVariant[m.role]}
                      className="shrink-0"
                    >
                      {roleName(m.role)}
                    </Badge>
                    <Badge variant={statusVariant[m.status]} className="shrink-0">
                      {m.status}
                    </Badge>
                    <span className="hidden w-28 text-right text-xs text-muted-foreground sm:block">
                      {m.lastActive === "—"
                        ? "Pending"
                        : `Active ${formatDate(m.lastActive)}`}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        onClick={() => openEdit(m)}
                        aria-label={`Manage ${m.name}`}
                        title="Manage access"
                        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleRemove(m)}
                        aria-label={`Remove ${m.name}`}
                        title="Remove"
                        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-surface-muted hover:text-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}

      {activeTab === "roles" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <Card key={role.id}>
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={roleVariant[role.id]}>{role.name}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {members.filter((m) => m.role === role.id).length} members
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {role.description}
                </p>
              </Card>
            ))}
          </div>

          <Card
            title="Permission Matrix"
            action={
              <Button
                size="sm"
                onClick={() => toast.success("Permissions updated")}
              >
                Save changes
              </Button>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                      Role
                    </th>
                    {capabilities.map((cap) => (
                      <th
                        key={cap.id}
                        className="px-3 py-2 text-center font-medium text-muted-foreground"
                      >
                        {cap.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role) => (
                    <tr key={role.id} className="border-t border-border">
                      <td className="whitespace-nowrap px-3 py-2.5 font-medium text-foreground">
                        {role.name}
                      </td>
                      {capabilities.map((cap) => {
                        const checked = roleCaps[role.id].includes(cap.id);
                        return (
                          <td key={cap.id} className="px-3 py-2.5 text-center">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleCap(role.id, cap.id)}
                              aria-label={`${role.name}: ${cap.name}`}
                              className="h-4 w-4 cursor-pointer rounded border-border"
                              style={{ accentColor: "var(--color-primary)" }}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Changes apply to every member assigned to a role.
            </p>
          </Card>
        </div>
      )}

      {activeTab === "preferences" && (
        <Card title="Preferences">
          <div className="divide-y divide-border">
            <SettingRow
              title="Theme"
              description="Choose how the dashboard looks on this device."
            >
              <div className="flex items-center gap-1 rounded-lg border border-border p-1">
                {[
                  { id: "light" as const, label: "Light", icon: Sun },
                  { id: "dark" as const, label: "Dark", icon: Moon },
                ].map((opt) => {
                  const active = resolvedTheme === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setTheme(opt.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                        active
                          ? "bg-primary-soft text-primary"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                      aria-pressed={active}
                    >
                      <opt.icon className="h-4 w-4" />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </SettingRow>
            <SettingRow
              title="Default landing page"
              description="Where you land after signing in."
            >
              <div className="w-56">
                <Select
                  options={landingOptions}
                  value={landing}
                  onChange={(opt) => opt && setLanding(opt)}
                  isSearchable={false}
                  aria-label="Default landing page"
                />
              </div>
            </SettingRow>
            <SettingRow
              title="Display density"
              description="Adjust spacing across tables and lists."
            >
              <div className="w-56">
                <Select
                  options={densityOptions}
                  value={density}
                  onChange={(opt) => opt && setDensity(opt)}
                  isSearchable={false}
                  aria-label="Display density"
                />
              </div>
            </SettingRow>
          </div>
        </Card>
      )}

      {activeTab === "notifications" && (
        <Card title="Notifications">
          <div className="divide-y divide-border">
            {(
              [
                { key: "riskEscalations", title: "Risk escalations", description: "When a risk is escalated to leadership." },
                { key: "reportReady", title: "Report ready", description: "When a scheduled report finishes generating." },
                { key: "weeklyDigest", title: "Weekly digest", description: "A Monday summary of portfolio health." },
                { key: "mentions", title: "Mentions & assignments", description: "When you're mentioned or assigned an item." },
                { key: "productUpdates", title: "Product updates", description: "Occasional news about new features." },
              ] as const
            ).map((row) => (
              <SettingRow
                key={row.key}
                title={row.title}
                description={row.description}
              >
                <Toggle
                  checked={notifications[row.key]}
                  onChange={(v) =>
                    setNotifications((prev) => ({ ...prev, [row.key]: v }))
                  }
                  label={row.title}
                />
              </SettingRow>
            ))}
          </div>
        </Card>
      )}

      <Modal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add person"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={handleAdd}
            >
              Send invitation
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Invite a teammate and assign their role. They'll receive an email to
            set up access.
          </p>
          <FormInput
            label="Full name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. Jordan Pike"
          />
          <FormInput
            label="Email"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="name@company.com"
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Role</label>
            <Select
              options={roleOptions}
              value={newRole}
              onChange={(opt) => opt && setNewRole(opt)}
              isSearchable={false}
              aria-label="Assign role"
            />
            <p className="text-xs text-muted-foreground">
              {roles.find((r) => r.id === newRole.value)?.description}
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={!!editing}
        onClose={() => setEditing(null)}
        title={editing ? `Manage ${editing.name}` : undefined}
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button leftIcon={<Check className="h-4 w-4" />} onClick={handleSaveEdit}>
              Save
            </Button>
          </>
        }
      >
        {editing && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Avatar name={editing.name} size="md" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {editing.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {editing.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Role</label>
              <Select
                options={roleOptions}
                value={editRole}
                onChange={(opt) => opt && setEditRole(opt)}
                isSearchable={false}
                aria-label="Role"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Status
              </label>
              <Select
                options={statusOptions}
                value={editStatus}
                onChange={(opt) => opt && setEditStatus(opt)}
                isSearchable={false}
                aria-label="Status"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default SettingsPage;
