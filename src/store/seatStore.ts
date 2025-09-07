import { create } from 'zustand';

type SeatStore = {
  selectedSeats: Record<string, boolean>;
  toggleSeat: (id: string) => void;
  isSelected: (id: string) => boolean;
};

export const useSeatStore = create<SeatStore>((set, get) => ({
  selectedSeats: {},

  toggleSeat: (id: string) =>
    set(state => ({
      selectedSeats: {
        ...state.selectedSeats,
        [id]: !state.selectedSeats[id], // toggle true/false
      },
    })),

  isSelected: (id: string) => !!get().selectedSeats[id],
}));
