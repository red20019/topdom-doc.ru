import { UploadFile } from "antd";

export type UserType = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  avatar: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type FullUserType = {
  data: UserType
}

export interface UserSliceState {
  currentUser: UserType | null;
  loading: boolean;
  error: string | null;
}

export type Middleware<T> = {
  success: boolean;
  data: T;
  message: string;
};

export type DocsType = {
  name: string;
  files: UploadFile[] | null;
};

// export type ListingData = {
//   _id?: string;
//   name: string;
//   description: string;
//   address: string;
//   regularPrice: number;
//   discountPrice: number;
//   bathrooms: number;
//   bedrooms: number;
//   furnished: boolean;
//   parking: boolean;
//   type: 'rent' | 'sale';
//   offer: boolean;
//   imageUrls: string[];
//   userRef?: string;
// };

export type UserTypeWithMiddleware = UserType &
  Middleware<Record<string, string>>;
// export type ListingDataWithMiddleware = ListingData & Middleware;

// export type Middleware = {
//   success: boolean;
//   statusCode: number;
//   message: string;
// };

export type Extra = {
  success: boolean;
  message: string;
};

export type FullUserTypeWithExtra = FullUserType & Extra;
