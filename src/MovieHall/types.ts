export interface Seat {
  id: string; // unique seat identifier (e.g., "A1", "X100X")
  seat: string | null; // visible label OR null for gap/empty space
}

export interface Row {
  id: string; // row identifier (e.g., "A", "B", "C")
  seats: Seat[]; // seats inside this row
}

export interface Section {
  id: string; // section identifier (e.g., "SEC100")
  name: string; // section name (e.g., "Recliner")
  rows: Row[]; // list of rows inside this section
}

export interface MovieHallStructure {
  name: string; // hall name (e.g., "PVR Cinemas")
  sections: Section[];
}
