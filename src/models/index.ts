export type Visitor = {
  name: string;
  company?: string;
  email: string;
  phone: string,
  id?:string
};
export type Visit = {
  id?: string;
  visitor: string;
  host: string;
  purposeOfVisit: string;
  hasAppointment: boolean;
  time: number;
  departure?: number;
};
export type Feedback = {
  id?: string;
  feedback: string;
  purposeAchieved: boolean;
  rating: number;
  userEmail: string;
  userId: string;
  userName: string;
  time?: number;
};
