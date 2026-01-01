export const ROLES={
    STUDENT: "student",
    ADMIN: "admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];


{/*Prevents typos ("Admin" vs "admin")

Used everywhere: schema, middleware, APIs */}