export type OOOFormType = {
  toDate: number;
  fromDate: number;
  description: string;
  setToDate: () => void;
  setFromDate: () => void;
  setDescription: () => void;
  handleFormSubmit: () => void;
  isLoading: boolean;
};
