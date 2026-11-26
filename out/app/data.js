// STATLAS data index: the one place the views import their figures from.
// Every number used by the site is embedded in the three data-*.js modules.

import { population, ageShares, dependency, prefectures, regions, densityOf } from './data-population.js';
import { gdp, inflation, unemployment, trade, sectors } from './data-economy.js';
import { lifeExpectancy, births, deaths, vital, marriages, medianAge } from './data-society.js';

export {
  population, ageShares, dependency, prefectures, regions, densityOf,
  gdp, inflation, unemployment, trade, sectors,
  lifeExpectancy, births, deaths, vital, marriages, medianAge,
};

export const facts = {
  population: 123.0,
  gdp: 4.21,
  inflation: 2.7,
  unemployment: 2.5,
  life: 84.1,
};

export const kpis = [
  {
    label: 'Population', value: '123.0', unit: 'M', note: 'resident population',
    trend: population.slice(-10).map((d) => d.value), source: 'Statistics Bureau, 2024',
  },
  {
    label: 'GDP', value: '$4.21', unit: 'T', note: 'current US dollars',
    trend: gdp.map((d) => d.value), source: 'World Bank, 2023',
  },
  {
    label: 'Inflation', value: '2.7', unit: '%', note: 'CPI, annual change',
    trend: inflation.map((d) => d.value), source: 'MIC, 2024',
  },
  {
    label: 'Unemployment', value: '2.5', unit: '%', note: 'annual average',
    trend: unemployment.map((d) => d.value), source: 'MIC, 2024',
  },
  {
    label: 'Life expectancy', value: '84.1', unit: 'yrs', note: 'at birth, both sexes',
    trend: lifeExpectancy.slice(-10).map((d) => d.value), source: 'WHO, 2023',
  },
];

export const windowed = (series, start, end) => series.filter((d) => d.year >= start && d.year <= end);
