export const seoContent = {
  food: {
    es: {
      formula: 'Coste real por ración = suma de costes de ingredientes ÷ (1 − merma / 100) + otros costes. Food cost (%) = coste real ÷ precio de venta × 100. Precio objetivo = coste real ÷ (food cost objetivo / 100).',
      example: 'Si los ingredientes de una ración cuestan 3 €, no hay merma ni otros costes y buscas un food cost del 30 %, el precio objetivo es 10 €. A ese precio, el margen bruto por ración es 7 €.',
      steps: ['Introduce el coste de la cantidad de cada ingrediente utilizada en una ración.', 'Añade merma y otros costes por ración. Indica el precio de venta actual y el porcentaje de food cost objetivo.', 'Pulsa Calcular para comparar el coste real, el food cost actual y el precio objetivo.'],
      faq: [
        ['¿El campo cantidad multiplica el coste?', 'No. La cantidad es una referencia. En Coste usado debes introducir el coste total de esa cantidad por ración; no el precio de un kilo o de una unidad de compra.'],
        ['¿El margen bruto equivale al beneficio del restaurante?', 'No. Es la diferencia entre el precio de venta introducido y el coste de la ración. Los gastos generales, la fiscalidad y otros costes no incluidos pueden reducir el beneficio final.']
      ]
    },
    en: {
      formula: 'Real cost per serving = sum of ingredient costs ÷ (1 − waste / 100) + other costs. Food cost (%) = real cost ÷ selling price × 100. Target price = real cost ÷ (target food cost / 100).',
      example: 'If ingredients for one serving cost €3, waste and other costs are zero, and your target food cost is 30%, the target price is €10. At that price, gross margin per serving is €7.',
      steps: ['Enter the cost of the quantity of each ingredient used in one serving.', 'Add waste and other per-serving costs, then enter the current selling price and target food cost percentage.', 'Select Calculate to compare real cost, current food cost and target price.'],
      faq: [
        ['Does the quantity field multiply the cost?', 'No. Quantity is a reference. Cost used must contain the total cost of that quantity per serving, rather than the price of a kilogram or purchasing unit.'],
        ['Is gross margin the restaurant’s profit?', 'No. It is the entered selling price minus the serving cost. Overheads, taxes and costs not included in the inputs can reduce final profit.']
      ]
    }
  },
  job: {
    es: {
      formula: 'Coste base = suma de cantidad × coste unitario de cada partida. Coste real = coste base × (1 + imprevistos / 100). Precio antes de impuestos = coste real ÷ (1 − margen / 100).',
      example: 'Un trabajo con 100 € de coste base, 10 % de imprevistos, 25 % de margen sobre venta y 21 % de impuesto da un precio final de 177,47 €. Antes de impuestos son 146,67 €.',
      steps: ['Añade materiales, mano de obra, desplazamientos, subcontratas y otros costes.', 'Indica las cantidades, los costes unitarios, los imprevistos y el margen deseado.', 'Introduce el impuesto aplicable y calcula el precio final.'],
      faq: [
        ['¿Un margen del 25 % es sumar un 25 % al coste?', 'No. El margen se calcula sobre el precio de venta. Con un coste de 100 € y sin imprevistos ni impuestos, un margen del 25 % exige vender a 133,33 €. El recargo o markup en ese caso es del 33,33 %.'],
        ['¿Qué coste por hora debo introducir?', 'Introduce tu coste real por hora, con los gastos que quieras cubrir. La herramienta no fija tarifas profesionales ni decide por ti qué margen acepta tu mercado.']
      ]
    },
    en: {
      formula: 'Base cost = sum of quantity × unit cost for every line item. Real cost = base cost × (1 + contingency / 100). Price before tax = real cost ÷ (1 − margin / 100).',
      example: 'A job with €100 base cost, 10% contingency, 25% margin on sale and 21% tax has a final price of €177.47. The price before tax is €146.67.',
      steps: ['Add materials, labour, travel, subcontracting and other costs.', 'Enter quantities, unit costs, contingency and your desired margin.', 'Set the applicable tax and calculate the final price.'],
      faq: [
        ['Is a 25% margin the same as adding 25% to cost?', 'No. Margin is measured against the selling price. A €100 cost with no contingency or tax needs a €133.33 selling price for a 25% margin. The equivalent markup is 33.33%.'],
        ['Which hourly cost should I enter?', 'Use your real hourly cost, including the expenses you want to cover. The calculator does not set professional rates or decide which margin your market will accept.']
      ]
    }
  },
  margin: {
    es: {
      formula: 'Beneficio por venta = precio de venta − costes variables. Margen (%) = beneficio ÷ precio de venta × 100. Precio objetivo = costes no ligados al precio ÷ (1 − comisión porcentual / 100 − margen objetivo / 100).',
      example: 'Si vendes a 100 €, el producto cuesta 50 € y la comisión es del 10 %, sin otros costes, el beneficio es 40 € y el margen es del 40 %. Para un margen objetivo del 20 %, el precio objetivo es 71,43 €.',
      steps: ['Introduce el coste del producto, el precio de venta y las comisiones.', 'Añade envío, embalaje, publicidad y el coste esperado de las devoluciones.', 'Calcula el beneficio actual y el precio necesario para alcanzar tu margen objetivo.'],
      faq: [
        ['¿Cómo se incluyen las devoluciones?', 'El coste esperado es la probabilidad de devolución multiplicada por el coste medio de una devolución. Por ejemplo, un 5 % de probabilidad y un coste de 6 € añaden 0,30 € por venta.'],
        ['¿Por qué el precio objetivo puede aparecer como un guion?', 'Si la comisión porcentual más el margen objetivo alcanza o supera el 100 %, no existe un precio finito que cumpla ese objetivo con este modelo. Revisa ambas cifras.']
      ]
    },
    en: {
      formula: 'Profit per sale = selling price − variable costs. Margin (%) = profit ÷ selling price × 100. Target price = costs not tied to price ÷ (1 − percentage fee / 100 − target margin / 100).',
      example: 'If the selling price is €100, the product costs €50 and the fee is 10%, with no other costs, profit is €40 and margin is 40%. For a 20% target margin, the target price is €71.43.',
      steps: ['Enter product cost, selling price and fixed or percentage fees.', 'Add shipping, packaging, advertising and the expected cost of returns.', 'Calculate current profit and the price needed to reach your target margin.'],
      faq: [
        ['How are returns included?', 'Expected return cost is return probability multiplied by the average cost of a return. A 5% probability and a €6 return cost add €0.30 per sale.'],
        ['Why can the target price show a dash?', 'If the percentage fee plus target margin reaches or exceeds 100%, no finite price can meet that target in this model. Check both percentages.']
      ]
    }
  },
  rental: {
    es: {
      formula: 'Inversión total = compra + gastos de compra + reforma + mobiliario. Ingresos anuales = alquiler mensual × meses cobrados. Rentabilidad neta (%) = (ingresos anuales − gastos operativos anuales) ÷ inversión total × 100.',
      example: 'Con 100.000 € de inversión total, un alquiler de 1.000 € durante 12 meses y 2.000 € de gastos operativos anuales, la rentabilidad bruta es del 12 % y la neta del 10 %, antes de financiación e impuestos no incluidos.',
      steps: ['Introduce la inversión completa: inmueble, compra, reforma y mobiliario.', 'Indica el alquiler, los meses que esperas cobrar y todos los gastos anuales.', 'Añade la financiación anual para ver su efecto en el cash flow.'],
      faq: [
        ['¿La hipoteca reduce la rentabilidad neta mostrada?', 'La financiación se resta del resultado operativo para calcular el cash flow. La rentabilidad neta mostrada mide el inmueble antes de financiación, sobre la inversión total.'],
        ['¿Incluye el IRPF o la revalorización del piso?', 'No. La calculadora no incorpora una liquidación fiscal ni la futura revalorización. Incluye en los gastos operativos únicamente los importes que quieras modelizar.']
      ]
    },
    en: {
      formula: 'Total investment = purchase + purchase costs + renovation + furnishing. Annual income = monthly rent × paid months. Net yield (%) = (annual income − annual operating costs) ÷ total investment × 100.',
      example: 'With €100,000 total investment, €1,000 rent for 12 months and €2,000 annual operating costs, gross yield is 12% and net yield is 10%, before financing and taxes not included.',
      steps: ['Enter the full investment: property, purchase costs, renovation and furnishings.', 'Set rent, expected paid months and annual operating expenses.', 'Add annual financing payments to see their effect on cash flow.'],
      faq: [
        ['Does the mortgage reduce the displayed net yield?', 'Financing is deducted from operating income to calculate cash flow. Displayed net yield measures the property before financing, against total investment.'],
        ['Does this include income tax or property appreciation?', 'No. It does not calculate your tax liability or future appreciation. Only the operating expenses you enter are included.']
      ]
    }
  },
  employee: {
    es: {
      formula: 'Coste anual de empresa = salario bruto anual × (1 + cargas estimadas / 100) + beneficios + seguros + equipo + licencias + formación + selección y otros costes. Coste mensual = coste anual ÷ 12.',
      example: 'Un salario bruto de 30.000 €, unas cargas estimadas del 30 % y 1.000 € de costes adicionales suman 40.000 € anuales para la empresa, equivalentes a 3.333,33 € mensuales.',
      steps: ['Introduce el salario bruto anual y el porcentaje de cargas de tu caso.', 'Añade los costes adicionales como importes anuales, incluidos equipo y formación.', 'Calcula el coste anual, su equivalente mensual y el incremento respecto al salario.'],
      faq: [
        ['¿El porcentaje de cargas es una cotización oficial?', 'No. Es un valor configurable. Debes ajustarlo a tu país, contrato y situación. Esta herramienta no sustituye el cálculo de una nómina.'],
        ['¿Cómo introduzco un equipo que dura varios años?', 'Introduce el coste anual que quieras imputar. Si repartes un equipo de 900 € entre tres años, introduce 300 €; la herramienta no amortiza automáticamente.']
      ]
    },
    en: {
      formula: 'Annual employer cost = gross annual salary × (1 + estimated charges / 100) + benefits + insurance + equipment + licences + training + recruiting and other costs. Monthly cost = annual cost ÷ 12.',
      example: 'A €30,000 gross salary, 30% estimated employer charges and €1,000 additional costs produce a €40,000 annual employer cost, or €3,333.33 per month.',
      steps: ['Enter gross annual salary and the employer charge percentage for your situation.', 'Add extra costs as annual amounts, including equipment and training.', 'Calculate annual cost, its monthly equivalent and the increase over salary.'],
      faq: [
        ['Is the employer charge percentage an official rate?', 'No. It is configurable and must be adjusted to your country, contract and circumstances. This tool does not replace a payroll calculation.'],
        ['How should I enter equipment used over several years?', 'Enter the annual cost you want to allocate. If you spread a €900 device over three years, enter €300; the tool does not depreciate equipment automatically.']
      ]
    }
  },
  family: {
    es: {
      formula: 'Gasto mensual equivalente = gasto anual ÷ 12. Para un gasto mensual durante X meses: importe × X ÷ 12. Aportación A = gasto mensual total × ingresos A ÷ (ingresos A + ingresos B).',
      example: 'Un gasto de 120 € al mes durante 10 meses equivale a 1.200 € anuales y 100 € mensuales al repartirlo entre 12 meses. Si ambos progenitores tienen los mismos ingresos, corresponden 50 € mensuales a cada uno.',
      steps: ['Añade los gastos de uno o dos hijos e indica su periodicidad.', 'Introduce los ingresos netos y los gastos personales fijos de cada progenitor.', 'Calcula el gasto mensual equivalente, el reparto proporcional y el disponible posterior.'],
      faq: [
        ['¿Determina una pensión alimenticia?', 'No. Organiza gastos y calcula una simulación matemática proporcional. No decide obligaciones legales ni sustituye un acuerdo o una resolución judicial.'],
        ['¿Los gastos personales cambian el porcentaje de reparto?', 'No. El porcentaje depende de los ingresos introducidos. Los gastos personales se usan para mostrar el dinero disponible antes y después de la aportación. Si ambos ingresos son cero, el reparto de la simulación es del 50 % para cada uno.']
      ]
    },
    en: {
      formula: 'Monthly equivalent expense = annual expense ÷ 12. For a monthly expense paid for X months: amount × X ÷ 12. Parent A contribution = total monthly expense × A income ÷ (A income + B income).',
      example: 'A €120 monthly expense paid for 10 months equals €1,200 annually and €100 per month when spread over 12 months. Equal parent incomes produce a €50 monthly contribution each.',
      steps: ['Add expenses for one or two children and select their frequency.', 'Enter each parent’s net income and fixed personal expenses.', 'Calculate monthly equivalent cost, proportional shares and remaining available income.'],
      faq: [
        ['Does this determine child support?', 'No. It organizes expenses and produces a proportional mathematical simulation. It does not decide legal obligations or replace an agreement or court order.'],
        ['Do personal expenses change the contribution percentage?', 'No. The percentage depends on the incomes entered. Personal expenses are used to show available income before and after the contribution. If both incomes are zero, the simulation allocates 50% to each parent.']
      ]
    }
  },
  renovation: {
    es: {
      formula: 'Coste base = suma de cantidad × coste unitario de cada partida. Coste total = coste base × (1 + imprevistos / 100). Precio antes de IVA = coste total ÷ (1 − margen / 100). Total = precio antes de IVA × (1 + IVA / 100).',
      example: 'Con 100 € de coste base, 10 % de imprevistos, 20 % de margen sobre venta y 21 % de IVA, el precio antes de IVA es 137,50 € y el presupuesto final es 166,38 €.',
      steps: ['Añade partidas de materiales, mano de obra, subcontratas, transporte u otros costes.', 'Indica cantidades y costes unitarios, y ajusta imprevistos y margen.', 'Aplica el IVA correspondiente y calcula el precio final del presupuesto.'],
      faq: [
        ['¿El margen se aplica sobre el coste o sobre la venta?', 'Sobre el precio de venta antes de IVA. Por eso un margen del 20 % sobre un coste total de 100 € da un precio de 125 €, no de 120 €.'],
        ['¿Incluye automáticamente licencias y tasas?', 'No. Añade una partida con esos costes si deben formar parte del presupuesto. Los importes dependen de los datos que introduzcas; no son tarifas oficiales ni una oferta de un profesional.']
      ]
    },
    en: {
      formula: 'Base cost = sum of quantity × unit cost per line item. Total cost = base cost × (1 + contingency / 100). Price before VAT = total cost ÷ (1 − margin / 100). Final total = price before VAT × (1 + VAT / 100).',
      example: 'A €100 base cost, 10% contingency, 20% margin on sale and 21% VAT produce a €137.50 price before VAT and a €166.38 final estimate.',
      steps: ['Add materials, labour, subcontracting, transport and other line items.', 'Enter quantities and unit costs, then adjust contingency and margin.', 'Apply the relevant VAT rate and calculate the final estimate.'],
      faq: [
        ['Is margin applied to cost or to selling price?', 'To the selling price before VAT. A 20% margin on a €100 total cost requires a €125 price, rather than €120.'],
        ['Are permits and fees included automatically?', 'No. Add a line item for those costs when needed. The result depends on your inputs; it is not an official tariff or a professional quotation.']
      ]
    }
  }
};
