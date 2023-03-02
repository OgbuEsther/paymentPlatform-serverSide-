export interface quicksave {
  amount: number;
  autoSave: boolean;
  dateTime: string | number;
  interest: number;
}

export interface locks {
  amount: number;
  payBackTime: string;
  interest: number;
  lock: boolean;
  title: string;
}

export interface target {
  amount: number;
  fixedAmount: number;
  interest: number;
  dateTime: string;
  title: string;
  targetValue: boolean;
  targetBalance: number;
}

export interface invest {
  title: string;
  percentageInterest: number;
  description: string;
  investors: {}[];
  startTime: string;
  duration: string;
  category: string;
  status: boolean;
  totalUnit: number;
  amountPerUnit: number;
}

export interface investorData {
  investorId: string;
  amount: number;
  unit: number;
}
