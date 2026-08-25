import Link from "next/link";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

import {
  toggleTemplate,
} from "./actions";

/*
 * ============================
 * DISPLAY HELPERS
 * ============================
 */

function formatEnum(
  value: string
) {
  return value.replaceAll(
    "_",
    " "
  );
}

function getCategoryClasses(
  category: string
) {
  switch (category) {
    case "NETWORK":
      return "text-blue-400";

    case "SYSTEMS":
      return "text-yellow-400";

    case "SECURITY":
      return "text-red-400";

    default:
      return "text-zinc-300";
  }
}

function getSeverityClasses(
  severity: string
) {
  switch (severity) {
    case "P1":
      return "border-red-700 bg-red-950/30 text-red-300";

    case "P2":
      return "border-orange-800 bg-orange-950/20 text-orange-300";

    case "P3":
      return "border-yellow-800 bg-yellow-950/20 text-yellow-300";

    default:
      return "border-zinc-700 bg-zinc-900 text-zinc-300";
  }
}

function getDifficultyLabel(
  difficulty: number
) {
  switch (difficulty) {
    case 1:
      return "Easy";

    case 2:
      return "Standard";

    case 3:
      return "Hard";

    case 4:
      return "Expert";

    case 5:
      return "Nightmare";

    default:
      return `Level ${difficulty}`;
  }
}

/*
 * ============================
 * PAGE
 * ============================
 */

export default async function AdminTemplatesPage() {
  /*
   * ============================
   * ADMIN AUTH
   * ============================
   */
  await requireAdmin();

  /*
   * ============================
   * LOAD TEMPLATES
   * ============================
   */
  const templates =
    await prisma.ticketTemplate.findMany({
      orderBy: [
        {
          category:
            "asc",
        },

        {
          severity:
            "asc",
        },

        {
          title:
            "asc",
        },
      ],
    });

  /*
   * ============================
   * SUMMARY
   * ============================
   */
  const activeCount =
    templates.filter(
      (template) =>
        template.active
    ).length;

  const disabledCount =
    templates.length -
    activeCount;

  const serviceDeskCount =
    templates.filter(
      (template) =>
        template.category ===
        "SERVICE_DESK"
    ).length;

  const networkCount =
    templates.filter(
      (template) =>
        template.category ===
        "NETWORK"
    ).length;

  const systemsCount =
    templates.filter(
      (template) =>
        template.category ===
        "SYSTEMS"
    ).length;

  const securityCount =
    templates.filter(
      (template) =>
        template.category ===
        "SECURITY"
    ).length;

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:px-6">

      <div className="mx-auto max-w-[1600px]">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex flex-wrap items-start justify-between gap-4">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Ticket Templates
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Manage the ticket content used by the automatic queue generator.
            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            <Link
              href="/admin/templates/new"
              className="bg-white px-4 py-2 text-sm font-black text-black hover:bg-zinc-200"
            >
              + Create Template
            </Link>

            <Link
              href="/admin"
              className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
            >
              Admin Home
            </Link>

            <Link
              href="/dashboard"
              className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
            >
              Back to Game
            </Link>

          </div>

        </div>

        {/* ============================
            ADMIN NAV
            ============================ */}
        <div className="mt-6 flex flex-wrap gap-2">

          <Link
            href="/admin"
            className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
          >
            Overview
          </Link>

          <Link
            href="/admin/players"
            className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
          >
            Players
          </Link>

          <Link
            href="/admin/tickets"
            className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
          >
            Tickets
          </Link>

          <Link
            href="/admin/pvp"
            className="border border-purple-800 px-4 py-2 text-sm font-bold text-purple-300 hover:bg-purple-950/30"
          >
            PvP
          </Link>

          <Link
            href="/admin/templates"
            className="bg-white px-4 py-2 text-sm font-black text-black"
          >
            Templates
          </Link>

          <Link
            href="/admin/feedback"
            className="border border-blue-800 px-4 py-2 text-sm font-bold text-blue-300 hover:bg-blue-950/30"
          >
            Feedback
          </Link>

        </div>

        {/* ============================
            SUMMARY
            ============================ */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">

          <SummaryCard
            label="Total"
            value={
              templates.length
            }
          />

          <SummaryCard
            label="Active"
            value={
              activeCount
            }
            valueClass="text-green-400"
          />

          <SummaryCard
            label="Disabled"
            value={
              disabledCount
            }
            valueClass="text-red-400"
          />

          <SummaryCard
            label="Service Desk"
            value={
              serviceDeskCount
            }
          />

          <SummaryCard
            label="Network"
            value={
              networkCount
            }
            valueClass="text-blue-400"
          />

          <SummaryCard
            label="Systems"
            value={
              systemsCount
            }
            valueClass="text-yellow-400"
          />

          <SummaryCard
            label="Security"
            value={
              securityCount
            }
            valueClass="text-red-400"
          />

        </div>

        {/* ============================
            INFORMATION
            ============================ */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

          <p className="text-xs text-zinc-500">
            {
              templates.length
            }{" "}
            ticket templates in the database.
          </p>

          <p className="text-xs text-zinc-600">
            Disabled templates cannot be selected by the ticket generator.
          </p>

        </div>

        {/* ============================
            TEMPLATE TABLE
            ============================ */}
        <div className="mt-3 overflow-x-auto border border-zinc-800">

          <table className="w-full min-w-[1350px] text-left text-sm">

            <thead className="border-b border-zinc-800 bg-zinc-950">

              <tr className="text-xs uppercase tracking-wide text-zinc-500">

                <th className="px-4 py-3">
                  ID
                </th>

                <th className="px-4 py-3">
                  Ticket
                </th>

                <th className="px-4 py-3">
                  Category
                </th>

                <th className="px-4 py-3">
                  Severity
                </th>

                <th className="px-4 py-3">
                  Difficulty
                </th>

                <th className="px-4 py-3">
                  Max Value
                </th>

                <th className="px-4 py-3">
                  XP
                </th>

                <th className="px-4 py-3">
                  Status
                </th>

                <th className="px-4 py-3 text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {templates.length ===
                0 && (
                <tr>

                  <td
                    colSpan={9}
                    className="px-4 py-10 text-center text-zinc-500"
                  >
                    No ticket templates found.
                  </td>

                </tr>
              )}

              {templates.map(
                (template) => (
                  <tr
                    key={
                      template.id
                    }
                    className={`border-b border-zinc-900 last:border-b-0 ${
                      template.active
                        ? "hover:bg-zinc-950"
                        : "bg-red-950/5 opacity-60 hover:bg-red-950/10"
                    }`}
                  >

                    {/* ID */}
                    <td className="whitespace-nowrap px-4 py-3">

                      <span className="font-mono text-xs text-zinc-500">
                        #
                        {
                          template.id
                        }
                      </span>

                    </td>

                    {/* TICKET */}
                    <td className="max-w-[380px] px-4 py-3">

                      <p className="truncate font-bold">
                        {
                          template.title
                        }
                      </p>

                      <p className="mt-1 max-w-[380px] truncate text-xs text-zinc-600">
                        {
                          template.description
                        }
                      </p>

                    </td>

                    {/* CATEGORY */}
                    <td className="whitespace-nowrap px-4 py-3">

                      <span
                        className={`text-xs font-black ${getCategoryClasses(
                          template.category
                        )}`}
                      >
                        {formatEnum(
                          template.category
                        )}
                      </span>

                    </td>

                    {/* SEVERITY */}
                    <td className="px-4 py-3">

                      <span
                        className={`inline-block border px-2 py-1 text-xs font-black ${getSeverityClasses(
                          template.severity
                        )}`}
                      >
                        {
                          template.severity
                        }
                      </span>

                    </td>

                    {/* DIFFICULTY */}
                    <td className="whitespace-nowrap px-4 py-3">

                      <div>

                        <p className="font-bold">
                          {
                            template.difficulty
                          }
                        </p>

                        <p className="text-[10px] text-zinc-600">
                          {getDifficultyLabel(
                            template.difficulty
                          )}
                        </p>

                      </div>

                    </td>

                    {/* MAX VALUE */}
                    <td className="whitespace-nowrap px-4 py-3">

                      <span className="font-bold">
                        {
                          template.maxValue
                        }{" "}
                        CR
                      </span>

                    </td>

                    {/* XP */}
                    <td className="whitespace-nowrap px-4 py-3">

                      <span className="font-bold text-zinc-300">
                        {
                          template.baseXp
                        }{" "}
                        XP
                      </span>

                    </td>

                    {/* STATUS */}
                    <td className="whitespace-nowrap px-4 py-3">

                      {template.active ? (
                        <span className="text-xs font-black text-green-400">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="text-xs font-black text-red-400">
                          DISABLED
                        </span>
                      )}

                    </td>

                    {/* ACTIONS */}
                    <td className="whitespace-nowrap px-4 py-3">

                      <div className="flex justify-end gap-2">

                        <Link
                          href={`/admin/templates/${template.id}`}
                          className="border border-zinc-700 px-3 py-2 text-xs font-bold hover:bg-zinc-900"
                        >
                          Edit
                        </Link>

                        <form
                          action={
                            toggleTemplate
                          }
                        >

                          <input
                            type="hidden"
                            name="templateId"
                            value={
                              template.id
                            }
                          />

                          <button
                            type="submit"
                            className={`border px-3 py-2 text-xs font-bold ${
                              template.active
                                ? "border-red-900 text-red-400 hover:bg-red-950/20"
                                : "border-green-900 text-green-400 hover:bg-green-950/20"
                            }`}
                          >
                            {template.active
                              ? "Disable"
                              : "Enable"}
                          </button>

                        </form>

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}

/*
 * ============================
 * SUMMARY CARD
 * ============================
 */

function SummaryCard({
  label,
  value,
  valueClass = "",
}: {
  label: string;
  value: number;
  valueClass?: string;
}) {
  return (
    <div className="border border-zinc-800 bg-zinc-950 p-4">

      <p className="text-xs uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p
        className={`mt-1 text-2xl font-black ${valueClass}`}
      >
        {value}
      </p>

    </div>
  );
}