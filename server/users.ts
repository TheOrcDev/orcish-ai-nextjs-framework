"use server";

import { auth } from "@/lib/auth";

export const signIn = async (_: unknown, formData: FormData): Promise<{
    errors: Record<string, string[]>;
    values: Record<string, string>;
    redirect?: string;
}> => {
    const formValues = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    try {
        const signInResult = await auth.api.signInEmail({
            body: {
                email: formValues.email,
                password: formValues.password,
            }
        })

        return {
            errors: {},
            values: {
                text: "Successfully signed in.",
            },
            redirect: "/ai-selector",
        }
    } catch (e: unknown) {
        const error = e as Error;
        return {
            errors: { message: [error.message || 'An unknown error occurred'] },
            values: {},
        }
    }
}

export const signUp = async (_: unknown, formData: FormData): Promise<{
    errors: Record<string, string[]>;
    values: Record<string, string>;
    redirect?: string;
}> => {
    const formValues = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        name: formData.get("name") as string,
    }

    try {
        const signUpResult = await auth.api.signUpEmail({
            body: {
                email: formValues.email,
                password: formValues.password,
                name: formValues.name,
            }
        })

        return {
            errors: {},
            values: {
                text: "Successfully signed up.",
            },
            redirect: "/ai-selector",
        }
    } catch (e) {
        const error = e as Error;
        return {
            errors: { message: [error.message || 'An unknown error occurred'] },
            values: {},
        }
    }
}
