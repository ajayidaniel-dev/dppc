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
import { projects } from "../projects/projectsData";
import {
  severityLabel,
  severityZone,
  type Level,
  type Risk,
  type RiskCategory,
  type RiskState,
} from "./risksData";

interface RiskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (risk: Risk) => void;
  nextId: number;
}

const projectOptions = projects.map((p) => ({ label: p.name, value: p.name }));
const categoryOptions = (
  ["Schedule", "Budget", "Technical", "Resource", "Compliance", "External"] as RiskCategory[]
).map((c) => ({ label: c, value: c }));
const levelOptions = (["Low", "Medium", "High"] as Level[]).map((l) => ({
  label: l,
  value: l,
}));
const stateOptions = (
  ["Open", "Mitigating", "Mitigated", "Closed"] as RiskState[]
).map((s) => ({ label: s, value: s }));

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

function RiskFormModal({ isOpen, onClose, onCreate, nextId }: RiskFormModalProps) {
  const [title, setTitle] = useState("");
  const [project, setProject] = useState(projectOptions[0]);
  const [category, setCategory] = useState(categoryOptions[0]);
  const [probability, setProbability] = useState(levelOptions[1]);
  const [impact, setImpact] = useState(levelOptions[1]);
  const [owner, setOwner] = useState("");
  const [state, setState] = useState(stateOptions[0]);
  const [mitigation, setMitigation] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const previewZone = severityZone(probability.value, impact.value);

  const reset = () => {
    setTitle("");
    setProject(projectOptions[0]);
    setCategory(categoryOptions[0]);
    setProbability(levelOptions[1]);
    setImpact(levelOptions[1]);
    setOwner("");
    setState(stateOptions[0]);
    setMitigation("");
    setErrors({});
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleCreate = () => {
    const next: Record<string, string> = {};
    if (!title.trim()) next.title = "Risk title is required.";
    if (!owner.trim()) next.owner = "Owner is required.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const risk: Risk = {
      id: `RSK-${String(nextId).padStart(3, "0")}`,
      title: title.trim(),
      project: project.value,
      category: category.value,
      probability: probability.value,
      impact: impact.value,
      owner: owner.trim(),
      mitigation: mitigation.trim() || "—",
      state: state.value,
      opened: new Date().toISOString().slice(0, 10),
    };

    onCreate(risk);
    toast.success(`Risk ${risk.id} logged`);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Log a risk"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={handleCreate}>
            Add risk
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FormInput
            label="Risk title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
            placeholder="e.g. Vendor capacity shortfall"
          />
        </div>
        <Field label="Project">
          <Select
            options={projectOptions}
            value={project}
            onChange={(opt) => opt && setProject(opt)}
          />
        </Field>
        <Field label="Category">
          <Select
            options={categoryOptions}
            value={category}
            onChange={(opt) => opt && setCategory(opt)}
            isSearchable={false}
          />
        </Field>
        <Field label="Probability">
          <Select
            options={levelOptions}
            value={probability}
            onChange={(opt) => opt && setProbability(opt)}
            isSearchable={false}
          />
        </Field>
        <Field label="Impact">
          <Select
            options={levelOptions}
            value={impact}
            onChange={(opt) => opt && setImpact(opt)}
            isSearchable={false}
          />
        </Field>
        <FormInput
          label="Owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          error={errors.owner}
          placeholder="e.g. Stephen Okoro"
        />
        <Field label="State">
          <Select
            options={stateOptions}
            value={state}
            onChange={(opt) => opt && setState(opt)}
            isSearchable={false}
          />
        </Field>
        <div className="sm:col-span-2">
          <FormTextarea
            label="Mitigation plan"
            value={mitigation}
            onChange={(e) => setMitigation(e.target.value)}
            placeholder="How will this risk be reduced or managed?"
          />
        </div>
        <p className="text-xs text-muted-foreground sm:col-span-2">
          Calculated severity:{" "}
          <span className="font-medium text-foreground">
            {severityLabel[previewZone]}
          </span>{" "}
          (probability × impact)
        </p>
      </div>
    </Modal>
  );
}

export default RiskFormModal;
