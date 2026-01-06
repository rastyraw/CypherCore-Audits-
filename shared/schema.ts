import { z } from "zod";

// ==================== USER SCHEMAS ====================

export const insertUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must not exceed 50 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters"),
});

export const userSchema = insertUserSchema.extend({
  id: z.string().uuid(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = z.infer<typeof userSchema>;

// ==================== CONTACT MESSAGE SCHEMAS ====================

export const insertContactMessageSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .trim(),
  organization: z
    .string()
    .max(200, "Organization name must not exceed 200 characters")
    .trim()
    .optional(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must not exceed 2000 characters")
    .trim(),
});

export const contactMessageSchema = insertContactMessageSchema.extend({
  id: z.string().uuid(),
  organization: z.string().nullable(),
  createdAt: z.date(),
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = z.infer<typeof contactMessageSchema>;

// ==================== CONSULTATION BOOKING SCHEMAS ====================

// Valid service types for consultation bookings
export const serviceTypeSchema = z.enum([
  "soc2",
  "iso27001",
  "hipaa",
  "nist-csf",
  "nist-cmmc",
  "cloud-security",
  "general-consultation",
], {
  errorMap: () => ({ message: "Please select a valid service type" }),
});

export type ServiceType = z.infer<typeof serviceTypeSchema>;

export const insertBookingSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
      "Please enter a valid phone number"
    )
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .max(200, "Company name must not exceed 200 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  service: serviceTypeSchema,
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, "Please select a future date"),
  preferredTime: z
    .string()
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format (24-hour)")
    .or(z.enum(["morning", "afternoon", "evening"], {
      errorMap: () => ({ message: "Please select a valid time slot" }),
    })),
  notes: z
    .string()
    .max(1000, "Notes must not exceed 1000 characters")
    .trim()
    .optional()
    .or(z.literal("")),
});

export const bookingSchema = insertBookingSchema.extend({
  id: z.string().uuid(),
  phone: z.string().nullable(),
  company: z.string().nullable(),
  notes: z.string().nullable(),
  createdAt: z.date(),
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = z.infer<typeof bookingSchema>;

// ==================== CHAT MESSAGE SCHEMAS ====================

export const insertChatMessageSchema = z.object({
  visitorId: z
    .string()
    .min(1, "Visitor ID is required")
    .max(200, "Visitor ID is invalid"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .trim()
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim()
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(1, "Message cannot be empty")
    .max(1000, "Message must not exceed 1000 characters")
    .trim(),
  isFromVisitor: z
    .boolean()
    .default(true),
});

export const chatMessageSchema = insertChatMessageSchema.extend({
  id: z.string().uuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  isFromVisitor: z.boolean(),
  createdAt: z.date(),
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = z.infer<typeof chatMessageSchema>;
