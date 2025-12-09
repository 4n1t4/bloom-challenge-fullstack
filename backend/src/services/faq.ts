import { Brand } from "@/models/brand";
import { FAQQuestion } from "@/models/faq";
import { PaymentMethod, ShippingMethod } from "@/models/brand-setting";

/**
 * Servicio para generar FAQs basándose en la configuración de una marca
 * 
 * Este servicio procesa la configuración de la marca y genera las FAQs
 * aplicando toda la lógica de negocio. El frontend solo recibe las FAQs
 * ya procesadas sin necesidad de ejecutar lógica.
 */
const FAQService = {
  /**
   * Genera todas las FAQs para una marca basándose en su configuración
   * 
   * @param brand - Marca con su configuración
   * @returns Array de FAQs procesadas
   */
  generateAllFAQs(brand: Brand): FAQQuestion[] {
    if (!brand.settings) {
      return [];
    }

    const faqs: FAQQuestion[] = [];
    let order = 1;

    // FAQ 1: Publicación de productos (siempre presente)
    faqs.push(this.createPublishProductFAQ(order++));

    // FAQ 2: Proceso de envío
    faqs.push(this.createShippingFAQ(brand.settings.shipping, order++));

    // FAQ 3: Proceso de pago
    faqs.push(this.createPaymentFAQ(brand.settings.payment, order++));

    // FAQ 4: Cobros adicionales
    faqs.push(this.createAdditionalFeesFAQ(brand, order++));

    // FAQ 5: Política de cupones (solo si hay gift card)
    const hasGiftCard = brand.settings.payment.options.some(
      opt => opt.method === PaymentMethod.GIFT_CARD
    );
    if (hasGiftCard) {
      faqs.push(this.createCouponPolicyFAQ(brand.url, order++));
    }

    return faqs;
  },

  createPublishProductFAQ(order: number): FAQQuestion {
    return {
      id: 'publish-product',
      question: '¿Cómo puedo publicar un producto para la venta?',
      answer: '¡Publicar tu producto es muy fácil! Simplemente haz clic en "Vender", crea una cuenta y sigue el proceso de publicación. Una vez que completes el formulario de venta, la publicación será revisada por nuestro equipo y en un plazo máximo de 24 horas, te avisaremos si está aprobada o rechazada. Después de ser revisada y aprobada, se hará pública. Si hay algún problema, recibirás un correo electrónico pidiendo hacer cambios antes de que pueda ser aceptada.',
      order,
    };
  },

  createShippingFAQ(shipping: any, order: number): FAQQuestion {
    let answer = 'Cuando alguien compre tu producto, recibirás un correo electrónico con las instrucciones para confirmar la venta, allí podrás ';

    if (shipping.options.length === 0) {
      answer += 'definir el método de envío que utilizarás para entregar el producto al comprador.';
    } else if (shipping.options.length === 1) {
      answer += `${shipping.options[0].label}.`;
    } else {
      answer += 'seleccionar el método de envío entre las siguientes opciones:\n\n';
      shipping.options.forEach((option: any) => {
        answer += `• ${option.label}\n`;
      });
    }

    return {
      id: 'shipping-process',
      question: '¿Cómo envío mi artículo después de que alguien lo compra?',
      answer,
      order,
    };
  },

  createPaymentFAQ(payment: any, order: number): FAQQuestion {
    let answer = 'Una vez que tu artículo se entrega y es recibido conforme (manualmente por el comprador o automáticamente después de 72 horas desde que se entregó el producto), recibirás un correo electrónico';

    if (payment.options.length === 1) {
      const option = payment.options[0];
      answer += ` indicando que el pago será ${option.label.toLowerCase()}.`;
    } else {
      answer += ' preguntándote cómo te gustaría recibir tu pago:';
      const descriptions = payment.options.map((opt: any) => opt.label);

      if (descriptions.length === 2) {
        answer += ` ${descriptions.join(' o ')}.`;
      } else {
        answer += ` ${descriptions.slice(0, -2).join(', ')}, ${descriptions.slice(-2).join(' o ')}.`;
      }
    }

    return {
      id: 'payment-timing',
      question: '¿Cómo y cuándo recibo el pago?',
      answer,
      order,
    };
  },

  createAdditionalFeesFAQ(brand: Brand, order: number): FAQQuestion {
    const { payment, shipping, service_fees } = brand.settings!;
    const paymentLines: string[] = [];

    const giftCardOption = payment.options.find((opt: any) => opt.method === PaymentMethod.GIFT_CARD);
    const transferOption = payment.options.find((opt: any) => opt.method === PaymentMethod.BANK_TRANSFER);

    if (giftCardOption && transferOption) {
      const transferPercentage = 100 - transferOption.percentage;
      const feePercentage = transferOption.percentage;
      const exampleAmount = 100000;
      const receivedAmount = exampleAmount * (1 - feePercentage / 100);

      paymentLines.push(
        `Como vendedor/a tienes dos opciones para recibir tu pago: el ${transferPercentage}% del valor de la venta mediante transferencia bancaria o el 100% en forma de una gift card para volver comprar en el Ecommerce oficial de la marca.`
      );
      paymentLines.push(
        `Si eliges gift card, ¡no hay tarifa! es decir, vender un artículo por $${exampleAmount.toLocaleString()} te da una gift card por $${exampleAmount.toLocaleString()}. Esta será enviada a tu mail una vez que el pedido haya sido recibido conforme por el comprador.`
      );
      paymentLines.push(
        `Si eliges efectivo, la tarifa es del ${feePercentage}%. Es decir, vender un artículo por $${exampleAmount.toLocaleString()} te da $${receivedAmount.toLocaleString()} en efectivo. Esta transferencia la realizamos cuando el pedido ha sido recibido conforme por el comprador.`
      );
    } else if (giftCardOption) {
      paymentLines.push(
        'Como vendedor/a recibirás el 100% del valor de la venta en forma de una gift card para volver comprar en el Ecommerce oficial de la marca.'
      );
      paymentLines.push(
        'No hay tarifa, recibirás una gift card por el valor íntegro una vez que el pedido haya sido recibido conforme por el comprador.'
      );
    } else if (transferOption) {
      const receivedPercentage = 100 - transferOption.percentage;
      const feePercentage = transferOption.percentage;
      const exampleAmount = 100000;
      const receivedAmount = exampleAmount * (1 - feePercentage / 100);

      paymentLines.push(
        `Como vendedor/a recibirás el ${receivedPercentage}% del valor de la venta mediante transferencia bancaria.`
      );
      paymentLines.push(
        `La tarifa es del ${feePercentage}%. Es decir, vender un artículo por $${exampleAmount.toLocaleString()} te da $${receivedAmount.toLocaleString()} en efectivo. Esta transferencia la realizamos cuando el pedido ha sido recibido conforme por el comprador.`
      );
    }

    const homePickupOption = shipping.options.find(
      (opt: any) => opt.method === ShippingMethod.HOME_PICKUP
    );

    if (homePickupOption) {
      paymentLines.push(
        `En ambos casos, si se eligió el retiro a domicilio de tus productos, se descontarán los $${homePickupOption.charge.toLocaleString()} por el costo de ese retiro.`
      );
    }

    if (service_fees?.description) {
      paymentLines.push(service_fees.description);
    }

    return {
      id: 'additional-fees',
      question: '¿Hay cobros adicionales por vender mi producto por acá?',
      answer: paymentLines.join('\n\n'),
      order,
    };
  },

  createCouponPolicyFAQ(brandUrl: string, order: number): FAQQuestion {
    return {
      id: 'coupon-policy',
      question: 'Política de uso de cupones',
      answer: `Los cupones que recibas por la venta de tus productos tienen las siguientes restricciones: a. Se pueden utilizar únicamente para compras en el sitio web ${brandUrl}. b. Tiene un tiempo máximo para ser utilizado de 6 meses. c. Está restringido a un monto mínimo de pedido para que pueda utilizarse en el ecommerce. El monto mínimo está definido por el monto del cupón + $1.000 CLP.`,
      order,
    };
  },
};

export default FAQService;

