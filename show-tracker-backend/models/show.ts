export interface Show {
  id: number;
  title: string;
  watchEvery: number; // days between when an episode needs to be watched, eg, weekly=7, daily=1
  catchUp: number; // the number of days behind/ahead
  watched: number;
  upToDate: boolean;
  totalEps: number;
  dateStarted: string;
}
