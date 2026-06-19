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
import type { Issue } from "./risksData";

interface IssueFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (issue: Issue) => void;
  nextId: number;
}

const projectOptions = projects.map((p) => ({ label: p.name, value: p.name }));
const priorityOptions = (
  ["Low", "Medium", "High", "Critical"] as Issue["priority"][]
).map((p) => ({ label: p, value: p }));
const statusOptions = (
  ["Open", "In Progress", "Resolved"] as Issue["status"][]
).map((s) => ({ label: s, value: s }));

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}

function IssueFormModal({
  isOpen,
  onClose,
  onCreate,
  nextId,
}: IssueFormModalProps) {
  const [description, setDescription] = useState("");
  const [project, setProject] = useState(projectOptions[0]);
  const [priority, setPriority] = useState(priorityOptions[1]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [owner, setOwner] = useState("");
  const [resolution, setResolution] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reset = () => {
    setDescription("");
    setProject(projectOptions[0]);
    setPriority(priorityOptions[1]);
    setStatus(statusOptions[0]);
    setOwner("");
    setResolution("");
    setErrors({});
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleCreate = () => {
    const next: Record<string, string> = {};
    if (!description.trim()) next.description = "Description is required.";
    if (!owner.trim()) next.owner = "Owner is required.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const selected = projects.find((p) => p.name === project.value);

    const issue: Issue = {
      id: `ISS-${String(nextId).padStart(3, "0")}`,
      description: description.trim(),
      project: project.value,
      projectId: selected?.id ?? 0,
      location: selected?.location ?? "",
      priority: priority.value,
      status: status.value,
      resolution: resolution.trim() || "—",
      owner: owner.trim(),
      raised: new Date().toISOString().slice(0, 10),
    };

    onCreate(issue);
    toast.success(`Issue ${issue.id} raised`);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Raise a site issue"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={handleCreate}>
            Add issue
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FormInput
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description}
            placeholder="e.g. Design clash blocking earthworks"
          />
        </div>
        <Field label="Development">
          <Select
            options={projectOptions}
            value={project}
            onChange={(opt) => opt && setProject(opt)}
          />
        </Field>
        <FormInput
          label="Owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          error={errors.owner}
          placeholder="e.g. Bola Adisa"
        />
        <Field label="Priority">
          <Select
            options={priorityOptions}
            value={priority}
            onChange={(opt) => opt && setPriority(opt)}
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
        <div className="sm:col-span-2">
          <FormTextarea
            label="Resolution plan"
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            placeholder="How will this issue be resolved?"
          />
        </div>
      </div>
    </Modal>
  );
}

export default IssueFormModal;
