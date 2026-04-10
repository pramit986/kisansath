export const cropCalendarData = {
  Rice: {
    months: [
      { month: 'Jan', activities: ['rest'] },
      { month: 'Feb', activities: ['rest'] },
      { month: 'Mar', activities: ['soil_prep'] },
      { month: 'Apr', activities: ['soil_prep', 'sowing'] },
      { month: 'May', activities: ['sowing', 'irrigation'] },
      { month: 'Jun', activities: ['sowing', 'irrigation', 'fertilizing'] },
      { month: 'Jul', activities: ['irrigation', 'fertilizing', 'pest_control'] },
      { month: 'Aug', activities: ['irrigation', 'pest_control'] },
      { month: 'Sep', activities: ['irrigation', 'pest_control'] },
      { month: 'Oct', activities: ['harvesting'] },
      { month: 'Nov', activities: ['harvesting', 'rest'] },
      { month: 'Dec', activities: ['rest'] },
    ],
    tasks: {
      Jan: [],
      Feb: [],
      Mar: [
        { id: 'r-mar-1', name: 'Field Preparation', description: 'Plow and level the field. Remove stubble from previous crop.', priority: 'high', icon: '🌾' },
        { id: 'r-mar-2', name: 'Soil Testing', description: 'Get soil sample tested for pH and nutrient levels.', priority: 'medium', icon: '🧪' },
      ],
      Apr: [
        { id: 'r-apr-1', name: 'Nursery Preparation', description: 'Prepare seedbed nursery. Soak seeds for 24 hours before sowing.', priority: 'high', icon: '🌱' },
        { id: 'r-apr-2', name: 'Fertilizer Application', description: 'Apply basal dose of fertilizer (DAP) to nursery bed.', priority: 'high', icon: '🌿' },
        { id: 'r-apr-3', name: 'Irrigation Setup', description: 'Ensure irrigation canals are cleaned and ready.', priority: 'medium', icon: '💧' },
      ],
      May: [
        { id: 'r-may-1', name: 'Transplanting', description: 'Transplant 25-30 day old seedlings to the main field.', priority: 'high', icon: '🌾' },
        { id: 'r-may-2', name: 'Weed Management', description: 'Apply herbicides or manual weeding after transplanting.', priority: 'high', icon: '🐛' },
        { id: 'r-may-3', name: 'First Irrigation', description: 'Maintain 2-3 cm water level in field.', priority: 'high', icon: '💧' },
      ],
      Jun: [
        { id: 'r-jun-1', name: 'Top Dressing (Urea)', description: 'Apply 1st dose of urea fertilizer (25kg/acre).', priority: 'high', icon: '🌿' },
        { id: 'r-jun-2', name: 'Pest Monitoring', description: 'Check for stem borer and leaf folder regularly.', priority: 'high', icon: '🐛' },
        { id: 'r-jun-3', name: 'Regular Irrigation', description: 'Alternate wetting and drying — water every 5-7 days.', priority: 'medium', icon: '💧' },
      ],
      Jul: [
        { id: 'r-jul-1', name: '2nd Dose Fertilizer', description: 'Apply 2nd dose of urea at panicle initiation stage.', priority: 'high', icon: '🌿' },
        { id: 'r-jul-2', name: 'Disease Inspection', description: 'Watch for blast disease. Apply fungicide if needed.', priority: 'high', icon: '🦠' },
        { id: 'r-jul-3', name: 'Pest Control', description: 'Spray insecticide if pest count exceeds threshold.', priority: 'medium', icon: '🐛' },
      ],
      Aug: [
        { id: 'r-aug-1', name: 'Heading Stage Care', description: 'Maintain adequate water during grain filling stage.', priority: 'high', icon: '💧' },
        { id: 'r-aug-2', name: 'Sheath Blight Check', description: 'Inspect lower leaves for sheath blight symptoms.', priority: 'medium', icon: '🦠' },
      ],
      Sep: [
        { id: 'r-sep-1', name: 'Grain Maturity Check', description: 'Check grain color — golden yellow indicates readiness.', priority: 'high', icon: '🌾' },
        { id: 'r-sep-2', name: 'Stop Irrigation', description: 'Stop irrigation 10-15 days before harvest.', priority: 'medium', icon: '💧' },
      ],
      Oct: [
        { id: 'r-oct-1', name: 'Harvesting', description: 'Harvest when 80% of grains are golden yellow.', priority: 'high', icon: '🌾' },
        { id: 'r-oct-2', name: 'Threshing', description: 'Thresh harvested crop within 1-2 days.', priority: 'high', icon: '⚙️' },
        { id: 'r-oct-3', name: 'Drying & Storage', description: 'Sun-dry grain to 14% moisture for storage.', priority: 'high', icon: '☀️' },
      ],
      Nov: [
        { id: 'r-nov-1', name: 'Field Cleaning', description: 'Remove stubble and crop residue from field.', priority: 'medium', icon: '🌾' },
        { id: 'r-nov-2', name: 'Sell or Store', description: 'Check mandi prices and decide when to sell.', priority: 'high', icon: '💰' },
      ],
      Dec: [],
    }
  },
  Wheat: {
    months: [
      { month: 'Jan', activities: ['irrigation', 'fertilizing'] },
      { month: 'Feb', activities: ['irrigation', 'pest_control'] },
      { month: 'Mar', activities: ['irrigation', 'harvesting'] },
      { month: 'Apr', activities: ['harvesting', 'rest'] },
      { month: 'May', activities: ['rest'] },
      { month: 'Jun', activities: ['rest'] },
      { month: 'Jul', activities: ['rest'] },
      { month: 'Aug', activities: ['soil_prep'] },
      { month: 'Sep', activities: ['soil_prep'] },
      { month: 'Oct', activities: ['soil_prep', 'sowing'] },
      { month: 'Nov', activities: ['sowing', 'irrigation'] },
      { month: 'Dec', activities: ['irrigation', 'fertilizing'] },
    ],
    tasks: {
      Jan: [
        { id: 'w-jan-1', name: '2nd Irrigation', description: 'Provide 2nd irrigation at crown root initiation stage.', priority: 'high', icon: '💧' },
        { id: 'w-jan-2', name: 'Fertilizer Top Dress', description: 'Apply 2nd dose of nitrogen before irrigation.', priority: 'high', icon: '🌿' },
        { id: 'w-jan-3', name: 'Yellow Rust Check', description: 'Inspect for yellow rust disease — spray fungicide if found.', priority: 'medium', icon: '🦠' },
      ],
      Feb: [
        { id: 'w-feb-1', name: '3rd Irrigation', description: 'Irrigate at jointing stage. Critical for yield.', priority: 'high', icon: '💧' },
        { id: 'w-feb-2', name: 'Aphid Control', description: 'Check for aphids on upper leaves. Spray if needed.', priority: 'high', icon: '🐛' },
      ],
      Mar: [
        { id: 'w-mar-1', name: '4th Irrigation', description: 'Last irrigation at grain filling stage.', priority: 'high', icon: '💧' },
        { id: 'w-mar-2', name: 'Harvest Preparation', description: 'Arrange labor and threshing machine in advance.', priority: 'medium', icon: '⚙️' },
      ],
      Apr: [
        { id: 'w-apr-1', name: 'Harvesting', description: 'Harvest when crop turns golden yellow (late April).', priority: 'high', icon: '🌾' },
        { id: 'w-apr-2', name: 'Threshing & Storage', description: 'Dry to 12% moisture. Store in clean bags.', priority: 'high', icon: '🏪' },
      ],
      May: [],
      Jun: [],
      Jul: [],
      Aug: [],
      Sep: [
        { id: 'w-sep-1', name: 'Field Preparation', description: 'Deep plow field after monsoon. Apply FYM compost.', priority: 'high', icon: '🌾' },
      ],
      Oct: [
        { id: 'w-oct-1', name: 'Last Plow', description: 'Final harrowing and leveling of field.', priority: 'high', icon: '🌾' },
        { id: 'w-oct-2', name: 'Seed Treatment', description: 'Treat wheat seeds with fungicide before sowing.', priority: 'high', icon: '🌱' },
        { id: 'w-oct-3', name: 'Sowing (Timely)', description: 'Sow in last week of October for best yield.', priority: 'high', icon: '🌾' },
        { id: 'w-oct-4', name: 'Basal Fertilizer', description: 'Apply DAP + Potash at time of sowing.', priority: 'high', icon: '🌿' },
      ],
      Nov: [
        { id: 'w-nov-1', name: 'First Irrigation', description: 'Provide first irrigation (CRI) 20-25 days after sowing.', priority: 'high', icon: '💧' },
        { id: 'w-nov-2', name: 'Weed Control', description: 'Apply herbicide for broadleaf and grassy weeds.', priority: 'high', icon: '🌿' },
      ],
      Dec: [
        { id: 'w-dec-1', name: 'Nitrogen Application', description: 'Apply 1st dose of urea before irrigation.', priority: 'high', icon: '🌿' },
        { id: 'w-dec-2', name: 'Frost Protection', description: 'Provide light irrigation before expected frost nights.', priority: 'medium', icon: '❄️' },
      ],
    }
  },
  Cotton: {
    months: [
      { month: 'Jan', activities: ['rest'] },
      { month: 'Feb', activities: ['soil_prep'] },
      { month: 'Mar', activities: ['soil_prep'] },
      { month: 'Apr', activities: ['sowing'] },
      { month: 'May', activities: ['sowing', 'irrigation'] },
      { month: 'Jun', activities: ['irrigation', 'fertilizing'] },
      { month: 'Jul', activities: ['irrigation', 'pest_control'] },
      { month: 'Aug', activities: ['pest_control', 'fertilizing'] },
      { month: 'Sep', activities: ['pest_control', 'harvesting'] },
      { month: 'Oct', activities: ['harvesting'] },
      { month: 'Nov', activities: ['harvesting', 'rest'] },
      { month: 'Dec', activities: ['rest'] },
    ],
    tasks: {
      Jan: [],
      Feb: [
        { id: 'c-feb-1', name: 'Deep Plowing', description: 'Deep plow field to expose pest larvae to sun.', priority: 'high', icon: '🌾' },
        { id: 'c-feb-2', name: 'Compost Application', description: 'Apply 5 tons FYM per acre and mix into soil.', priority: 'medium', icon: '🌿' },
      ],
      Mar: [
        { id: 'c-mar-1', name: 'Soil Preparation', description: 'Final harrowing and bed formation for cotton.', priority: 'high', icon: '🌾' },
        { id: 'c-mar-2', name: 'Seed Selection', description: 'Select Bt cotton hybrid seeds suited to your region.', priority: 'high', icon: '🌱' },
      ],
      Apr: [
        { id: 'c-apr-1', name: 'Sowing', description: 'Sow cotton at 60x90 cm spacing. Depth 3-4 cm.', priority: 'high', icon: '🌾' },
        { id: 'c-apr-2', name: 'Basal Fertilizer', description: 'Apply DAP 40 kg/acre at sowing time.', priority: 'high', icon: '🌿' },
      ],
      May: [
        { id: 'c-may-1', name: 'Gap Filling', description: 'Fill gaps in rows within 15 days of sowing.', priority: 'high', icon: '🌱' },
        { id: 'c-may-2', name: 'First Irrigation', description: 'Irrigate if rains are insufficient.', priority: 'medium', icon: '💧' },
        { id: 'c-may-3', name: 'Weed Control', description: 'Manual or chemical weed control at 3 weeks.', priority: 'high', icon: '🌿' },
      ],
      Jun: [
        { id: 'c-jun-1', name: 'Nitrogen Application', description: 'Apply 1st dose of urea (25 kg/acre).', priority: 'high', icon: '🌿' },
        { id: 'c-jun-2', name: 'Square Formation', description: 'Monitor bud/square formation — start of flowering.', priority: 'medium', icon: '🔍' },
      ],
      Jul: [
        { id: 'c-jul-1', name: 'Bollworm Monitoring', description: 'Check for pink/American bollworm regularly.', priority: 'high', icon: '🐛' },
        { id: 'c-jul-2', name: '2nd Dose Fertilizer', description: 'Apply urea before irrigation at boll development.', priority: 'high', icon: '🌿' },
        { id: 'c-jul-3', name: 'Whitefly Control', description: 'Monitor for whitefly — serious vector of CLCuV.', priority: 'high', icon: '🐛' },
      ],
      Aug: [
        { id: 'c-aug-1', name: 'Boll Development', description: 'Ensure adequate irrigation during boll filling.', priority: 'high', icon: '💧' },
        { id: 'c-aug-2', name: 'Spray Schedule', description: 'Rotate insecticides to prevent resistance buildup.', priority: 'high', icon: '🐛' },
      ],
      Sep: [
        { id: 'c-sep-1', name: 'First Picking', description: 'Pick fully open bolls — early morning preferred.', priority: 'high', icon: '🌾' },
        { id: 'c-sep-2', name: 'Grade Separation', description: 'Separate cotton by quality for better prices.', priority: 'medium', icon: '📦' },
      ],
      Oct: [
        { id: 'c-oct-1', name: 'Main Harvest', description: '2nd and 3rd picking of cotton bolls.', priority: 'high', icon: '🌾' },
        { id: 'c-oct-2', name: 'Market Check', description: 'Monitor mandi prices before selling.', priority: 'high', icon: '💰' },
      ],
      Nov: [
        { id: 'c-nov-1', name: 'Final Picking', description: 'Last picking. Remove remaining bolls.', priority: 'medium', icon: '🌾' },
        { id: 'c-nov-2', name: 'Stalk Destruction', description: 'Cut and destroy cotton stalks to prevent pest carryover.', priority: 'high', icon: '🔥' },
      ],
      Dec: [],
    }
  },
  Sugarcane: {
    months: [
      { month: 'Jan', activities: ['sowing', 'irrigation'] },
      { month: 'Feb', activities: ['sowing', 'fertilizing'] },
      { month: 'Mar', activities: ['irrigation', 'fertilizing'] },
      { month: 'Apr', activities: ['irrigation', 'pest_control'] },
      { month: 'May', activities: ['irrigation', 'fertilizing'] },
      { month: 'Jun', activities: ['irrigation', 'pest_control'] },
      { month: 'Jul', activities: ['irrigation', 'pest_control'] },
      { month: 'Aug', activities: ['fertilizing', 'pest_control'] },
      { month: 'Sep', activities: ['irrigation'] },
      { month: 'Oct', activities: ['harvesting'] },
      { month: 'Nov', activities: ['harvesting', 'sowing'] },
      { month: 'Dec', activities: ['sowing', 'irrigation'] },
    ],
    tasks: {
      Jan: [
        { id: 's-jan-1', name: 'Spring Planting', description: 'Plant setts at 60-90 cm row spacing, 3-4 buds/sett.', priority: 'high', icon: '🌾' },
        { id: 's-jan-2', name: 'Irrigation (Every 7-10 days)', description: 'Light frequent irrigation post planting.', priority: 'high', icon: '💧' },
      ],
      Feb: [
        { id: 's-feb-1', name: 'Germination Check', description: 'Check for gaps and fill within 3 weeks.', priority: 'high', icon: '🌱' },
        { id: 's-feb-2', name: 'Basal Fertilizer', description: 'Apply DAP + MOP at planting.', priority: 'high', icon: '🌿' },
      ],
      Mar: [
        { id: 's-mar-1', name: 'Earthing Up', description: 'First earthing up when crop is 30 cm tall.', priority: 'high', icon: '🌾' },
        { id: 's-mar-2', name: 'Nitrogen Application', description: 'Apply 1st split of N fertilizer.', priority: 'high', icon: '🌿' },
      ],
      Apr: [
        { id: 's-apr-1', name: 'Borers Check', description: 'Monitor for internode borer and shoot borer.', priority: 'high', icon: '🐛' },
        { id: 's-apr-2', name: 'Regular Irrigation', description: 'Irrigate every 10 days in summer.', priority: 'high', icon: '💧' },
      ],
      May: [
        { id: 's-may-1', name: '2nd Earthing Up', description: 'Second earthing up + propping if needed.', priority: 'medium', icon: '🌾' },
        { id: 's-may-2', name: '2nd N Application', description: 'Apply 2nd split of nitrogen fertilizer.', priority: 'high', icon: '🌿' },
      ],
      Jun: [
        { id: 's-jun-1', name: 'Weed Control', description: 'Manual or chemical weeding before rainy season.', priority: 'high', icon: '🌿' },
        { id: 's-jun-2', name: 'Pyrilla Control', description: 'Check for pyrilla hopper on lower leaves.', priority: 'medium', icon: '🐛' },
      ],
      Jul: [
        { id: 's-jul-1', name: 'Waterlogging Prevention', description: 'Open drainage channels to prevent waterlogging.', priority: 'high', icon: '💧' },
        { id: 's-jul-2', name: 'Red Rot Monitoring', description: 'Check cane for red rot — reddish discoloration.', priority: 'high', icon: '🦠' },
      ],
      Aug: [
        { id: 's-aug-1', name: 'Final Fertilizer Dose', description: 'Apply last dose of potash fertilizer.', priority: 'medium', icon: '🌿' },
        { id: 's-aug-2', name: 'Propping', description: 'Support leaning canes with props/strings.', priority: 'medium', icon: '🌾' },
      ],
      Sep: [
        { id: 's-sep-1', name: 'Ripening Stage', description: 'Reduce irrigation to promote sugar accumulation.', priority: 'high', icon: '💧' },
        { id: 's-sep-2', name: 'Brix Check', description: 'Get juice tested for Brix (sweetness) reading.', priority: 'medium', icon: '🧪' },
      ],
      Oct: [
        { id: 's-oct-1', name: 'Harvest Booking', description: 'Register with sugar factory for harvesting slot.', priority: 'high', icon: '📋' },
        { id: 's-oct-2', name: 'Harvesting', description: 'Cut at ground level. Remove trash/leaves.', priority: 'high', icon: '🌾' },
      ],
      Nov: [
        { id: 's-nov-1', name: 'Ratoon Management', description: 'After harvest, manage ratoon crop with fertilizer.', priority: 'high', icon: '🌱' },
        { id: 's-nov-2', name: 'New Planting', description: 'Start planting for next season adsali crop.', priority: 'medium', icon: '🌾' },
      ],
      Dec: [
        { id: 's-dec-1', name: 'Irrigation & Care', description: 'Regular irrigation for newly planted cane.', priority: 'high', icon: '💧' },
      ],
    }
  },
  Vegetables: {
    months: [
      { month: 'Jan', activities: ['sowing', 'irrigation', 'harvesting'] },
      { month: 'Feb', activities: ['sowing', 'irrigation', 'harvesting'] },
      { month: 'Mar', activities: ['harvesting', 'soil_prep'] },
      { month: 'Apr', activities: ['soil_prep', 'sowing'] },
      { month: 'May', activities: ['sowing', 'irrigation'] },
      { month: 'Jun', activities: ['sowing', 'irrigation', 'pest_control'] },
      { month: 'Jul', activities: ['irrigation', 'pest_control', 'harvesting'] },
      { month: 'Aug', activities: ['irrigation', 'harvesting', 'pest_control'] },
      { month: 'Sep', activities: ['sowing', 'irrigation', 'harvesting'] },
      { month: 'Oct', activities: ['sowing', 'irrigation', 'fertilizing'] },
      { month: 'Nov', activities: ['irrigation', 'fertilizing', 'harvesting'] },
      { month: 'Dec', activities: ['irrigation', 'harvesting', 'pest_control'] },
    ],
    tasks: {
      Jan: [
        { id: 'v-jan-1', name: 'Winter Vegetables', description: 'Harvest tomato, capsicum, peas, cauliflower.', priority: 'high', icon: '🥕' },
        { id: 'v-jan-2', name: 'Succession Sowing', description: 'Sow summer crops (gourd, cucumber) in protected beds.', priority: 'medium', icon: '🌱' },
      ],
      Feb: [
        { id: 'v-feb-1', name: 'Summer Crop Planting', description: 'Transplant summer vegetables (tomato, brinjal).', priority: 'high', icon: '🍅' },
        { id: 'v-feb-2', name: 'Drip System Check', description: 'Inspect drip irrigation lines for leaks.', priority: 'medium', icon: '💧' },
      ],
      Mar: [
        { id: 'v-mar-1', name: 'Harvest Completion', description: 'Complete winter crop harvest before heat sets in.', priority: 'high', icon: '🥬' },
        { id: 'v-mar-2', name: 'Field Preparation', description: 'Prepare beds for summer vegetables.', priority: 'medium', icon: '🌾' },
      ],
      Apr: [
        { id: 'v-apr-1', name: 'Mulching', description: 'Apply black mulch to conserve moisture in summer.', priority: 'high', icon: '🌿' },
        { id: 'v-apr-2', name: 'Cucurbit Sowing', description: 'Sow ridge gourd, bottle gourd, bitter gourd.', priority: 'high', icon: '🥒' },
      ],
      May: [
        { id: 'v-may-1', name: 'Heat Stress Management', description: 'Provide shade nets for sensitive crops in peak heat.', priority: 'high', icon: '☀️' },
        { id: 'v-may-2', name: 'Frequent Irrigation', description: 'Irrigate daily in morning and evening.', priority: 'high', icon: '💧' },
      ],
      Jun: [
        { id: 'v-jun-1', name: 'Monsoon Prep', description: 'Create raised beds for drainage in heavy rains.', priority: 'high', icon: '🌧️' },
        { id: 'v-jun-2', name: 'Fungal Disease Control', description: 'Apply fungicide preventively before monsoon.', priority: 'high', icon: '🦠' },
        { id: 'v-jun-3', name: 'Kharif Vegetables', description: 'Sow monsoon vegetables: okra, cluster beans, yam.', priority: 'medium', icon: '🌱' },
      ],
      Jul: [
        { id: 'v-jul-1', name: 'Disease Monitoring', description: 'Regular scouting for late blight, powdery mildew.', priority: 'high', icon: '🦠' },
        { id: 'v-jul-2', name: 'Harvest & Supply', description: 'Harvest frequently to maintain quality.', priority: 'high', icon: '🥬' },
      ],
      Aug: [
        { id: 'v-aug-1', name: 'Post-Monsoon Planning', description: 'Plan winter crop seedling nursery.', priority: 'medium', icon: '📋' },
        { id: 'v-aug-2', name: 'Fertilizer Application', description: 'Apply water-soluble fertilizer through drip.', priority: 'medium', icon: '🌿' },
      ],
      Sep: [
        { id: 'v-sep-1', name: 'Winter Nursery', description: 'Start seedling nursery for tomato, cabbage, onion.', priority: 'high', icon: '🌱' },
        { id: 'v-sep-2', name: 'Field Preparation', description: 'Prepare beds with compost for rabi vegetables.', priority: 'high', icon: '🌾' },
      ],
      Oct: [
        { id: 'v-oct-1', name: 'Transplanting', description: 'Transplant winter vegetable seedlings.', priority: 'high', icon: '🥕' },
        { id: 'v-oct-2', name: 'Fertilizer Application', description: 'Apply starter fertilizer after transplanting.', priority: 'high', icon: '🌿' },
        { id: 'v-oct-3', name: 'Pest Scouting', description: 'Check for thrips, mites on young transplants.', priority: 'medium', icon: '🐛' },
      ],
      Nov: [
        { id: 'v-nov-1', name: 'Crop Training', description: 'Stake and train tomato, capsicum plants.', priority: 'medium', icon: '🌿' },
        { id: 'v-nov-2', name: 'Fertilizer Dose', description: 'Apply potassium-rich fertilizer for fruiting.', priority: 'high', icon: '🌿' },
      ],
      Dec: [
        { id: 'v-dec-1', name: 'First Harvest', description: 'Begin harvesting winter vegetables.', priority: 'high', icon: '🥬' },
        { id: 'v-dec-2', name: 'Cold Protection', description: 'Cover sensitive crops on cold nights.', priority: 'medium', icon: '❄️' },
      ],
    }
  },
  Soybean: {
    months: [
      { month: 'Jan', activities: ['rest'] },
      { month: 'Feb', activities: ['rest'] },
      { month: 'Mar', activities: ['soil_prep'] },
      { month: 'Apr', activities: ['soil_prep'] },
      { month: 'May', activities: ['soil_prep'] },
      { month: 'Jun', activities: ['sowing'] },
      { month: 'Jul', activities: ['irrigation', 'fertilizing', 'pest_control'] },
      { month: 'Aug', activities: ['irrigation', 'pest_control'] },
      { month: 'Sep', activities: ['irrigation', 'harvesting'] },
      { month: 'Oct', activities: ['harvesting', 'rest'] },
      { month: 'Nov', activities: ['rest'] },
      { month: 'Dec', activities: ['rest'] },
    ],
    tasks: {
      Jan: [],
      Feb: [],
      Mar: [
        { id: 'sb-mar-1', name: 'Field Preparation', description: 'Deep plow and expose soil to summer heat.', priority: 'medium', icon: '🌾' },
      ],
      Apr: [
        { id: 'sb-apr-1', name: 'Soil Testing', description: 'Test soil for pH (6.0-6.5 ideal for soybean).', priority: 'high', icon: '🧪' },
        { id: 'sb-apr-2', name: 'Lime Application', description: 'Apply lime if soil pH is below 6.0.', priority: 'medium', icon: '🌿' },
      ],
      May: [
        { id: 'sb-may-1', name: 'Pre-sowing Prep', description: 'Prepare seedbed. Apply phosphorus fertilizer.', priority: 'high', icon: '🌾' },
        { id: 'sb-may-2', name: 'Variety Selection', description: 'Select improved soybean variety for your region.', priority: 'high', icon: '🌱' },
      ],
      Jun: [
        { id: 'sb-jun-1', name: 'Seed Treatment', description: 'Treat seeds with Rhizobium + PSB culture.', priority: 'high', icon: '🌱' },
        { id: 'sb-jun-2', name: 'Sowing (June 20-30)', description: 'Sow at 45x10 cm spacing, 3 cm depth.', priority: 'high', icon: '🌾' },
        { id: 'sb-jun-3', name: 'Herbicide Application', description: 'Apply pre-emergence herbicide for weed control.', priority: 'medium', icon: '🌿' },
      ],
      Jul: [
        { id: 'sb-jul-1', name: 'Intercultivation', description: 'Intercultivation at 20-25 days for weed control.', priority: 'high', icon: '🌿' },
        { id: 'sb-jul-2', name: 'Foliar Spray', description: 'Apply foliar spray of boron + molybdenum.', priority: 'medium', icon: '🌿' },
        { id: 'sb-jul-3', name: 'Stem Fry Disease', description: 'Monitor for stem fly — major kharif pest.', priority: 'high', icon: '🐛' },
      ],
      Aug: [
        { id: 'sb-aug-1', name: 'Flowering Stage Care', description: 'Ensure adequate moisture during flowering.', priority: 'high', icon: '💧' },
        { id: 'sb-aug-2', name: 'Pod Borer Control', description: 'Spray for pod borer at flowering stage.', priority: 'high', icon: '🐛' },
      ],
      Sep: [
        { id: 'sb-sep-1', name: 'Maturity Check', description: 'Pods turn brown + rattle when shaken = ready.', priority: 'high', icon: '🌾' },
        { id: 'sb-sep-2', name: 'Harvesting', description: 'Harvest before pods begin to shatter.', priority: 'high', icon: '🌾' },
        { id: 'sb-sep-3', name: 'Threshing & Drying', description: 'Thresh and dry to 12-13% moisture.', priority: 'high', icon: '☀️' },
      ],
      Oct: [
        { id: 'sb-oct-1', name: 'Storage or Sale', description: 'Store in cool dry place or sell at good price.', priority: 'high', icon: '💰' },
        { id: 'sb-oct-2', name: 'Field Clearing', description: 'Clear crop residue. Prepare for rabi season.', priority: 'medium', icon: '🌾' },
      ],
      Nov: [],
      Dec: [],
    }
  },
  Maize: {
    months: [
      { month: 'Jan', activities: ['rest'] },
      { month: 'Feb', activities: ['soil_prep'] },
      { month: 'Mar', activities: ['sowing'] },
      { month: 'Apr', activities: ['sowing', 'irrigation', 'fertilizing'] },
      { month: 'May', activities: ['irrigation', 'fertilizing', 'pest_control'] },
      { month: 'Jun', activities: ['irrigation', 'harvesting'] },
      { month: 'Jul', activities: ['soil_prep', 'sowing'] },
      { month: 'Aug', activities: ['sowing', 'irrigation', 'fertilizing'] },
      { month: 'Sep', activities: ['irrigation', 'pest_control'] },
      { month: 'Oct', activities: ['harvesting'] },
      { month: 'Nov', activities: ['harvesting', 'rest'] },
      { month: 'Dec', activities: ['rest'] },
    ],
    tasks: {
      Jan: [],
      Feb: [
        { id: 'm-feb-1', name: 'Summer Crop Prep', description: 'Plow and prepare field for spring/summer maize.', priority: 'high', icon: '🌾' },
        { id: 'm-feb-2', name: 'FYM Application', description: 'Apply 5 tons farmyard manure per acre.', priority: 'medium', icon: '🌿' },
      ],
      Mar: [
        { id: 'm-mar-1', name: 'Sowing', description: 'Sow hybrid maize at 60x20 cm spacing.', priority: 'high', icon: '🌽' },
        { id: 'm-mar-2', name: 'Basal Fertilizer', description: 'Apply full phosphorus + half nitrogen at sowing.', priority: 'high', icon: '🌿' },
      ],
      Apr: [
        { id: 'm-apr-1', name: 'Gap Filling', description: 'Re-sow gaps within 10 days.', priority: 'high', icon: '🌱' },
        { id: 'm-apr-2', name: 'Top Dressing', description: 'Apply 2nd dose of nitrogen at knee height.', priority: 'high', icon: '🌿' },
        { id: 'm-apr-3', name: 'Irrigation', description: 'Irrigate at 7-10 day intervals.', priority: 'high', icon: '💧' },
      ],
      May: [
        { id: 'm-may-1', name: 'Fall Army Worm', description: 'Check for FAW in leaf whorls — spray if found.', priority: 'high', icon: '🐛' },
        { id: 'm-may-2', name: '3rd N Dose', description: 'Apply final nitrogen before tasseling.', priority: 'high', icon: '🌿' },
      ],
      Jun: [
        { id: 'm-jun-1', name: 'Harvesting', description: 'Harvest summer maize when husks are dry.', priority: 'high', icon: '🌽' },
        { id: 'm-jun-2', name: 'Drying & Storage', description: 'Dry cobs/grain to 12% moisture.', priority: 'high', icon: '☀️' },
      ],
      Jul: [
        { id: 'm-jul-1', name: 'Kharif Sowing', description: 'Plant kharif maize in July for 2nd season.', priority: 'high', icon: '🌽' },
        { id: 'm-jul-2', name: 'Drainage', description: 'Ensure good drainage for monsoon season.', priority: 'medium', icon: '💧' },
      ],
      Aug: [
        { id: 'm-aug-1', name: 'Fertilizer Application', description: 'Apply full fertilizer dose for kharif crop.', priority: 'high', icon: '🌿' },
        { id: 'm-aug-2', name: 'Disease Monitoring', description: 'Check for turcicum blight, polysora rust.', priority: 'high', icon: '🦠' },
      ],
      Sep: [
        { id: 'm-sep-1', name: 'Pest Control', description: 'Monitor for corn earworm in cobs.', priority: 'high', icon: '🐛' },
        { id: 'm-sep-2', name: 'Irrigation Reduction', description: 'Stop irrigation 2 weeks before harvest.', priority: 'medium', icon: '💧' },
      ],
      Oct: [
        { id: 'm-oct-1', name: 'Kharif Harvest', description: 'Harvest kharif maize after complete drying.', priority: 'high', icon: '🌽' },
        { id: 'm-oct-2', name: 'Market Sale', description: 'Check prices and sell at best mandi.', priority: 'medium', icon: '💰' },
      ],
      Nov: [],
      Dec: [],
    }
  },
};

export const activityColors = {
  sowing: { bg: '#FEF9C3', text: '#854D0E', label: 'Sowing', emoji: '🟡' },
  irrigation: { bg: '#DBEAFE', text: '#1E40AF', label: 'Irrigation', emoji: '🔵' },
  fertilizing: { bg: '#DCFCE7', text: '#14532D', label: 'Fertilizing', emoji: '🟢' },
  harvesting: { bg: '#FEE2E2', text: '#991B1B', label: 'Harvesting', emoji: '🔴' },
  pest_control: { bg: '#FFEDD5', text: '#9A3412', label: 'Pest Control', emoji: '🟠' },
  rest: { bg: '#F3F4F6', text: '#6B7280', label: 'Rest Period', emoji: '⚪' },
  soil_prep: { bg: '#E0F2FE', text: '#0C4A6E', label: 'Field Prep', emoji: '🔷' },
};
