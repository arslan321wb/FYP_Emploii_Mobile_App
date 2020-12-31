export interface IUser {
  full_name?: string;
  first_name?: string;
  is_employer?: boolean;
  is_job_seeker?: boolean;
  is_user_login?: boolean;
  last_name?: string;
  user_email?: string;
  user_id?: string;
  ID?: string;
  email?: string;
  password?: string;
  present_address?: string;
  permanent_address?: string;
  dated?: string;
  country?: string;
  city?: string;
  gender?: string;
  dob?: string;
  phone?: string;
  photo?: string;
  default_cv_id?: string;
  mobile?: string;
  home_phone?: string;
  cnic?: string;
  nationality?: string;
  career_objective?: string;
  sts?: string;
  verification_code?: string;
  first_login_date?: string;
  last_login_date?: string;
  slug?: string;
  ip_address?: string;
  old_id?: string;
  queue_email_sts?: string;
  flag?: string;
  send_job_alert?: string;
  dob_day?: string;
  dob_month?: string;
  dob_year?: string;
  current_address?: string;
  mobile_number?: string;
}

export interface ICompany {
  country?: string;
  city?: string;
  company_name?: string;
  company_description?: string;
  company_location?: string;
  company_website?: string;
  no_of_employees?: string;
  company_logo?: string;
  total_opened_jobs?: number;
}

export interface IJobs {
  ID: string;
  job_title: string;
  job_slug: string;
  employer_ID: string;
  company_ID: string;
  job_description: string;
  city: string;
  dated: string;
  last_date: string;
  is_featured: boolean;
  sts: string;
  company_name: string;
  company_logo: string;
  company_slug: string;
  applied: string;
}

export interface IDocument {
  path?: string;
  type?: string;
  name?: string;
  filename?: string;
  mime?: string;
}

export interface IUploadFile {
  document?: IDocument;
  user?: IUser;
  folderName?: string;
}

export interface ISKill {
  ID: string;
  seeker_ID: string;
  skill_name: string;
}

export interface IChats {
  employer_id?: string;
  last_message?: string;
  name?: string;
}

export interface IChatMessage {
  chat_id: string;
  employer_name?: string;
  jobseeker_name?: string;
  message?: string;
  sent_from?: string;
  sent_on?: string;
}
