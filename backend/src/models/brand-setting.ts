/**
 * @description lista de métodos de pagos permitidos en la plataforma
 * @example PaymentMethod.BANK_TRANSFER
 */
export enum PaymentMethod {
  BANK_TRANSFER = 'bank_transfer',
  GIFT_CARD = 'gift card'
}

/**
 * @description simula el modelo de la tabla  PaymentOption disponibles de manera singular
 */
export interface PaymentOption {
  method: PaymentMethod;
  percentage: number;
  label: string;
}

/**
* @description simula el modelo de la tabla  PaymentConfig, la cual define la combinaciones de las Payment options que tiene cada marca
*/

export interface PaymentConfig {
options: PaymentOption[];
defaultMethod?: PaymentMethod;
additionalInfo?: string;
}
/**
 * @description lista de métodos de envío permitidos en la plataforma
 * @example PaymentMethod.HOME_PICKUP
*/

export enum ShippingMethod {
  HOME_PICKUP = 'recolección a domicilio',
  BLUE_EXPRESS = 'Blue Express'
}

/**
* @description simula el modelo de la tabla  PaymentOption disponibles de manera singular
*/

export interface ShippingOption {
  method: ShippingMethod;
  charge: number;
  label: string;
}

/**
* @description simula el modelo de la tabla  PaymentConfig, la cual define la combinaciones de las Payment options que tiene cada marca
*/

export interface ShippingConfig {
options: ShippingOption[];
defaultMethod?: ShippingMethod;
additionalInfo?: string;
}

export enum FeeTypes {
    PERCENTAGE="%",
    FIXED="$"
}

export enum Fees {
    GIFT_CARD=PaymentMethod.GIFT_CARD,
    BANK_TRANSFER=PaymentMethod.BANK_TRANSFER,
    HOME_PICKUP=ShippingMethod.HOME_PICKUP,
    LAUNDRY="laundry requirement"
}

export interface ServiceFees {
    name:string
    type:FeeTypes
    amount?:number
    description:string
}





export interface BrandSettings { 
  brandId:string;
  payment: PaymentConfig;
  shipping: ShippingConfig;
  only_santiago:boolean;
  service_fees:ServiceFees;
}
