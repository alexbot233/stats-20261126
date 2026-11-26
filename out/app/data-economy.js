// Economic indicators embedded for STATLAS. All values are published figures,
// kept with their source and reference year beside every chart on the site.

// GDP at current US dollars, trillions (World Bank, World Development Indicators).
export const gdp = [
  { year: 2015, value: 4.44 },
  { year: 2016, value: 5.00 },
  { year: 2017, value: 5.06 },
  { year: 2018, value: 5.06 },
  { year: 2019, value: 5.11 },
  { year: 2020, value: 5.06 },
  { year: 2021, value: 5.38 },
  { year: 2022, value: 4.93 },
  { year: 2023, value: 4.21 },
];

// Consumer price index, all items, annual percentage change (MIC).
export const inflation = [
  { year: 2015, value: 0.8 },
  { year: 2016, value: -0.1 },
  { year: 2017, value: 0.5 },
  { year: 2018, value: 0.7 },
  { year: 2019, value: 0.5 },
  { year: 2020, value: -0.2 },
  { year: 2021, value: -0.2 },
  { year: 2022, value: 2.5 },
  { year: 2023, value: 2.8 },
  { year: 2024, value: 2.7 },
];

// Unemployment rate, annual average, percent (MIC, Labour Force Survey).
export const unemployment = [
  { year: 2015, value: 3.4 },
  { year: 2016, value: 3.1 },
  { year: 2017, value: 2.8 },
  { year: 2018, value: 2.4 },
  { year: 2019, value: 2.4 },
  { year: 2020, value: 2.8 },
  { year: 2021, value: 3.0 },
  { year: 2022, value: 2.6 },
  { year: 2023, value: 2.5 },
  { year: 2024, value: 2.5 },
];

// Merchandise trade in 2023, trillion yen (Ministry of Finance).
export const trade = { exports: 97.0, imports: 110.1, balance: -13.1, year: 2023, source: 'Ministry of Finance' };

// Approximate shares of gross value added (World Bank / Cabinet Office, 2023).
export const sectors = [
  { label: 'Services', pct: 70, color: '#d94f30' },
  { label: 'Industry', pct: 28, color: '#56b1a4' },
  { label: 'Agriculture', pct: 1, color: '#e3b862' },
  { label: 'Other', pct: 1, color: '#4a5c78' },
];
