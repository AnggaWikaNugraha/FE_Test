export interface LalinItem {
  IdCabang: number;
  IdGerbang: number;
  IdGardu: number;
  Golongan: number;
  Tanggal: string;
  Shift: number;
  Tunai: number;
  eMandiri: number;
  eBri: number;
  eBni: number;
  eBca: number;
  eFlo: number;
  eDki?: number;
  eMega?: number
  eNobu?: number
  DinasKary?: number
  DinasMitra?: number
  DinasOpr?: number
}

export interface LalinRow {
  Ruas: string;
  Gerbang: string;
  Gardu: string;
  Hari: string;
  Tanggal: string;
  Metode: string;
  GolI: number;
  GolII: number;
  GolIII: number;
  GolIV: number;
  GolV: number;
  Total: number;
}

export interface SubtotalRuas {
  Ruas: string;
  GolI: number;
  GolII: number;
  GolIII: number;
  GolIV: number;
  GolV: number;
  Total: number;
}
