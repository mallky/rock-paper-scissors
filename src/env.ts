export const wsProtocol = 'ws';
export const httpProtocol = 'http';
export const origin = '127.0.0.1';
export const port1 = '7000';
export const port2 = '8443';
export const url = `${httpProtocol}://${origin}:${port1}`;
export const wsUrl = `${wsProtocol}://${origin}:${port2}`;

export enum Choices {
  handScissorsO = 'handScissorsO',
  handPaperO = 'handPaperO',
  handRockO = 'handRockO',
}
