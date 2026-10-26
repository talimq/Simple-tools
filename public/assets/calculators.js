export const clamp = (n, min, max) => Math.min(Math.max(Number(n) || 0, min), max);

export function calcFoodCost(input) {
  const ingredients = (input.ingredients || []).reduce((s, r) => s + Math.max(0, Number(r.cost) || 0), 0);
  const waste = clamp(input.wastePct, 0, 99.99) / 100;
  const other = Math.max(0, Number(input.otherCost) || 0);
  const sale = Math.max(0, Number(input.salePrice) || 0);
  const target = clamp(input.targetPct, 0.01, 99.99) / 100;
  const vat = clamp(input.vatPct, 0, 100) / 100;
  const costAfterWaste = waste < 1 ? ingredients / (1 - waste) : Infinity;
  const realCost = costAfterWaste + other;
  return {ingredients,costAfterWaste,realCost,foodCostPct:sale>0?realCost/sale*100:0,grossMargin:sale-realCost,recommendedPrice:realCost/target,saleWithoutVat:sale/(1+vat)};
}

export function calcJobPricing(input) {
  const rows=input.rows||[]; const byType={material:0,labor:0,travel:0,subcontract:0,other:0};
  for(const r of rows){const amount=Math.max(0,Number(r.qty)||0)*Math.max(0,Number(r.unitCost)||0);if(byType[r.type]===undefined)byType.other+=amount;else byType[r.type]+=amount;}
  const baseCost=Object.values(byType).reduce((a,b)=>a+b,0); const contingency=baseCost*clamp(input.contingencyPct,0,100)/100; const realCost=baseCost+contingency; const margin=clamp(input.marginPct,0,99.99)/100; const priceBeforeTax=realCost/(1-margin); const tax=priceBeforeTax*clamp(input.taxPct,0,100)/100; const finalPrice=priceBeforeTax+tax; const profit=priceBeforeTax-realCost; const markupPct=realCost>0?profit/realCost*100:0;
  return {byType,baseCost,contingency,realCost,profit,markupPct,priceBeforeTax,tax,finalPrice};
}

export function calcProductMargin(input){const sale=Math.max(0,Number(input.salePrice)||0);const product=Math.max(0,Number(input.productCost)||0);const fixed=Math.max(0,Number(input.fixedFee)||0);const pctFee=sale*clamp(input.percentFee,0,100)/100;const shipping=Math.max(0,Number(input.shipping)||0);const packaging=Math.max(0,Number(input.packaging)||0);const ads=Math.max(0,Number(input.ads)||0);const returnProbability=clamp(input.returnPct,0,100)/100;const returnCost=Math.max(0,Number(input.returnCost)||0)*returnProbability;const variableCost=product+fixed+pctFee+shipping+packaging+ads+returnCost;const profit=sale-variableCost;const marginPct=sale>0?profit/sale*100:0;const markupPct=variableCost>0?profit/variableCost*100:0;const target=clamp(input.targetMarginPct,0,99.99)/100;const nonSaleCosts=product+fixed+shipping+packaging+ads+returnCost;const feeRate=clamp(input.percentFee,0,100)/100;const denom=1-feeRate-target;const targetPrice=denom>0?nonSaleCosts/denom:Infinity;return {pctFee,returnCost,variableCost,profit,marginPct,markupPct,targetPrice,difference:targetPrice-sale};}

export function calcRentalYield(input){const investment=[input.purchase,input.purchaseCosts,input.renovation,input.furnishing].reduce((s,v)=>s+Math.max(0,Number(v)||0),0);const income=Math.max(0,Number(input.monthlyRent)||0)*clamp(input.paidMonths,0,12);const operatingCosts=[input.community,input.propertyTax,input.insurance,input.maintenance,input.otherCosts].reduce((s,v)=>s+Math.max(0,Number(v)||0),0);const noi=income-operatingCosts;const financing=Math.max(0,Number(input.annualFinancing)||0);const cashFlow=noi-financing;return {investment,income,operatingCosts,noi,cashFlow,grossYieldPct:investment>0?income/investment*100:0,netYieldPct:investment>0?noi/investment*100:0};}

export function calcEmployeeCost(input){const salary=Math.max(0,Number(input.salary)||0);const charges=salary*clamp(input.chargesPct,0,100)/100;const extras=[input.benefits,input.insurance,input.equipment,input.licenses,input.training,input.onboarding,input.other].reduce((s,v)=>s+Math.max(0,Number(v)||0),0);const annual=salary+charges+extras;return {salary,charges,extras,annual,monthly:annual/12,additionalPct:salary>0?(annual/salary-1)*100:0};}

export function normalizeFamilyExpense(row){const amount=Math.max(0,Number(row.amount)||0);if(row.periodicity==='annual')return {monthly:amount/12,annual:amount};if(row.periodicity==='oneoff')return {monthly:amount/12,annual:amount};if(row.periodicity==='months'){const months=clamp(row.months,0,12);return {monthly:amount*months/12,annual:amount*months};}return {monthly:amount,annual:amount*12};}

export function calcFamilyExpenses(input){const children=input.children||[];const perChild=children.map(child=>{const items=(child.expenses||[]).map(normalizeFamilyExpense);return {monthly:items.reduce((s,x)=>s+x.monthly,0),annual:items.reduce((s,x)=>s+x.annual,0)}});const monthly=perChild.reduce((s,x)=>s+x.monthly,0);const annual=perChild.reduce((s,x)=>s+x.annual,0);const aIncome=Math.max(0,Number(input.aIncome)||0),bIncome=Math.max(0,Number(input.bIncome)||0);const totalIncome=aIncome+bIncome;const aShare=totalIncome>0?aIncome/totalIncome:.5,bShare=1-aShare;const aPart=monthly*aShare,bPart=monthly*bShare;const aAvailableBefore=aIncome-Math.max(0,Number(input.aFixed)||0);const bAvailableBefore=bIncome-Math.max(0,Number(input.bFixed)||0);return {perChild,monthly,annual,aShare,bShare,aPart,bPart,aAvailableBefore,bAvailableBefore,aAvailableAfter:aAvailableBefore-aPart,bAvailableAfter:bAvailableBefore-bPart};}

export function calcRenovation(input){const byType={materials:0,labor:0,subcontract:0,transport:0,other:0};for(const r of input.rows||[]){const amount=Math.max(0,Number(r.qty)||0)*Math.max(0,Number(r.unitCost)||0);if(byType[r.type]===undefined)byType.other+=amount;else byType[r.type]+=amount;}const base=Object.values(byType).reduce((a,b)=>a+b,0);const contingency=base*clamp(input.contingencyPct,0,100)/100;const totalCost=base+contingency;const margin=clamp(input.marginPct,0,99.99)/100;const sellPrice=totalCost/(1-margin);const vat=sellPrice*clamp(input.vatPct,0,100)/100;return {byType,base,contingency,totalCost,sellPrice,vat,total:sellPrice+vat,profit:sellPrice-totalCost};}
