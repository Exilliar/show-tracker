export interface ShowAdd {
  title: string;
  watchevery: number; // days between when an episode needs to be watched, eg, weekly=7, daily=1
  catchup: number; // the number of days behind/ahead
  watched: number;
  uptodate: boolean;
  totaleps: number;
  datestarted: string;
}
