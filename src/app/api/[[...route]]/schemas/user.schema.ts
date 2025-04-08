import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  walletAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address"),
  role: z.enum(["USER", "SUB_REGISTRAR"], {
    errorMap: () => ({
      message: "Role must be either 'USER' or 'SUB_REGISTRAR'",
    }),
  }),
  dob: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  mobileNumber: z.string().optional(),
  departmentId: z.string().optional(),
  designation: z.string().optional(),
});

export const updateUserSchema = userSchema.partial();

export type CreateUserInput = z.infer<typeof userSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
