"use server";

import { revalidatePath } from "next/cache";

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
        // Logging for manual WhatsApp tracking
        console.log("New Lead:", { businessName, city, whatsapp, budget });

        return {
            success: true,
            message: "You're on the whitelist! A Loom OOH strategist will WhatsApp you shortly at " + whatsapp
        };
    } catch (error) {
        console.error("Failed to process lead:", error);
        return { success: false, message: "Something went wrong. Please try again." };
    }
}
