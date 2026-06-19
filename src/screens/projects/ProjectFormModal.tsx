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
import { PROJECT_PHASES, projectImage, VERIFIED_PHOTOS, DEVELOPMENT_TYPES, type Project } from "./projectsData";
import type { Status } from "../../utils/types";

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (project: Project) => void;
  nextId: number;
}

const businessUnitOptions = DEVELOPMENT_TYPES.map((u) => ({ label: u, value: u }));

const phaseOptions = PROJECT_PHASES.map((p) => ({ label: p, value: p }));

const statusOptions: { label: string; value: Status }[] = [
  { label: "On Track", value: "green" },
  { label: "Attention", value: "amber" },
  { label: "Critical", value: "red" },
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

function ProjectFormModal({
  isOpen,
  onClose,
  onCreate,
  nextId,
}: ProjectFormModalProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [businessUnit, setBusinessUnit] = useState(businessUnitOptions[0]);
  const [phase, setPhase] = useState(phaseOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [manager, setManager] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [objective, setObjective] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reset = () => {
    setName("");
    setCode("");
    setBusinessUnit(businessUnitOptions[0]);
    setPhase(phaseOptions[0]);
    setStatus(statusOptions[0]);
    setManager("");
    setSponsor("");
    setClient("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setBudget("");
    setObjective("");
    setDescription("");
    setErrors({});
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleCreate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Project name is required.";
    if (!manager.trim()) next.manager = "Project manager is required.";
    if (!budget || Number(budget) <= 0) next.budget = "Enter a valid budget.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const project: Project = {
      id: nextId,
      code: code.trim() || `DEV-${String(nextId).padStart(3, "0")}`,
      name: name.trim(),
      description: description.trim() || "—",
      manager: manager.trim(),
      sponsor: sponsor.trim() || "—",
      client: client.trim() || "—",
      location: location.trim() || "—",
      businessUnit: businessUnit.value,
      phase: phase.value,
      startDate: startDate || new Date().toISOString().slice(0, 10),
      endDate: endDate || "",
      budget: Number(budget),
      spent: 0,
      progress: 0,
      spi: 1,
      cpi: 1,
      resourceUtil: 0,
      status: status.value,
      strategicObjective: objective.trim() || "—",
      businessDriver: "—",
      expectedBenefits: "—",
      coverImage: projectImage(VERIFIED_PHOTOS.constructionSite),
      media: [],
      milestones: [],
      risks: [],
      team: manager.trim()
        ? [{ name: manager.trim(), role: "Project Manager" }]
        : [],
    };

    onCreate(project);
    toast.success(`Project “${project.name}” created`);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="New development"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={handleCreate}>
            Create project
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FormInput
            label="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            placeholder="e.g. Regional Data Center"
          />
        </div>
        <FormInput
          label="Project code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`DEV-${String(nextId).padStart(3, "0")}`}
        />
        <Field label="Development type">
          <Select
            options={businessUnitOptions}
            value={businessUnit}
            onChange={(opt) => opt && setBusinessUnit(opt)}
            isSearchable={false}
          />
        </Field>
        <Field label="Phase">
          <Select
            options={phaseOptions}
            value={phase}
            onChange={(opt) => opt && setPhase(opt)}
            isSearchable={false}
          />
        </Field>
        <Field label="Status">
          <Select
            options={statusOptions}
            value={status}
            onChange={(opt) => opt && setStatus(opt)}
            isSearchable={false}
          />
        </Field>
        <FormInput
          label="Project manager"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          error={errors.manager}
          placeholder="e.g. Amara Bello"
        />
        <FormInput
          label="Sponsor"
          value={sponsor}
          onChange={(e) => setSponsor(e.target.value)}
        />
        <FormInput
          label="Client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
        <FormInput
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <FormInput
          label="Budget (USD)"
          type="number"
          min={0}
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          error={errors.budget}
          placeholder="2400000"
        />
        <FormInput
          label="Start date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <FormInput
          label="End date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <div className="sm:col-span-2">
          <FormInput
            label="Strategic objective"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            placeholder="What strategic goal does this advance?"
          />
        </div>
        <div className="sm:col-span-2">
          <FormTextarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief summary of scope and intent."
          />
        </div>
      </div>
    </Modal>
  );
}

export default ProjectFormModal;
