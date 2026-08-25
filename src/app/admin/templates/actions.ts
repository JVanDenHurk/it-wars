"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

/*
 * ============================
 * VALID VALUES
 * ============================
 */

const validCategories = [
  "SERVICE_DESK",
  "NETWORK",
  "SYSTEMS",
  "SECURITY",
] as const;

const validSeverities = [
  "P1",
  "P2",
  "P3",
  "P4",
] as const;

type TicketCategory =
  (typeof validCategories)[number];

type TicketSeverity =
  (typeof validSeverities)[number];

/*
 * ============================
 * TYPE GUARDS
 * ============================
 */

function isTicketCategory(
  value: string
): value is TicketCategory {
  return validCategories.includes(
    value as TicketCategory
  );
}

function isTicketSeverity(
  value: string
): value is TicketSeverity {
  return validSeverities.includes(
    value as TicketSeverity
  );
}

/*
 * ============================
 * TOGGLE TEMPLATE
 * ============================
 */

export async function toggleTemplate(
  formData: FormData
) {
  await requireAdmin();

  const templateId =
    Number(
      formData.get(
        "templateId"
      )
    );

  if (
    !Number.isInteger(
      templateId
    ) ||
    templateId <= 0
  ) {
    throw new Error(
      "Invalid template ID."
    );
  }

  const template =
    await prisma.ticketTemplate.findUnique({
      where: {
        id: templateId,
      },

      select: {
        id: true,
        active: true,
      },
    });

  if (!template) {
    throw new Error(
      "Template not found."
    );
  }

  await prisma.ticketTemplate.update({
    where: {
      id: template.id,
    },

    data: {
      active:
        !template.active,
    },
  });

  revalidatePath(
    "/admin/templates"
  );

  revalidatePath(
    `/admin/templates/${templateId}`
  );
}

/*
 * ============================
 * CREATE TEMPLATE
 * ============================
 */

export async function createTemplate(
  formData: FormData
) {
  await requireAdmin();

  /*
   * ============================
   * READ FORM
   * ============================
   */

  const title =
    String(
      formData.get(
        "title"
      ) ?? ""
    ).trim();

  const description =
    String(
      formData.get(
        "description"
      ) ?? ""
    ).trim();

  const category =
    String(
      formData.get(
        "category"
      ) ?? ""
    );

  const severity =
    String(
      formData.get(
        "severity"
      ) ?? ""
    );

  const difficulty =
    Number(
      formData.get(
        "difficulty"
      )
    );

  const maxValue =
    Number(
      formData.get(
        "maxValue"
      )
    );

  const baseXp =
    Number(
      formData.get(
        "baseXp"
      )
    );

  const successMessageRaw =
    String(
      formData.get(
        "successMessage"
      ) ?? ""
    ).trim();

  const failureMessageRaw =
    String(
      formData.get(
        "failureMessage"
      ) ?? ""
    ).trim();

  const active =
    formData.get(
      "active"
    ) === "on";

  /*
   * ============================
   * VALIDATION
   * ============================
   */

  if (!title) {
    throw new Error(
      "Title is required."
    );
  }

  if (!description) {
    throw new Error(
      "Description is required."
    );
  }

  if (
    !isTicketCategory(
      category
    )
  ) {
    throw new Error(
      "Invalid ticket category."
    );
  }

  if (
    !isTicketSeverity(
      severity
    )
  ) {
    throw new Error(
      "Invalid ticket severity."
    );
  }

  if (
    !Number.isInteger(
      difficulty
    ) ||
    difficulty < 1 ||
    difficulty > 5
  ) {
    throw new Error(
      "Difficulty must be between 1 and 5."
    );
  }

  if (
    !Number.isInteger(
      maxValue
    ) ||
    maxValue < 0
  ) {
    throw new Error(
      "Maximum Credit value must be zero or greater."
    );
  }

  if (
    !Number.isInteger(
      baseXp
    ) ||
    baseXp < 0
  ) {
    throw new Error(
      "Base XP must be zero or greater."
    );
  }

  /*
   * ============================
   * CREATE
   * ============================
   */

  await prisma.ticketTemplate.create({
    data: {
      title,

      description,

      category,

      severity,

      difficulty,

      maxValue,

      baseXp,

      successMessage:
        successMessageRaw ||
        null,

      failureMessage:
        failureMessageRaw ||
        null,

      active,
    },
  });

  revalidatePath(
    "/admin/templates"
  );

  redirect(
    "/admin/templates"
  );
}

/*
 * ============================
 * UPDATE TEMPLATE
 * ============================
 */

export async function updateTemplate(
  formData: FormData
) {
  await requireAdmin();

  /*
   * ============================
   * READ FORM
   * ============================
   */

  const templateId =
    Number(
      formData.get(
        "templateId"
      )
    );

  const title =
    String(
      formData.get(
        "title"
      ) ?? ""
    ).trim();

  const description =
    String(
      formData.get(
        "description"
      ) ?? ""
    ).trim();

  const category =
    String(
      formData.get(
        "category"
      ) ?? ""
    );

  const severity =
    String(
      formData.get(
        "severity"
      ) ?? ""
    );

  const difficulty =
    Number(
      formData.get(
        "difficulty"
      )
    );

  const maxValue =
    Number(
      formData.get(
        "maxValue"
      )
    );

  const baseXp =
    Number(
      formData.get(
        "baseXp"
      )
    );

  const successMessageRaw =
    String(
      formData.get(
        "successMessage"
      ) ?? ""
    ).trim();

  const failureMessageRaw =
    String(
      formData.get(
        "failureMessage"
      ) ?? ""
    ).trim();

  const active =
    formData.get(
      "active"
    ) === "on";

  /*
   * ============================
   * VALIDATION
   * ============================
   */

  if (
    !Number.isInteger(
      templateId
    ) ||
    templateId <= 0
  ) {
    throw new Error(
      "Invalid template ID."
    );
  }

  if (!title) {
    throw new Error(
      "Title is required."
    );
  }

  if (!description) {
    throw new Error(
      "Description is required."
    );
  }

  if (
    !isTicketCategory(
      category
    )
  ) {
    throw new Error(
      "Invalid ticket category."
    );
  }

  if (
    !isTicketSeverity(
      severity
    )
  ) {
    throw new Error(
      "Invalid ticket severity."
    );
  }

  if (
    !Number.isInteger(
      difficulty
    ) ||
    difficulty < 1 ||
    difficulty > 5
  ) {
    throw new Error(
      "Difficulty must be between 1 and 5."
    );
  }

  if (
    !Number.isInteger(
      maxValue
    ) ||
    maxValue < 0
  ) {
    throw new Error(
      "Maximum Credit value must be zero or greater."
    );
  }

  if (
    !Number.isInteger(
      baseXp
    ) ||
    baseXp < 0
  ) {
    throw new Error(
      "Base XP must be zero or greater."
    );
  }

  /*
   * ============================
   * CHECK TEMPLATE EXISTS
   * ============================
   */

  const existingTemplate =
    await prisma.ticketTemplate.findUnique({
      where: {
        id: templateId,
      },

      select: {
        id: true,
      },
    });

  if (!existingTemplate) {
    throw new Error(
      "Template not found."
    );
  }

  /*
   * ============================
   * UPDATE
   * ============================
   */

  await prisma.ticketTemplate.update({
    where: {
      id: templateId,
    },

    data: {
      title,

      description,

      category,

      severity,

      difficulty,

      maxValue,

      baseXp,

      successMessage:
        successMessageRaw ||
        null,

      failureMessage:
        failureMessageRaw ||
        null,

      active,
    },
  });

  revalidatePath(
    "/admin/templates"
  );

  revalidatePath(
    `/admin/templates/${templateId}`
  );

  redirect(
    "/admin/templates"
  );
}