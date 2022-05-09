declare namespace Express {
  export interface Response {
    badRequest: (data?: any) => void;
    unauthorized: (data?: any) => void;
    notFound: (data?: any) => void;
    serverError: (data?: any) => void;
    successfull: (data?: any) => void;
  }
}
