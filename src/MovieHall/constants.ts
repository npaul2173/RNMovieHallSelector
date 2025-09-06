import { MovieHallStructure } from './types';

export const movieHallStructure: MovieHallStructure = {
  name: 'PVR Cinemas',
  sections: [
    {
      id: 'SEC100',
      name: 'Recliner',
      rows: [
        {
          id: 'A',
          seats: [
            { id: 'X100X', seat: null },
            { id: 'A1', seat: 'A1' },
            { id: 'A2', seat: 'A2' },
            { id: 'X101X', seat: null },
            { id: 'X102X', seat: null },
            { id: 'X103X', seat: null },
            { id: 'X104X', seat: null },
            { id: 'A3', seat: 'A3' },
            { id: 'A4', seat: 'A4' },
          ],
        },
      ],
    },
    {
      id: 'SEC200',
      name: 'Prime',
      rows: [
        {
          id: 'C',
          seats: [
            { id: 'X100X', seat: null },
            { id: 'C1', seat: 'C1' },
            { id: 'C2', seat: 'C2' },
            { id: 'C3', seat: 'C3' },
          ],
        },
        {
          id: 'D',
          seats: [
            { id: 'X100X', seat: null },
            { id: 'D1', seat: 'D1' },
            { id: 'D2', seat: 'D2' },
            { id: 'D3', seat: 'D3' },
            { id: 'D4', seat: 'D4' },
            { id: 'D5', seat: 'D5' },
          ],
        },
      ],
    },
    {
      id: 'SEC300',
      name: 'Classic',
      rows: [
        {
          id: 'G',
          seats: [
            { id: 'X100X', seat: null },
            { id: 'G1', seat: 'G1' },
            { id: 'G2', seat: 'G2' },
            { id: 'G3', seat: 'G3' },
            { id: 'G4', seat: 'G4' },
            { id: 'G5', seat: 'G5' },
            { id: 'G6', seat: 'G6' },
            { id: 'G7', seat: 'G7' },
          ],
        },
      ],
    },
  ],
};
