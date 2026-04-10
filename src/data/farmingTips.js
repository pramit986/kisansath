export const farmingTips = {
  Rice: [
    "🌱 Alternate Wetting & Drying (AWD) technique can save up to 30% water in paddy fields.",
    "🌾 Transplant 2-3 seedlings per hill at 25-30 days old for best tillering.",
    "💧 Maintain 2-5 cm standing water during active tillering stage.",
    "🐛 Use pheromone traps to monitor stem borer populations before spraying.",
    "🌿 Green manure crops like Sesbania improve soil nitrogen for next rice crop.",
    "☀️ Harvest when 80% of grains turn golden — waiting too long causes shattering losses.",
    "🧪 Apply zinc sulfate if yellowing of leaves is observed — rice is sensitive to zinc deficiency.",
    "🌾 SRI (System of Rice Intensification) can boost yield by 20-50% with less water.",
  ],
  Wheat: [
    "❄️ Timely sowing (Oct 25 - Nov 10) is the single biggest factor for wheat yield.",
    "💧 Crown Root Initiation (20-25 days) irrigation is the most critical — never skip it.",
    "🌿 Use resistant varieties like HD-2967 or GW-496 to avoid yellow rust risk.",
    "🌾 Seed treatment with Thiram @ 2.5g/kg seed prevents soil-borne diseases.",
    "🐛 Aphid damage during flowering can reduce grain weight by up to 40%.",
    "⚖️ Apply nitrogen in 3 splits: at sowing, 1st irrigation, and 2nd irrigation.",
    "☀️ Harvesting at 20-25% moisture and drying to 12% prevents storage losses.",
    "🌱 Intercropping wheat with mustard can provide an additional income source.",
  ],
  Cotton: [
    "🐛 Pink bollworm is now resistant to Cry1Ac — spray refugia strips to manage resistance.",
    "💧 Furrow irrigation is more efficient than flood irrigation for cotton.",
    "🌿 Do not apply excess nitrogen — it promotes vegetative growth at expense of bolls.",
    "☁️ Picking early morning gives better quality cotton with fewer impurities.",
    "🔍 Yellow sticky traps help monitor whitefly population — major CLCV virus vector.",
    "🌾 Remove and burn dried fallen bolls to reduce pink bollworm carryover.",
    "⚡ Use integrated pest management — rotate chemicals to prevent resistance buildup.",
    "🌱 Deep rootzone makes cotton drought tolerant — water stress at boll opening improves quality.",
  ],
  Sugarcane: [
    "🎋 Ratoon crop costs 40% less than plant crop — manage it well for extra profit.",
    "💧 Drip irrigation can save 40-50% water in sugarcane while increasing sucrose content.",
    "🌿 Apply trichoderma-enriched compost to reduce root diseases in sugarcane.",
    "📋 Book factory slot 2-3 months early — delays cause sucrose content to drop.",
    "🐛 Internode borer damage creates 'dead heart' — spray at early whorl stage.",
    "🧪 Brix reading above 18-20 confirms cane is ready for harvest (sweet).",
    "🌱 Trench planting retains moisture better than conventional furrow planting.",
    "💰 SAP (State Advised Price) is minimum — check market rate before direct selling.",
  ],
  Vegetables: [
    "💧 Drip irrigation with fertigation can boost vegetable yield by 25-30%.",
    "🌱 Raise seedlings in coco peat trays for uniform growth and better transplant success.",
    "🌿 Mulching conserves 40% moisture and suppresses weeds throughout growing season.",
    "🥕 Harvest in the early morning for better shelf life and market price.",
    "🐛 Yellow sticky traps for whitefly + blue traps for thrips — IPM approach.",
    "🍅 Pin in support sticks for indeterminate tomato varieties for better yield.",
    "🌾 Avoid overhead irrigation in fungal disease-prone seasons (use drip instead).",
    "📦 Grade & pack vegetables before transport — premium grades fetch 30-40% higher price.",
  ],
  Soybean: [
    "🫘 Rhizobium inoculation can save 30-40 kg urea cost per acre — always inoculate seeds.",
    "🌱 Sow within 15 days of monsoon onset — delayed sowing reduces yield significantly.",
    "🐛 Fall Army Worm (FAW) is a new threat — scout whorls weekly from germination.",
    "💧 Critical water periods: flowering and pod filling — irrigate if monsoon gap exceeds 15 days.",
    "🌿 Avoid spraying insecticides during flowering — kills pollinators needed for pod set.",
    "🧪 Foliar spray of 2% urea + potassium at pod stage improves seed size.",
    "☀️ Harvest when 95% pods turn brown — mechanical harvesting reduces losses.",
    "💰 Soybean meal has strong export demand — prices typically rise Nov-Jan.",
  ],
  Maize: [
    "🌽 Fall Army Worm in whorl stage — apply sand + carbofuran into the whorl.",
    "💧 Irrigation at silking (tasseling) is the most critical stage for maize yield.",
    "🌿 Apply zinc to maize — deficiency shows as white striping on young leaves.",
    "🌾 Plant population: 22,000-25,000 plants per acre for optimal yield.",
    "🐛 Remove and destroy affected plants immediately to stop FAW spread.",
    "⚡ Hybrid seeds out-yield open pollinated varieties by 30-40% — always use certified.",
    "🌽 Baby corn harvest at 2-3 days of silk emergence — premium market product.",
    "☀️ Grain moisture at harvest: 25% for mechanical harvest, 15% for hand harvest.",
  ],
};

export const getDailyTip = (crop) => {
  const tips = farmingTips[crop] || farmingTips.Rice;
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  return tips[dayOfYear % tips.length];
};
