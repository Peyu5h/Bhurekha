import { ZodError } from "zod";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: Array<{
    message: string;
    code?: string;
    path?: string[];
  }>;
};

const transformZodError = (zodError: ZodError) => ({
  errors: zodError.errors.map((error) => ({
    message: error.message,
    path: error.path.map(String),
  })),
});

export const success = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

export const err = (message: string, path?: string[]): ApiResponse<never> => ({
  success: false,
  error: [{ message, path }],
});

export const validationErr = (
  error: ZodError | { errors: Array<{ message: string; path?: string[] }> },
): ApiResponse<never> => ({
  success: false,
  error:
    error instanceof ZodError ? transformZodError(error).errors : error.errors,
});

export const notFound = (
  message: string = "Resource not found",
): ApiResponse<never> => ({
  success: false,
  error: [{ message, code: "NOT_FOUND" }],
});

export const badRequest = (
  message: string,
  path?: string[],
): ApiResponse<never> => ({
  success: false,
  error: [{ message, code: "BAD_REQUEST", path }],
});

export const serverError = (
  message: string = "Internal server error",
): ApiResponse<never> => ({
  success: false,
  error: [{ message, code: "SERVER_ERROR" }],
});
