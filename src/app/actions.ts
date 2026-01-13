"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Initialize Prisma Client
// In production, this should be a singleton to prevent connection limits
const prisma = new PrismaClient();

export type FormState = {
    success?: boolean;
    message?: string;
    errors?: {
        [key: string]: string[];
    };
};

export async function submitLead(prevState: FormState, formData: FormData): Promise<FormState> {
    const businessName = formData.get("businessName") as string;
    const city = formData.get("city") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const budget = formData.get("budget") as string;

    // Basic validation
    // Ideally use Zod here, but keeping it simple for MVP
    const errors: { [key: string]: string[] } = {};

    if (!businessName || businessName.length < 2) {
        errors.businessName = ["Business name is required."];
    }
    if (!city) {
        errors.city = ["Please select a city."];
    }
    if (!whatsapp || whatsapp.length < 10) {
        errors.whatsapp = ["Valid WhatsApp number is required."];
    }

    if (Object.keys(errors).length > 0) {
        return { success: false, errors };
    }

    try {
        await prisma.lead.create({
            data: {
                businessName,
                city,
                whatsapp,
                budget,
            },
        });

        return { success: true, message: "You're on the whitelist. A Loom OOH strategist will WhatsApp you shortly." };
    } catch (error) {
        console.error("Failed to submit lead:", error);
        return { success: false, message: "Something went wrong. Please try again." };
    }
}
