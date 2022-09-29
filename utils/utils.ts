export const epochToDate = (value: number | undefined): string => {
  if (!value) return 'Gagal memuat data';
  const myDate = new Date(value * 1000);
  return myDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// export const epochToDay = (value: number|undefined): string=>{
//   if(!value) return 'G'
// }

export const visibilityStatus = (value: number): string => {
  if (value < 0.05) return 'Dense Fog';
  if (value < 0.2) return 'Thick Fog';
  if (value < 0.5) return 'Moderate Fog';
  if (value < 1.0) return 'Light Fog';
  if (value < 2.0) return 'Thin Fog';
  if (value < 4.0) return 'Haze';
  if (value < 10.0) return 'Light Haze';
  if (value < 20.0) return 'Clear';
  if (value < 50.0) return 'Very Clear';
  if (value >= 50.0) return 'Exceptionally Clear';
  return 'Failed to process data!';
};

export const humidityStatus = (value: number): string => {
  if (value < 25) return 'Too Dry';
  if (value < 30) return 'Fair';
  if (value < 60) return 'Comfortable';
  if (value < 70) return 'Fair';
  if (value <= 100) return 'Too Humid';
  return 'Failed to process data!';
};

export const uvStatus = (value: number): string => {
  if (value < 3) return 'Low';
  if (value < 6) return 'Moderate';
  if (value < 8) return 'High';
  if (value < 11) return 'Very High';
  if (value >= 11) return 'Extreme';
  return 'Failed to process data!';
};

export const windStatus = (value: number): string => {
  if (value < 1) return 'Calm';
  if (value < 5) return 'Light Air';
  if (value < 11) return 'Light Breeze';
  if (value < 19) return 'Gentle Breeze';
  if (value < 28) return 'Moderate Breeze';
  if (value < 38) return 'Fresh Breeze';
  if (value < 49) return 'Strong Breeze';
  if (value < 61) return 'Moderate or Near Gale';
  if (value < 74) return 'Gale or Fresh Gale';
  if (value < 88) return 'Strong Gale';
  if (value < 102) return 'Storm';
  if (value < 117) return 'Violent Storm';
  if (value >= 118) return 'Hurricane';
  return 'Failed to process data!';
};
