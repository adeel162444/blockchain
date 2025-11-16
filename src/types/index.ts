export interface Department {
  id: string;
  name: string;
  code: string;
  created_at: string;
}

export interface Class {
  id: string;
  name: string;
  department_id: string;
  semester: string;
  year: number;
  created_at: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  student_id: string;
  department_id: string;
  created_at: string;
}

export interface AttendanceRecord {
  id: string;
  student_id: string;
  class_id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  block_index: number;
  created_at: string;
}

export interface Block {
  index: number;
  timestamp: string;
  data: unknown;
  previousHash: string;
  hash: string;
  nonce: number;
}
