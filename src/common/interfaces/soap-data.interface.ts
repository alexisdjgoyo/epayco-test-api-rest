export interface RegistroClienteData {
  cliente_id: number;
}

export interface RecargaBilleteraData {
  nuevo_saldo: number;
}

export interface ConsultarSaldoData {
  saldo: number;
  cliente?: string;
}

export interface PagarData {
  session_id: string;
  mensaje?: string;
}

export interface ConfirmarPagoData {
  nuevo_saldo: number;
  monto_pagado: number;
}

export type SoapData =
  | RegistroClienteData
  | RecargaBilleteraData
  | ConsultarSaldoData
  | PagarData
  | ConfirmarPagoData
  | null
  | string;
