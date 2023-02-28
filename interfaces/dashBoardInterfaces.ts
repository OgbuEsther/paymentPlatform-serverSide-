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
}
