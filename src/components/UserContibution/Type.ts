export type displayContributionType = {
  assignee: string;
  assigneeId: string;
  completionAward: completionAwardType;
  createdAt: number;
  createdBy: string;
  endsOn: number;
  id: string;
  isNoteworthy: boolean;
  lossRate: completionAwardType;
  percentCompleted: number;
  priority: string;
  startedOn: number;
  status: string;
  title: string;
  type: string;
  updatedAt: number;
};
export type taskType = displayContributionType[];
export type completionAwardType = {dinero: number; neelam: number};
