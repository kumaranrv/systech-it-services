// lib/inquiryService.ts
import { readAll, writeAll, InquiryRecord } from "./db";
import { randomUUID } from "crypto";

export interface CreateInquiryInput {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export function createInquiry(data: CreateInquiryInput): InquiryRecord {
  const all = readAll();

  const record: InquiryRecord = {
    id: randomUUID(),
    name: data.name,
    email: data.email,
    phone: data.phone ?? "",
    service: data.service ?? "",
    message: data.message,
    createdAt: new Date().toISOString(),
  };

  all.push(record);
  writeAll(all);

  return record;
}

export function getAllInquiries(): InquiryRecord[] {
  return readAll().reverse(); // newest first
}
