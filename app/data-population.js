// National and prefectural population figures embedded for the STATLAS dashboard.
// Sources: Statistics Bureau of Japan, Population Estimates (annual, 1 October);
// land areas from the Geospatial Information Authority of Japan.

// Total resident population, millions, 2000-2024.
export const population = [
  { year: 2000, value: 126.9 },
  { year: 2001, value: 127.3 },
  { year: 2002, value: 127.4 },
  { year: 2003, value: 127.6 },
  { year: 2004, value: 127.7 },
  { year: 2005, value: 127.8 },
  { year: 2006, value: 127.8 },
  { year: 2007, value: 127.7 },
  { year: 2008, value: 127.6 },
  { year: 2009, value: 127.4 },
  { year: 2010, value: 128.1 },
  { year: 2011, value: 127.8 },
  { year: 2012, value: 127.6 },
  { year: 2013, value: 127.4 },
  { year: 2014, value: 127.2 },
  { year: 2015, value: 127.1 },
  { year: 2016, value: 127.0 },
  { year: 2017, value: 126.7 },
  { year: 2018, value: 126.4 },
  { year: 2019, value: 126.2 },
  { year: 2020, value: 125.8 },
  { year: 2021, value: 125.3 },
  { year: 2022, value: 124.9 },
  { year: 2023, value: 124.4 },
  { year: 2024, value: 123.0 },
];

// Share of the total population by broad age group (Statistics Bureau, 2023).
export const ageShares = [
  { label: '0-14', detail: 'children', pct: 11.3, color: '#56b1a4' },
  { label: '15-64', detail: 'working age', pct: 59.4, color: '#d94f30' },
  { label: '65+', detail: 'older adults', pct: 29.3, color: '#e3b862' },
];

// Dependency ratios: dependants per 100 people of working age (Statistics Bureau, 2023).
export const dependency = { total: 68.4, old: 49.3, child: 19.0 };

// Prefectures: population in millions (2023 estimates, rounded), land area in km².
export const prefectures = [
  { name: 'Hokkaido', region: 'Hokkaido', capital: 'Sapporo', pop: 5.1, area: 83424 },
  { name: 'Aomori', region: 'Tohoku', capital: 'Aomori', pop: 1.2, area: 9644 },
  { name: 'Iwate', region: 'Tohoku', capital: 'Morioka', pop: 1.2, area: 15275 },
  { name: 'Miyagi', region: 'Tohoku', capital: 'Sendai', pop: 2.3, area: 7282 },
  { name: 'Akita', region: 'Tohoku', capital: 'Akita', pop: 0.9, area: 11637 },
  { name: 'Yamagata', region: 'Tohoku', capital: 'Yamagata', pop: 1.0, area: 9323 },
  { name: 'Fukushima', region: 'Tohoku', capital: 'Fukushima', pop: 1.8, area: 13784 },
  { name: 'Ibaraki', region: 'Kanto', capital: 'Mito', pop: 2.8, area: 10476 },
  { name: 'Tochigi', region: 'Kanto', capital: 'Utsunomiya', pop: 1.9, area: 6443 },
  { name: 'Gunma', region: 'Kanto', capital: 'Maebashi', pop: 1.9, area: 6362 },
  { name: 'Saitama', region: 'Kanto', capital: 'Saitama', pop: 7.3, area: 3798 },
  { name: 'Chiba', region: 'Kanto', capital: 'Chiba', pop: 6.3, area: 5157 },
  { name: 'Tokyo', region: 'Kanto', capital: 'Tokyo', pop: 14.1, area: 2194 },
  { name: 'Kanagawa', region: 'Kanto', capital: 'Yokohama', pop: 9.2, area: 2416 },
  { name: 'Niigata', region: 'Chubu', capital: 'Niigata', pop: 2.2, area: 12584 },
  { name: 'Toyama', region: 'Chubu', capital: 'Toyama', pop: 1.0, area: 4247 },
  { name: 'Ishikawa', region: 'Chubu', capital: 'Kanazawa', pop: 1.1, area: 4186 },
  { name: 'Fukui', region: 'Chubu', capital: 'Fukui', pop: 0.8, area: 4189 },
  { name: 'Yamanashi', region: 'Chubu', capital: 'Kofu', pop: 0.8, area: 4465 },
  { name: 'Nagano', region: 'Chubu', capital: 'Nagano', pop: 2.0, area: 13585 },
  { name: 'Gifu', region: 'Chubu', capital: 'Gifu', pop: 1.9, area: 10621 },
  { name: 'Shizuoka', region: 'Chubu', capital: 'Shizuoka', pop: 3.6, area: 7779 },
  { name: 'Aichi', region: 'Chubu', capital: 'Nagoya', pop: 7.5, area: 5173 },
  { name: 'Mie', region: 'Chubu', capital: 'Tsu', pop: 1.7, area: 5774 },
  { name: 'Shiga', region: 'Kansai', capital: 'Otsu', pop: 1.4, area: 4018 },
  { name: 'Kyoto', region: 'Kansai', capital: 'Kyoto', pop: 2.5, area: 4613 },
  { name: 'Osaka', region: 'Kansai', capital: 'Osaka', pop: 8.8, area: 1899 },
  { name: 'Hyogo', region: 'Kansai', capital: 'Kobe', pop: 5.4, area: 8393 },
  { name: 'Nara', region: 'Kansai', capital: 'Nara', pop: 1.2, area: 3631 },
  { name: 'Wakayama', region: 'Kansai', capital: 'Wakayama', pop: 0.9, area: 4725 },
  { name: 'Tottori', region: 'Chugoku', capital: 'Tottori', pop: 0.6, area: 3507 },
  { name: 'Shimane', region: 'Chugoku', capital: 'Matsue', pop: 0.7, area: 6708 },
  { name: 'Okayama', region: 'Chugoku', capital: 'Okayama', pop: 1.9, area: 7009 },
  { name: 'Hiroshima', region: 'Chugoku', capital: 'Hiroshima', pop: 2.8, area: 8478 },
  { name: 'Yamaguchi', region: 'Chugoku', capital: 'Yamaguchi', pop: 1.3, area: 6113 },
  { name: 'Tokushima', region: 'Shikoku', capital: 'Tokushima', pop: 0.7, area: 4146 },
  { name: 'Kagawa', region: 'Shikoku', capital: 'Takamatsu', pop: 0.9, area: 1877 },
  { name: 'Ehime', region: 'Shikoku', capital: 'Matsuyama', pop: 1.3, area: 5676 },
  { name: 'Kochi', region: 'Shikoku', capital: 'Kochi', pop: 0.7, area: 7104 },
  { name: 'Fukuoka', region: 'Kyushu', capital: 'Fukuoka', pop: 5.1, area: 4232 },
  { name: 'Saga', region: 'Kyushu', capital: 'Saga', pop: 0.8, area: 2440 },
  { name: 'Nagasaki', region: 'Kyushu', capital: 'Nagasaki', pop: 1.3, area: 4130 },
  { name: 'Kumamoto', region: 'Kyushu', capital: 'Kumamoto', pop: 1.7, area: 7409 },
  { name: 'Oita', region: 'Kyushu', capital: 'Oita', pop: 1.1, area: 6340 },
  { name: 'Miyazaki', region: 'Kyushu', capital: 'Miyazaki', pop: 1.1, area: 6684 },
  { name: 'Kagoshima', region: 'Kyushu', capital: 'Kagoshima', pop: 1.6, area: 9187 },
  { name: 'Okinawa', region: 'Kyushu', capital: 'Naha', pop: 1.5, area: 2281 },
];

export const regions = ['All regions', 'Hokkaido', 'Tohoku', 'Kanto', 'Chubu', 'Kansai', 'Chugoku', 'Shikoku', 'Kyushu'];

export const densityOf = (p) => (p.pop * 1e6) / p.area;
