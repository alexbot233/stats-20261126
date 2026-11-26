// Society indicators embedded for STATLAS: health, births, deaths and families.
// Sources: WHO World Health Statistics; Ministry of Health, Labour and Welfare (MHLW);
// Statistics Bureau of Japan.

// Life expectancy at birth, both sexes, years (WHO, World Health Statistics).
export const lifeExpectancy = [
  { year: 2010, value: 82.9 },
  { year: 2011, value: 82.7 },
  { year: 2012, value: 83.0 },
  { year: 2013, value: 83.3 },
  { year: 2014, value: 83.6 },
  { year: 2015, value: 83.8 },
  { year: 2016, value: 84.0 },
  { year: 2017, value: 84.1 },
  { year: 2018, value: 84.2 },
  { year: 2019, value: 84.3 },
  { year: 2020, value: 84.5 },
  { year: 2021, value: 84.4 },
  { year: 2022, value: 84.0 },
  { year: 2023, value: 84.1 },
];

// Annual births and deaths, thousands (MHLW, Vital Statistics).
export const births = [
  { year: 2015, value: 1006 },
  { year: 2016, value: 984 },
  { year: 2017, value: 947 },
  { year: 2018, value: 913 },
  { year: 2019, value: 865 },
  { year: 2020, value: 841 },
  { year: 2021, value: 812 },
  { year: 2022, value: 771 },
  { year: 2023, value: 727 },
];

export const deaths = [
  { year: 2015, value: 1231 },
  { year: 2016, value: 1275 },
  { year: 2017, value: 1269 },
  { year: 2018, value: 1325 },
  { year: 2019, value: 1382 },
  { year: 2020, value: 1387 },
  { year: 2021, value: 1439 },
  { year: 2022, value: 1505 },
  { year: 2023, value: 1575 },
];

export const vital = {
  births: 727,
  deaths: 1575,
  naturalChange: -848,
  year: 2023,
  source: 'MHLW, 2023',
};

export const marriages = { value: 474, year: 2023, source: 'MHLW, 2023' };
export const medianAge = { value: 49.9, year: 2023, source: 'Statistics Bureau, 2023' };
