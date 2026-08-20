import { projects } from "./projects";

export interface Statistic {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  /** Zero-pads the value to two digits, e.g. `5` -> `05`. */
  pad?: boolean;
  label: string;
}

const activeProjectCount = projects.filter((p) => p.status !== "sold-out").length;
const totalShareCount = projects.reduce((sum, p) => sum + p.totalShares, 0);
const totalLandValue = projects.reduce(
  (sum, p) => sum + p.pricePerShare * p.totalShares,
  0
);

/** Not derivable from project data — tracked as a standalone business figure. */
export const investorCount = 1240;

export const investmentStats: Statistic[] = [
  {
    id: "active-projects",
    value: activeProjectCount,
    pad: true,
    suffix: "+",
    label: "Active Projects",
  },
  {
    id: "total-shares",
    value: totalShareCount,
    suffix: "+",
    label: "Total Shares",
  },
  {
    id: "land-value",
    value: Math.round(totalLandValue / 1_000_000),
    prefix: "৳",
    suffix: "M+",
    label: "Land Value",
  },
  {
    id: "investors",
    value: investorCount,
    suffix: "+",
    label: "Investors",
  },
];

const regionCount = new Set(projects.map((p) => p.region)).size;
const totalLandAreaBigha = projects.reduce(
  (sum, p) => sum + parseInt(p.landAreaTotal, 10),
  0
);

export const aboutStats: Statistic[] = [
  {
    id: "projects-verified",
    value: projects.length,
    suffix: "+",
    label: "Verified Projects",
  },
  {
    id: "regions-covered",
    value: regionCount,
    label: "Regions Across Bangladesh",
  },
  {
    id: "land-secured",
    value: totalLandAreaBigha,
    suffix: "+",
    label: "Bigha Of Land Secured",
  },
  {
    /** Not derivable from project data — every listed project passes the same verification step before publishing. */
    id: "title-verified",
    value: 100,
    suffix: "%",
    label: "Title-Verified Listings",
  },
];
