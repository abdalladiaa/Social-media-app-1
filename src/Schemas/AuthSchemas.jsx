import z from "zod";

export const registerationSchema = z
  .object({
    name: z.string().min(3, "Min Chars Is 3").max(15, "Max Chars Is 15"),
    email: z.string().min(1, "Email is required").email("Email Is Not Valid"),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/, "Password Is Weak"),
    rePassword: z.string().min(1, "RePassword is required"),
    dateOfBirth: z
      .string()
      .refine(
        (value) => new Date(value) < new Date(),
        "Date Must Be In The Past",
      ),
    gender: z.enum(["male", "female"]),
  })
  .refine((values) => values.rePassword === values.password, {
    message: "RePassword Not Match Password",
    path: ["rePassword"],
  });

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Wrong Email"),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/, "Wrong password."),
});
