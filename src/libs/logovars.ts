export enum LogoType {
    SQUARE = 'square',
    WIDE = 'wide',
    ULTRAWIDE = 'ultrawide',
  }
  
  export const logoDimensions = {
    [LogoType.SQUARE]: {
      maxWidth: 100,
      maxHeight: 100,
    },
    [LogoType.WIDE]: {
      maxWidth: 150,
      maxHeight: 60,
    },
    [LogoType.ULTRAWIDE]: {
      maxWidth: 150,
      maxHeight: 40,
    },
  };