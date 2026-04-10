// Water requirements in litres/day/acre
const waterRequirements = {
  Rice: { Sowing: 3500, Vegetative: 4800, Flowering: 5200, Harvest: 2000 },
  Wheat: { Sowing: 800, Vegetative: 1200, Flowering: 1500, Harvest: 600 },
  Cotton: { Sowing: 1000, Vegetative: 1800, Flowering: 2400, Harvest: 1200 },
  Sugarcane: { Sowing: 2000, Vegetative: 3500, Flowering: 4000, Harvest: 2500 },
  Vegetables: { Sowing: 1200, Vegetative: 1800, Flowering: 2200, Harvest: 1500 },
  Soybean: { Sowing: 700, Vegetative: 1200, Flowering: 1600, Harvest: 800 },
  Maize: { Sowing: 900, Vegetative: 1500, Flowering: 2000, Harvest: 1000 },
};

// NPK per acre per week in kg
const npkRequirements = {
  Rice: { N: 2.5, P: 1.2, K: 1.5 },
  Wheat: { N: 2.8, P: 1.5, K: 1.2 },
  Cotton: { N: 2.0, P: 1.0, K: 2.0 },
  Sugarcane: { N: 3.5, P: 1.8, K: 3.0 },
  Vegetables: { N: 2.2, P: 1.5, K: 2.5 },
  Soybean: { N: 0.8, P: 1.8, K: 1.5 },
  Maize: { N: 3.0, P: 1.5, K: 1.8 },
};

// Cost per day per acre in INR
const laborCosts = {
  Rice: 450, Wheat: 350, Cotton: 400, Sugarcane: 500,
  Vegetables: 600, Soybean: 300, Maize: 350,
};

// Expected yield in quintals per acre
const expectedYields = {
  Rice: 18, Wheat: 16, Cotton: 8, Sugarcane: 350,
  Vegetables: 60, Soybean: 8, Maize: 20,
};

// Input cost per acre per week in INR
const weeklyInputCosts = {
  Rice: { Sowing: 1200, Vegetative: 1800, Flowering: 2200, Harvest: 800 },
  Wheat: { Sowing: 1000, Vegetative: 1400, Flowering: 1800, Harvest: 600 },
  Cotton: { Sowing: 800, Vegetative: 1600, Flowering: 2400, Harvest: 900 },
  Sugarcane: { Sowing: 2000, Vegetative: 2500, Flowering: 3000, Harvest: 1500 },
  Vegetables: { Sowing: 1500, Vegetative: 2000, Flowering: 2500, Harvest: 1200 },
  Soybean: { Sowing: 700, Vegetative: 1100, Flowering: 1400, Harvest: 500 },
  Maize: { Sowing: 900, Vegetative: 1300, Flowering: 1700, Harvest: 600 },
};

const pestRiskLevels = {
  Rice: { Sowing: 'Low', Vegetative: 'Medium', Flowering: 'High', Harvest: 'Low' },
  Wheat: { Sowing: 'Low', Vegetative: 'Medium', Flowering: 'Medium', Harvest: 'Low' },
  Cotton: { Sowing: 'Low', Vegetative: 'High', Flowering: 'High', Harvest: 'Medium' },
  Sugarcane: { Sowing: 'Low', Vegetative: 'Medium', Flowering: 'Medium', Harvest: 'Low' },
  Vegetables: { Sowing: 'Medium', Vegetative: 'High', Flowering: 'High', Harvest: 'Medium' },
  Soybean: { Sowing: 'Low', Vegetative: 'High', Flowering: 'Medium', Harvest: 'Low' },
  Maize: { Sowing: 'Low', Vegetative: 'High', Flowering: 'Medium', Harvest: 'Low' },
};

const irrigationTimes = {
  Sowing: 'Early morning (6-8 AM)',
  Vegetative: 'Morning or Evening',
  Flowering: 'Evening (6-8 PM)',
  Harvest: 'Morning (7-9 AM)',
};

const fertilizerTypes = {
  Rice: 'Urea + DAP + MOP',
  Wheat: 'DAP + Urea + Potash',
  Cotton: 'NPK 19:19:19 + Boron',
  Sugarcane: 'Urea + SSP + Potash',
  Vegetables: 'NPK 13:40:13 (water-soluble)',
  Soybean: 'DAP + Potash (no urea)',
  Maize: 'Urea + DAP + Zinc Sulfate',
};

export const calculateResources = (crop, acres, season, stage) => {
  const dailyWater = (waterRequirements[crop]?.[stage] || 1500) * acres;
  const npk = npkRequirements[crop] || { N: 2, P: 1, K: 1.5 };
  const weeklyN = (npk.N * acres).toFixed(1);
  const weeklyP = (npk.P * acres).toFixed(1);
  const weeklyK = (npk.K * acres).toFixed(1);
  const pestFreq = { Sowing: 1, Vegetative: 2, Flowering: 3, Harvest: 1 }[stage] || 2;
  const laborDays = Math.ceil(acres * (stage === 'Harvesting' ? 4 : 2));
  const weeklyInputCost = (weeklyInputCosts[crop]?.[stage] || 1500) * acres;
  const yield_ = expectedYields[crop] || 15;

  return {
    dailyWater: dailyWater.toLocaleString('en-IN'),
    irrigationTime: irrigationTimes[stage] || 'Morning',
    weeklyN,
    weeklyP,
    weeklyK,
    fertilizerType: fertilizerTypes[crop] || 'NPK balanced',
    pestFrequency: pestFreq,
    pestRisk: pestRiskLevels[crop]?.[stage] || 'Medium',
    laborDays,
    weeklyCost: weeklyInputCost.toLocaleString('en-IN'),
    expectedYield: (yield_ * acres).toFixed(1),
    savingsPerSeason: Math.round(dailyWater * 0.25 * 120 / 1000 * 4).toLocaleString('en-IN'),
  };
};

export const getWaterChartData = (crop, acres) => {
  const stages = ['Sowing', 'Vegetative', 'Flowering', 'Harvest'];
  return stages.map(stage => ({
    stage,
    water: Math.round((waterRequirements[crop]?.[stage] || 1500) * acres / 1000),
  }));
};

export const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1;
  if (month >= 6 && month <= 10) return 'Kharif';
  if (month >= 11 || month <= 3) return 'Rabi';
  return 'Zaid';
};
