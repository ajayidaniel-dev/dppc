import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import type { Status } from "./types";

/**
 * Merge conditional Tailwind classes, de-duplicating conflicts.
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export const formatDate = (
  date: string | Date | number | undefined | null,
  format = "DD MMM YYYY"
): string => {
  if (!date) return "—";
  const m = moment(date);
  return m.isValid() ? m.format(format) : "—";
};

export const formatCurrency = (
  value: number | undefined | null,
  currency = "USD"
): string => {
  if (value === undefined || value === null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number | undefined | null): string => {
  if (value === undefined || value === null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-US").format(value);
};

export const truncate = (text: string, max = 50): string =>
  text.length > max ? `${text.slice(0, max)}…` : text;

/**
 * Map a traffic-light status to Tailwind text/background tokens.
 */
export const statusColor = (status: Status): string => {
  switch (status) {
    case "green":
      return "bg-success/15 text-success";
    case "amber":
      return "bg-warning/15 text-warning";
    case "red":
      return "bg-danger/15 text-danger";
    default:
      return "bg-surface-muted text-muted-foreground";
  }
};

/** Split a name on spaces and common separators found in email locals. */
const nameParts = (name: string): string[] =>
  name.split(/[\s._-]+/).filter(Boolean);

export const getInitials = (name: string): string =>
  nameParts(name)
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

/**
 * Extract a display-friendly first name and capitalize its first letter.
 * Handles email-derived names like "ajayidaniel.dev" -> "Ajayidaniel".
 */
export const getFirstName = (name: string): string => {
  const first = nameParts(name)[0] ?? "";
  return first ? first.charAt(0).toUpperCase() + first.slice(1) : "";
};
