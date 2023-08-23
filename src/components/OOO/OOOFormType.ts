export type OOOFormType = {
  toDate: string;
  fromDate: string;
  description: string;
  setToDate: () => void;
  setFromDate: () => void;
  setDescription: () => void;
  handleFormSubmit: () => void;
};
