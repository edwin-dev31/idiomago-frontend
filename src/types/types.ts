// src/types.ts

export interface Word {
    id: number;
    word: string;
    translations: {
      spanish: string;
      french: string;
      german: string;
    };
    definition: string;
    example: string;
    favorite: boolean;
    image: string;
  }
  