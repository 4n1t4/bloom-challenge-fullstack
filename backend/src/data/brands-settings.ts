
import { BrandSettings, FeeTypes, PaymentMethod, ShippingMethod } from "@/models/brand-setting";

const karyn_coo: BrandSettings = {
    brandId:"karyn_coo",
    payment: {
      options: [
        {
          method: PaymentMethod.BANK_TRANSFER,
          percentage: 80,
          label: "en efectivo a travez de una transferencia bancaria"
        },
        {
          method: PaymentMethod.GIFT_CARD,
          percentage: 100,
          label: "en forma de una gift card"
        }
      ],
      defaultMethod: PaymentMethod.GIFT_CARD
    },
    shipping: {
      options: [
        {
          method: ShippingMethod.HOME_PICKUP,
          charge: 2990,
          label: "solicitar una recolección del producto en tu domicilio"
        },
        {
          method: ShippingMethod.BLUE_EXPRESS,
          charge: 0,
          label: "llevar el producto a un punto Blue Express, utilizando una etiqueta de envío proporcionada por nosotros."
        }
      ],
      defaultMethod: ShippingMethod.BLUE_EXPRESS
    },
    only_santiago: false,
    service_fees: {
      name: "tarifas estándar",
      type: FeeTypes.PERCENTAGE,
      amount: 20,
      description: "Las tarifas aplican según el método de pago seleccionado."
    }
};

const andesgear: BrandSettings = {
    brandId:"andesgear",
    payment: {
      options: [
        {
          method: PaymentMethod.BANK_TRANSFER,
          percentage: 80,
          label: "en efectivo a travez de una transferencia bancaria"
        }
      ],
      defaultMethod: PaymentMethod.BANK_TRANSFER
    },
    shipping: {
      options: [
        {
          method: ShippingMethod.BLUE_EXPRESS,
          charge: 0,
          label: "llevar el producto a un punto Blue Express, utilizando una etiqueta de envío proporcionada por nosotros."
        }
      ],
      defaultMethod: ShippingMethod.BLUE_EXPRESS
    },
    only_santiago: false,
    service_fees: {
      name: "tarifa transferencia",
      type: FeeTypes.PERCENTAGE,
      amount: 20,
      description: "La tarifa es del 20% para transferencia bancaria."
  }
};

const roda: BrandSettings = {
    brandId:"roda",
    payment: {
      options: [
        {
          method: PaymentMethod.GIFT_CARD,
          percentage: 100,
          label: "en forma de una gift card"
        }
      ],
      defaultMethod: PaymentMethod.GIFT_CARD
    },
    shipping: {
      options: [
        {
          method: ShippingMethod.HOME_PICKUP,
          charge: 2990,
          label: "solicitar una recolección del producto en tu domicilio"
        },
        {
          method: ShippingMethod.BLUE_EXPRESS,
          charge: 0,
          label: "llevar el producto a un punto Blue Express, utilizando una etiqueta de envío proporcionada por nosotros."
        }
      ],
      defaultMethod: ShippingMethod.HOME_PICKUP
    },
    only_santiago: true,
    service_fees: {
      name: "sin tarifa gift card",
      type: FeeTypes.PERCENTAGE,
      amount: 0,
      description: "No hay tarifa para gift card. Recibirás el 100% del valor de la venta."
    }
};

const kokoro: BrandSettings = {
    brandId:"kokoro",
    payment: {
      options: [
        {
          method: PaymentMethod.BANK_TRANSFER,
          percentage: 80,
          label: "en efectivo a travez de una transferencia bancaria"
        },
        {
          method: PaymentMethod.GIFT_CARD,
          percentage: 100,
          label: "en forma de una gift card"
        }
      ],
      defaultMethod: PaymentMethod.GIFT_CARD,
      additionalInfo: "Kokoro requiere revisión en taller para algunos productos."
    },
    shipping: {
      options: [
        {
          method: ShippingMethod.HOME_PICKUP,
          charge: 2990,
          label: "solicitar una recolección del producto en tu domicilio"
        }
      ],
      defaultMethod: ShippingMethod.HOME_PICKUP,
      additionalInfo: "Los productos pueden requerir servicio de tintorería antes del envío."
    },
    only_santiago: true,
    service_fees: {
      name: "tarifas con tintorería",
      type: FeeTypes.FIXED,
      amount: 0,
      description: "Pueden aplicar costos adicionales por servicios de revisión y tintorería según el tipo de producto."
  }
};

export default [
  karyn_coo,
  andesgear,
  roda,
  kokoro
];
