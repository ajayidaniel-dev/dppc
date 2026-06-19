import { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import {
  Button,
  FormInput,
  FormTextarea,
  Modal,
  Select,
} from "../../components/elements";
import {
  engagementQuadrant,
  STAKEHOLDER_CATEGORIES,
  type Level,
  type Stakeholder,
  type StakeholderCategory,
  type StakeholderType,
} from "./stakeholdersData";

interface StakeholderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (stakeholder: Stakeholder) => void;
}

const typeOptions: { label: string; value: StakeholderType }[] = [
  { label: "Internal", value: "Internal" },
  { label: "External", value: "External" },
];

const categoryOptions: { label: string; value: StakeholderCategory }[] =
  STAKEHOLDER_CATEGORIES.map((c) => ({ label: c, value: c }));

const levelOptions: { label: string; value: Level }[] = [
  { label: "High", value: "High" },
  { label: "Low", value: "Low" },
];

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}

function StakeholderFormModal({
  isOpen,
  onClose,
  onCreate,
}: StakeholderFormModalProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [organization, setOrganization] = useState("");
  const [type, setType] = useState(typeOptions[0]);
  const [category, setCategory] = useState(categoryOptions[0]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [influence, setInfluence] = useState(levelOptions[0]);
  const [interest, setInterest] = useState(levelOptions[0]);
  const [developmentsText, setDevelopmentsText] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reset = () => {
    setName("");
    setRole("");
    setOrganization("");
    setType(typeOptions[0]);
    setCategory(categoryOptions[0]);
    setEmail("");
    setPhone("");
    setLocation("");
    setInfluence(levelOptions[0]);
    setInterest(levelOptions[0]);
    setDevelopmentsText("");
    setResponsibilities("");
    setErrors({});
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleCreate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Name is required.";
    if (!role.trim()) next.role = "Role is required.";
    if (!email.trim()) next.email = "Email is required.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const developments = developmentsText
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    const stakeholder: Stakeholder = {
      id: `STK-${Date.now()}`,
      name: name.trim(),
      role: role.trim(),
      organization: organization.trim() || "—",
      type: type.value,
      category: category.value,
      email: email.trim(),
      phone: phone.trim() || "—",
      location: location.trim() || undefined,
      responsibilities: responsibilities.trim() || "—",
      developments: developments.length > 0 ? developments : ["Portfolio-wide"],
      projectIds: [],
      influence: influence.value,
      interest: interest.value,
    };

    onCreate(stakeholder);
    toast.success(
      `${stakeholder.name} added — ${engagementQuadrant(
        stakeholder.influence,
        stakeholder.interest,
      )}`,
    );
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add stakeholder"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={handleCreate}>
            Add stakeholder
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormInput
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          placeholder="e.g. Amara Bello"
        />
        <FormInput
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          error={errors.role}
          placeholder="e.g. Investor Relations Director"
        />
        <FormInput
          label="Organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          placeholder="e.g. Meridian Property Fund"
        />
        <Field label="Category">
          <Select
            options={categoryOptions}
            value={category}
            onChange={(opt) => opt && setCategory(opt)}
            isSearchable={false}
          />
        </Field>
        <Field label="Type">
          <Select
            options={typeOptions}
            value={type}
            onChange={(opt) => opt && setType(opt)}
            isSearchable={false}
          />
        </Field>
        <FormInput
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. GRA Phase 2, Port Harcourt"
        />
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="name@org.com.ng"
        />
        <FormInput
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+234 800 000 0000"
        />
        <Field label="Influence">
          <Select
            options={levelOptions}
            value={influence}
            onChange={(opt) => opt && setInfluence(opt)}
            isSearchable={false}
          />
        </Field>
        <Field label="Interest">
          <Select
            options={levelOptions}
            value={interest}
            onChange={(opt) => opt && setInterest(opt)}
            isSearchable={false}
          />
        </Field>
        <div className="sm:col-span-2">
          <FormInput
            label="Related developments"
            value={developmentsText}
            onChange={(e) => setDevelopmentsText(e.target.value)}
            placeholder="Comma-separated, e.g. Emerald Gardens Estate, Royal Crest Apartments"
          />
        </div>
        <div className="sm:col-span-2">
          <FormTextarea
            label="Responsibilities"
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            placeholder="What is this stakeholder accountable for on the development portfolio?"
          />
        </div>
        <p className="text-xs text-muted-foreground sm:col-span-2">
          Engagement strategy:{" "}
          <span className="font-medium text-foreground">
            {engagementQuadrant(influence.value, interest.value)}
          </span>
        </p>
      </div>
    </Modal>
  );
}

export default StakeholderFormModal;
