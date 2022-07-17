export type Visitor = {
  name: string;
  company?: string;
  email: string;
};
export type Visit = {
  visitor: string;
  host: string;
  purposeOfVisit: string;
  hasAppointment: boolean;
  time: number;
};
