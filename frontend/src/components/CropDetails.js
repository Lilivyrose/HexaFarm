import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/CropDetails.css";
import BackButton from './common/BackButton';



import "../styles/CropDetails.css";

const cropData = [
  {
    id: 1,
    name: "Tomatoes",
    scientificName: "Solanum lycopersicum",
    growingSeason: "Spring to Summer",
    waterNeeds: "Moderate",
    sunlight: "Full sun",
    soilType: "Well-drained, rich soil",
    pH: "6.0-6.8",
    spacing: "24-36 inches",
    maturity: "60-85 days",
    description: "Tomatoes are warm-season vegetables that require consistent watering and plenty of sunlight. They come in various sizes and colors.",
    careInstructions: [
      "Plant in full sun",
      "Water regularly",
      "Support with stakes or cages",
      "Fertilize every 2-3 weeks",
      "Prune suckers for better yield",
      "Mulch to retain moisture"
    ],
    commonProblems: [
      "Blossom end rot - caused by calcium deficiency",
      "Early blight - fungal disease",
      "Tomato hornworms - large green caterpillars"
    ],
    harvesting: "Harvest when fully colored and slightly soft to touch",
    storage: "Store at room temperature until ripe, then refrigerate"
  },
  {
    id: 2,
    name: "Lettuce",
    scientificName: "Lactuca sativa",
    growingSeason: "Spring and Fall",
    waterNeeds: "Regular",
    sunlight: "Partial to full sun",
    soilType: "Rich, well-drained soil",
    pH: "6.0-7.0",
    spacing: "6-12 inches",
    maturity: "30-70 days",
    description: "Lettuce is a cool-season crop that grows quickly and can be harvested multiple times.",
    careInstructions: [
      "Keep soil consistently moist",
      "Harvest outer leaves first",
      "Protect from extreme heat",
      "Plant in succession for continuous harvest",
      "Use shade cloth in hot weather",
      "Fertilize lightly"
    ],
    commonProblems: [
      "Bolting - caused by high temperatures",
      "Tip burn - calcium deficiency",
      "Slugs and snails"
    ],
    harvesting: "Harvest in the morning when leaves are crisp",
    storage: "Refrigerate in a plastic bag with paper towel"
  },
  {
    id: 3,
    name: "Carrots",
    scientificName: "Daucus carota",
    growingSeason: "Spring and Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Deep, loose soil",
    pH: "6.0-7.0",
    spacing: "2-3 inches",
    maturity: "70-80 days",
    description: "Carrots are root vegetables that require deep, loose soil for proper development.",
    careInstructions: [
      "Ensure deep, loose soil",
      "Keep soil consistently moist",
      "Thin seedlings early",
      "Mulch to keep soil cool",
      "Remove weeds carefully",
      "Fertilize with phosphorus"
    ],
    commonProblems: [
      "Forked roots - caused by rocky soil",
      "Carrot rust fly",
      "Root rot in wet conditions"
    ],
    harvesting: "Harvest when roots are 1 inch in diameter",
    storage: "Store in cool, humid conditions or refrigerate"
  },
  {
    id: 4,
    name: "Bell Peppers",
    scientificName: "Capsicum annuum",
    growingSeason: "Spring to Summer",
    waterNeeds: "Moderate",
    sunlight: "Full sun",
    soilType: "Well-drained, rich soil",
    pH: "6.0-7.0",
    spacing: "18-24 inches",
    maturity: "60-90 days",
    description: "Bell peppers are warm-season vegetables that come in various colors and are rich in vitamins.",
    careInstructions: [
      "Start indoors 8-10 weeks before last frost",
      "Transplant after soil warms",
      "Water consistently",
      "Support plants if needed",
      "Fertilize regularly",
      "Mulch to retain moisture"
    ],
    commonProblems: [
      "Blossom end rot",
      "Sunscald on fruits",
      "Aphids and whiteflies"
    ],
    harvesting: "Harvest when fruits reach desired size and color",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 5,
    name: "Cucumbers",
    scientificName: "Cucumis sativus",
    growingSeason: "Spring to Summer",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, rich soil",
    pH: "6.0-7.0",
    spacing: "36-48 inches",
    maturity: "50-70 days",
    description: "Cucumbers are vining plants that produce crisp, refreshing fruits perfect for salads and pickling.",
    careInstructions: [
      "Provide trellis or support",
      "Water consistently",
      "Harvest regularly",
      "Fertilize every 2-3 weeks",
      "Mulch to prevent disease",
      "Prune for better air circulation"
    ],
    commonProblems: [
      "Powdery mildew",
      "Cucumber beetles",
      "Bitter fruits from stress"
    ],
    harvesting: "Harvest when fruits are firm and green",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 6,
    name: "Spinach",
    scientificName: "Spinacia oleracea",
    growingSeason: "Spring and Fall",
    waterNeeds: "Regular",
    sunlight: "Partial to full sun",
    soilType: "Rich, well-drained soil",
    pH: "6.0-7.0",
    spacing: "4-6 inches",
    maturity: "40-50 days",
    description: "Spinach is a nutrient-rich leafy green that thrives in cool weather. It's high in iron, vitamins, and minerals.",
    careInstructions: [
      "Plant in early spring or late summer",
      "Keep soil consistently moist",
      "Harvest outer leaves first",
      "Protect from extreme heat",
      "Fertilize with nitrogen-rich fertilizer",
      "Use row covers for pest protection"
    ],
    commonProblems: [
      "Bolting in hot weather",
      "Leaf miners",
      "Downy mildew",
      "Aphids"
    ],
    harvesting: "Harvest leaves when they reach desired size, before they become bitter",
    storage: "Refrigerate in a plastic bag with paper towel"
  },
  {
    id: 7,
    name: "Strawberries",
    scientificName: "Fragaria × ananassa",
    growingSeason: "Spring to Early Summer",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, sandy loam",
    pH: "5.5-6.5",
    spacing: "12-18 inches",
    maturity: "60-90 days",
    description: "Strawberries are perennial plants that produce sweet, juicy fruits. They spread through runners and can be grown in containers or garden beds.",
    careInstructions: [
      "Plant in early spring",
      "Mulch with straw to prevent fruit rot",
      "Remove runners for better fruit production",
      "Water consistently",
      "Fertilize in early spring",
      "Protect from birds with netting"
    ],
    commonProblems: [
      "Gray mold (Botrytis)",
      "Spider mites",
      "Slugs and snails",
      "Birds eating fruits"
    ],
    harvesting: "Harvest when fruits are fully red and ripe",
    storage: "Refrigerate immediately after picking"
  },
  {
    id: 8,
    name: "Zucchini",
    scientificName: "Cucurbita pepo",
    growingSeason: "Spring to Summer",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Rich, well-drained soil",
    pH: "6.0-7.0",
    spacing: "24-36 inches",
    maturity: "45-60 days",
    description: "Zucchini is a prolific summer squash that produces abundant fruits. Regular harvesting encourages more production.",
    careInstructions: [
      "Plant after last frost",
      "Water consistently",
      "Harvest regularly",
      "Fertilize every 2-3 weeks",
      "Mulch to retain moisture",
      "Hand-pollinate if needed"
    ],
    commonProblems: [
      "Powdery mildew",
      "Squash vine borers",
      "Blossom end rot",
      "Cucumber beetles"
    ],
    harvesting: "Harvest when fruits are 6-8 inches long",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 9,
    name: "Green Beans",
    scientificName: "Phaseolus vulgaris",
    growingSeason: "Spring to Summer",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, fertile soil",
    pH: "6.0-7.0",
    spacing: "4-6 inches",
    maturity: "50-60 days",
    description: "Green beans are easy to grow and come in both bush and pole varieties. They're rich in protein and fiber.",
    careInstructions: [
      "Plant after soil warms",
      "Provide support for pole varieties",
      "Water consistently",
      "Harvest regularly",
      "Fertilize with phosphorus",
      "Mulch to retain moisture"
    ],
    commonProblems: [
      "Bean beetles",
      "Rust disease",
      "Root rot",
      "Aphids"
    ],
    harvesting: "Harvest when pods are firm and snap easily",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 10,
    name: "Broccoli",
    scientificName: "Brassica oleracea var. italica",
    growingSeason: "Spring and Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Rich, well-drained soil",
    pH: "6.0-7.0",
    spacing: "18-24 inches",
    maturity: "60-100 days",
    description: "Broccoli is a cool-season vegetable that produces edible flower heads. It's rich in vitamins and minerals.",
    careInstructions: [
      "Start indoors 6-8 weeks before last frost",
      "Transplant when seedlings are 4-6 weeks old",
      "Water consistently",
      "Fertilize with nitrogen",
      "Protect from cabbage worms",
      "Harvest before flowers open"
    ],
    commonProblems: [
      "Cabbage worms",
      "Club root",
      "Aphids",
      "Bolting in hot weather"
    ],
    harvesting: "Harvest when heads are firm and tight",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 11,
    name: "Sweet Corn",
    scientificName: "Zea mays var. saccharata",
    growingSeason: "Spring to Summer",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, fertile soil",
    pH: "6.0-7.0",
    spacing: "8-12 inches",
    maturity: "60-100 days",
    description: "Sweet corn is a warm-season crop that requires proper spacing and pollination for good yields.",
    careInstructions: [
      "Plant in blocks for better pollination",
      "Water consistently",
      "Fertilize with nitrogen",
      "Control weeds early",
      "Protect from raccoons",
      "Harvest at peak ripeness"
    ],
    commonProblems: [
      "Corn earworms",
      "Raccoons",
      "Rust disease",
      "Poor pollination"
    ],
    harvesting: "Harvest when kernels are plump and milky",
    storage: "Refrigerate immediately after picking"
  },
  {
    id: 12,
    name: "Potatoes",
    scientificName: "Solanum tuberosum",
    growingSeason: "Spring to Summer",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, loose soil",
    pH: "5.0-6.0",
    spacing: "12-15 inches",
    maturity: "80-120 days",
    description: "Potatoes are grown from seed potatoes and require hilling for better yields. They're a staple crop that stores well.",
    careInstructions: [
      "Plant seed potatoes in early spring",
      "Hill soil around plants as they grow",
      "Water consistently",
      "Fertilize with phosphorus",
      "Control weeds",
      "Harvest after plants die back"
    ],
    commonProblems: [
      "Colorado potato beetles",
      "Late blight",
      "Scab disease",
      "Wireworms"
    ],
    harvesting: "Harvest when plants die back and tubers are mature",
    storage: "Store in cool, dark, humid conditions"
  },
  {
    id: 13,
    name: "Onions",
    scientificName: "Allium cepa",
    growingSeason: "Spring to Summer",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, fertile soil",
    pH: "6.0-7.0",
    spacing: "4-6 inches",
    maturity: "100-120 days",
    description: "Onions are essential kitchen staples that can be grown from seeds, sets, or transplants. They come in various colors and sizes.",
    careInstructions: [
      "Plant in early spring",
      "Keep soil consistently moist",
      "Fertilize with nitrogen",
      "Control weeds",
      "Stop watering when tops fall over",
      "Harvest when tops are dry"
    ],
    commonProblems: [
      "Onion thrips",
      "White rot",
      "Downy mildew",
      "Poor bulb formation"
    ],
    harvesting: "Harvest when tops fall over and begin to dry",
    storage: "Cure in a dry, well-ventilated area for 2-3 weeks"
  },
  {
    id: 14,
    name: "Garlic",
    scientificName: "Allium sativum",
    growingSeason: "Fall to Summer",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, fertile soil",
    pH: "6.0-7.0",
    spacing: "6-8 inches",
    maturity: "240-270 days",
    description: "Garlic is a perennial plant grown as an annual. It's planted in fall and harvested the following summer.",
    careInstructions: [
      "Plant cloves in fall",
      "Mulch heavily in winter",
      "Water consistently in spring",
      "Remove scapes for larger bulbs",
      "Stop watering when leaves yellow",
      "Harvest when leaves are half brown"
    ],
    commonProblems: [
      "White rot",
      "Garlic rust",
      "Nematodes",
      "Poor bulb formation"
    ],
    harvesting: "Harvest when leaves are half brown and half green",
    storage: "Cure in a dry, well-ventilated area for 2-3 weeks"
  },
  {
    id: 15,
    name: "Peas",
    scientificName: "Pisum sativum",
    growingSeason: "Early Spring to Early Summer",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, fertile soil",
    pH: "6.0-7.0",
    spacing: "2-3 inches",
    maturity: "60-70 days",
    description: "Peas are cool-season legumes that fix nitrogen in the soil. They come in shelling, snap, and snow pea varieties.",
    careInstructions: [
      "Plant early in spring",
      "Provide support for climbing varieties",
      "Water consistently",
      "Harvest regularly",
      "Mulch to keep soil cool",
      "Fertilize with phosphorus"
    ],
    commonProblems: [
      "Powdery mildew",
      "Pea weevils",
      "Root rot",
      "Poor pod set"
    ],
    harvesting: "Harvest when pods are plump but before they become tough",
    storage: "Refrigerate immediately after picking"
  },
  {
    id: 16,
    name: "Radishes",
    scientificName: "Raphanus sativus",
    growingSeason: "Spring and Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, loose soil",
    pH: "6.0-7.0",
    spacing: "1-2 inches",
    maturity: "25-35 days",
    description: "Radishes are fast-growing root vegetables that come in various colors and shapes. They're perfect for intercropping.",
    careInstructions: [
      "Plant in early spring or late summer",
      "Keep soil consistently moist",
      "Thin seedlings early",
      "Harvest quickly when mature",
      "Succession plant every 2 weeks",
      "Fertilize lightly"
    ],
    commonProblems: [
      "Root maggots",
      "Club root",
      "Pithy roots from slow growth",
      "Bolting in hot weather"
    ],
    harvesting: "Harvest when roots are 1-2 inches in diameter",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 17,
    name: "Kale",
    scientificName: "Brassica oleracea var. sabellica",
    growingSeason: "Spring and Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun to partial shade",
    soilType: "Rich, well-drained soil",
    pH: "6.0-7.0",
    spacing: "12-18 inches",
    maturity: "50-65 days",
    description: "Kale is a nutrient-dense leafy green that becomes sweeter after frost. It's available in various colors and textures.",
    careInstructions: [
      "Start indoors or direct sow",
      "Water consistently",
      "Fertilize with nitrogen",
      "Harvest outer leaves",
      "Protect from cabbage worms",
      "Mulch to retain moisture"
    ],
    commonProblems: [
      "Cabbage worms",
      "Aphids",
      "Downy mildew",
      "Club root"
    ],
    harvesting: "Harvest outer leaves when they reach desired size",
    storage: "Refrigerate in a plastic bag with paper towel"
  },
  {
    id: 18,
    name: "Eggplant",
    scientificName: "Solanum melongena",
    growingSeason: "Spring to Summer",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, rich soil",
    pH: "6.0-7.0",
    spacing: "24-36 inches",
    maturity: "70-85 days",
    description: "Eggplants are warm-season vegetables that come in various colors and shapes. They require consistent warmth to thrive.",
    careInstructions: [
      "Start indoors 8-10 weeks before last frost",
      "Transplant after soil warms",
      "Water consistently",
      "Support plants if needed",
      "Fertilize regularly",
      "Mulch to retain moisture"
    ],
    commonProblems: [
      "Flea beetles",
      "Verticillium wilt",
      "Blossom end rot",
      "Poor fruit set"
    ],
    harvesting: "Harvest when fruits are glossy and firm",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 19,
    name: "Beets",
    scientificName: "Beta vulgaris",
    growingSeason: "Spring and Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, loose soil",
    pH: "6.0-7.0",
    spacing: "3-4 inches",
    maturity: "50-70 days",
    description: "Beets are root vegetables that provide both edible roots and nutritious greens. They come in various colors.",
    careInstructions: [
      "Plant in early spring or late summer",
      "Keep soil consistently moist",
      "Thin seedlings early",
      "Fertilize with phosphorus",
      "Mulch to keep soil cool",
      "Harvest when roots are 2-3 inches"
    ],
    commonProblems: [
      "Leaf miners",
      "Root rot",
      "Scab disease",
      "Poor root formation"
    ],
    harvesting: "Harvest when roots are 2-3 inches in diameter",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 20,
    name: "Swiss Chard",
    scientificName: "Beta vulgaris subsp. vulgaris",
    growingSeason: "Spring to Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun to partial shade",
    soilType: "Rich, well-drained soil",
    pH: "6.0-7.0",
    spacing: "6-12 inches",
    maturity: "50-60 days",
    description: "Swiss chard is a colorful leafy green that's both ornamental and nutritious. It's heat-tolerant and can be harvested multiple times.",
    careInstructions: [
      "Plant in early spring or late summer",
      "Water consistently",
      "Harvest outer leaves",
      "Fertilize with nitrogen",
      "Mulch to retain moisture",
      "Protect from leaf miners"
    ],
    commonProblems: [
      "Leaf miners",
      "Aphids",
      "Downy mildew",
      "Bolting in hot weather"
    ],
    harvesting: "Harvest outer leaves when they reach desired size",
    storage: "Refrigerate in a plastic bag with paper towel"
  },
  {
    id: 21,
    name: "Cauliflower",
    scientificName: "Brassica oleracea var. botrytis",
    growingSeason: "Spring and Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Rich, well-drained soil",
    pH: "6.0-7.0",
    spacing: "18-24 inches",
    maturity: "55-100 days",
    description: "Cauliflower is a cool-season vegetable that produces edible white flower heads. It requires consistent care and protection from temperature extremes.",
    careInstructions: [
      "Start indoors 6-8 weeks before last frost",
      "Transplant when seedlings are 4-6 weeks old",
      "Water consistently",
      "Fertilize with nitrogen",
      "Blanch heads by tying leaves",
      "Protect from temperature extremes"
    ],
    commonProblems: [
      "Buttoning (small heads)",
      "Cabbage worms",
      "Club root",
      "Browning of heads"
    ],
    harvesting: "Harvest when heads are firm and white",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 22,
    name: "Pumpkins",
    scientificName: "Cucurbita pepo",
    growingSeason: "Spring to Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, rich soil",
    pH: "6.0-7.0",
    spacing: "36-48 inches",
    maturity: "90-120 days",
    description: "Pumpkins are warm-season vining plants that produce large, colorful fruits. They require plenty of space and consistent moisture.",
    careInstructions: [
      "Plant after last frost",
      "Provide plenty of space",
      "Water consistently",
      "Fertilize regularly",
      "Mulch to retain moisture",
      "Protect from frost"
    ],
    commonProblems: [
      "Powdery mildew",
      "Squash vine borers",
      "Blossom end rot",
      "Poor pollination"
    ],
    harvesting: "Harvest when rind is hard and stem is dry",
    storage: "Store in cool, dry place"
  },
  {
    id: 23,
    name: "Asparagus",
    scientificName: "Asparagus officinalis",
    growingSeason: "Spring",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, sandy soil",
    pH: "6.5-7.5",
    spacing: "12-18 inches",
    maturity: "2-3 years",
    description: "Asparagus is a perennial vegetable that produces edible spears in spring. It requires patience but provides years of harvests.",
    careInstructions: [
      "Prepare deep, rich soil",
      "Plant crowns in spring",
      "Mulch heavily",
      "Fertilize in spring",
      "Cut back ferns in fall",
      "Be patient for first harvest"
    ],
    commonProblems: [
      "Asparagus beetles",
      "Fusarium wilt",
      "Crown rot",
      "Poor spear production"
    ],
    harvesting: "Harvest spears when 6-8 inches tall",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 24,
    name: "Artichokes",
    scientificName: "Cynara cardunculus var. scolymus",
    growingSeason: "Spring to Summer",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, rich soil",
    pH: "6.5-7.5",
    spacing: "36-48 inches",
    maturity: "85-100 days",
    description: "Artichokes are perennial plants grown as annuals in most climates. They produce large, edible flower buds.",
    careInstructions: [
      "Start indoors 8-10 weeks before last frost",
      "Transplant after soil warms",
      "Water consistently",
      "Fertilize regularly",
      "Mulch to retain moisture",
      "Protect from frost"
    ],
    commonProblems: [
      "Aphids",
      "Slugs",
      "Gray mold",
      "Poor bud formation"
    ],
    harvesting: "Harvest when buds are tight and firm",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 25,
    name: "Brussels Sprouts",
    scientificName: "Brassica oleracea var. gemmifera",
    growingSeason: "Spring and Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Rich, well-drained soil",
    pH: "6.0-7.0",
    spacing: "18-24 inches",
    maturity: "80-100 days",
    description: "Brussels sprouts are cool-season vegetables that produce small, cabbage-like heads along the stem. They become sweeter after frost.",
    careInstructions: [
      "Start indoors 6-8 weeks before last frost",
      "Transplant when seedlings are 4-6 weeks old",
      "Water consistently",
      "Fertilize with nitrogen",
      "Remove lower leaves as sprouts form",
      "Protect from cabbage worms"
    ],
    commonProblems: [
      "Cabbage worms",
      "Aphids",
      "Club root",
      "Loose sprouts"
    ],
    harvesting: "Harvest sprouts from bottom up when firm",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 26,
    name: "Sweet Potatoes",
    scientificName: "Ipomoea batatas",
    growingSeason: "Spring to Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, sandy soil",
    pH: "5.5-6.5",
    spacing: "12-18 inches",
    maturity: "90-120 days",
    description: "Sweet potatoes are warm-season root vegetables that produce nutritious, sweet-tasting tubers. They require loose soil and warm temperatures.",
    careInstructions: [
      "Start slips indoors",
      "Plant after soil warms",
      "Water consistently",
      "Fertilize with phosphorus",
      "Mulch to retain moisture",
      "Harvest before frost"
    ],
    commonProblems: [
      "Wireworms",
      "Sweet potato weevils",
      "Root rot",
      "Poor root formation"
    ],
    harvesting: "Harvest when leaves begin to yellow",
    storage: "Cure in warm, humid conditions for 10 days"
  },
  {
    id: 27,
    name: "Leeks",
    scientificName: "Allium ampeloprasum var. porrum",
    growingSeason: "Spring to Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, rich soil",
    pH: "6.0-7.0",
    spacing: "6-8 inches",
    maturity: "100-120 days",
    description: "Leeks are cool-season vegetables that produce long, white stems. They're related to onions but have a milder flavor.",
    careInstructions: [
      "Start indoors 8-10 weeks before last frost",
      "Transplant when pencil-thick",
      "Hill soil around stems",
      "Water consistently",
      "Fertilize with nitrogen",
      "Mulch to keep stems white"
    ],
    commonProblems: [
      "Onion thrips",
      "Rust",
      "Leaf blight",
      "Poor stem formation"
    ],
    harvesting: "Harvest when stems are 1-2 inches in diameter",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 28,
    name: "Fennel",
    scientificName: "Foeniculum vulgare",
    growingSeason: "Spring to Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, rich soil",
    pH: "6.0-7.0",
    spacing: "12-18 inches",
    maturity: "60-90 days",
    description: "Fennel is an aromatic herb that produces edible bulbs, stalks, and seeds. It has a distinctive licorice-like flavor.",
    careInstructions: [
      "Plant in early spring",
      "Water consistently",
      "Fertilize with nitrogen",
      "Hill soil around bulbs",
      "Remove flower stalks",
      "Harvest before flowering"
    ],
    commonProblems: [
      "Aphids",
      "Caterpillars",
      "Root rot",
      "Bolting"
    ],
    harvesting: "Harvest when bulbs are 3-4 inches in diameter",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 29,
    name: "Cabbage",
    scientificName: "Brassica oleracea var. capitata",
    growingSeason: "Spring and Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Rich, well-drained soil",
    pH: "6.0-7.0",
    spacing: "18-24 inches",
    maturity: "70-120 days",
    description: "Cabbage is a cool-season vegetable that forms tight heads of leaves. It comes in various colors and textures.",
    careInstructions: [
      "Start indoors 6-8 weeks before last frost",
      "Transplant when seedlings are 4-6 weeks old",
      "Water consistently",
      "Fertilize with nitrogen",
      "Protect from cabbage worms",
      "Harvest before heads split"
    ],
    commonProblems: [
      "Cabbage worms",
      "Club root",
      "Black rot",
      "Head splitting"
    ],
    harvesting: "Harvest when heads are firm and reach desired size",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 30,
    name: "Celery",
    scientificName: "Apium graveolens",
    growingSeason: "Spring to Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun to partial shade",
    soilType: "Rich, well-drained soil",
    pH: "6.0-7.0",
    spacing: "8-12 inches",
    maturity: "85-120 days",
    description: "Celery is a cool-season vegetable that requires consistent moisture and rich soil. It's high in water content and nutrients.",
    careInstructions: [
      "Start indoors 10-12 weeks before last frost",
      "Transplant when seedlings are 4-6 inches tall",
      "Water frequently",
      "Fertilize regularly",
      "Blanch stalks by wrapping with paper",
      "Mulch to retain moisture"
    ],
    commonProblems: [
      "Leaf blight",
      "Aphids",
      "Stalk rot",
      "Poor stalk formation"
    ],
    harvesting: "Harvest when stalks are crisp and full size",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 31,
    name: "Parsnips",
    scientificName: "Pastinaca sativa",
    growingSeason: "Spring to Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Deep, loose soil",
    pH: "6.0-7.0",
    spacing: "3-4 inches",
    maturity: "100-120 days",
    description: "Parsnips are root vegetables that become sweeter after frost. They require deep, loose soil for proper development.",
    careInstructions: [
      "Plant in early spring",
      "Ensure deep, loose soil",
      "Keep soil consistently moist",
      "Thin seedlings early",
      "Mulch to keep soil cool",
      "Harvest after frost for sweetness"
    ],
    commonProblems: [
      "Root canker",
      "Carrot rust fly",
      "Poor root formation",
      "Forked roots"
    ],
    harvesting: "Harvest after frost when roots are 1-2 inches in diameter",
    storage: "Store in cool, humid conditions or refrigerate"
  },
  {
    id: 32,
    name: "Turnips",
    scientificName: "Brassica rapa subsp. rapa",
    growingSeason: "Spring and Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, loose soil",
    pH: "6.0-7.0",
    spacing: "4-6 inches",
    maturity: "30-60 days",
    description: "Turnips are fast-growing root vegetables that provide both edible roots and nutritious greens. They're perfect for cool weather.",
    careInstructions: [
      "Plant in early spring or late summer",
      "Keep soil consistently moist",
      "Thin seedlings early",
      "Fertilize with phosphorus",
      "Mulch to keep soil cool",
      "Harvest when roots are 2-3 inches"
    ],
    commonProblems: [
      "Root maggots",
      "Club root",
      "Leaf spot",
      "Poor root formation"
    ],
    harvesting: "Harvest when roots are 2-3 inches in diameter",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 33,
    name: "Rutabagas",
    scientificName: "Brassica napus subsp. rapifera",
    growingSeason: "Spring to Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Well-drained, loose soil",
    pH: "6.0-7.0",
    spacing: "6-8 inches",
    maturity: "90-100 days",
    description: "Rutabagas are root vegetables that combine the best qualities of turnips and cabbage. They're larger than turnips and have yellow flesh.",
    careInstructions: [
      "Plant in early spring or late summer",
      "Keep soil consistently moist",
      "Thin seedlings early",
      "Fertilize with phosphorus",
      "Mulch to keep soil cool",
      "Harvest before heavy frost"
    ],
    commonProblems: [
      "Root maggots",
      "Club root",
      "Leaf spot",
      "Poor root formation"
    ],
    harvesting: "Harvest when roots are 4-6 inches in diameter",
    storage: "Store in cool, humid conditions or refrigerate"
  },
  {
    id: 34,
    name: "Kohlrabi",
    scientificName: "Brassica oleracea var. gongylodes",
    growingSeason: "Spring and Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun",
    soilType: "Rich, well-drained soil",
    pH: "6.0-7.0",
    spacing: "6-8 inches",
    maturity: "45-60 days",
    description: "Kohlrabi is a unique vegetable that forms a swollen stem above ground. It has a mild, sweet flavor and can be eaten raw or cooked.",
    careInstructions: [
      "Start indoors or direct sow",
      "Water consistently",
      "Fertilize with nitrogen",
      "Thin seedlings early",
      "Mulch to keep soil cool",
      "Harvest before bulbs become woody"
    ],
    commonProblems: [
      "Cabbage worms",
      "Club root",
      "Aphids",
      "Woody bulbs"
    ],
    harvesting: "Harvest when bulbs are 2-3 inches in diameter",
    storage: "Refrigerate in a plastic bag"
  },
  {
    id: 35,
    name: "Collard Greens",
    scientificName: "Brassica oleracea var. viridis",
    growingSeason: "Spring to Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun to partial shade",
    soilType: "Rich, well-drained soil",
    pH: "6.0-7.0",
    spacing: "12-18 inches",
    maturity: "55-75 days",
    description: "Collard greens are leafy vegetables that are heat-tolerant and can be harvested multiple times. They're rich in nutrients.",
    careInstructions: [
      "Start indoors or direct sow",
      "Water consistently",
      "Fertilize with nitrogen",
      "Harvest outer leaves",
      "Protect from cabbage worms",
      "Mulch to retain moisture"
    ],
    commonProblems: [
      "Cabbage worms",
      "Aphids",
      "Downy mildew",
      "Club root"
    ],
    harvesting: "Harvest outer leaves when they reach desired size",
    storage: "Refrigerate in a plastic bag with paper towel"
  },
  {
    id: 36,
    name: "Bok Choy",
    scientificName: "Brassica rapa subsp. chinensis",
    growingSeason: "Spring and Fall",
    waterNeeds: "Regular",
    sunlight: "Full sun to partial shade",
    soilType: "Rich, well-drained soil",
    pH: "6.0-7.0",
    spacing: "6-12 inches",
    maturity: "30-50 days",
    description: "Bok choy is an Asian green that forms loose heads of tender leaves and crisp stems. It's fast-growing and versatile.",
    careInstructions: [
      "Start indoors or direct sow",
      "Water consistently",
      "Fertilize with nitrogen",
      "Thin seedlings early",
      "Protect from flea beetles",
      "Harvest before bolting"
    ],
    commonProblems: [
      "Flea beetles",
      "Cabbage worms",
      "Downy mildew",
      "Bolting"
    ],
    harvesting: "Harvest when heads are firm and leaves are tender",
    storage: "Refrigerate in a plastic bag"
  }
];

function CropDetails() {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const filteredCrops = cropData.filter(crop =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCropClick = (crop) => {
    setSelectedCrop(crop);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCrop(null);
  };

  const handleSearch = () => {
    setIsSearching(true);
    // Reset search after a short delay
    setTimeout(() => setIsSearching(false), 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="crop-details-container">
      <BackButton />
      <div className="crop-details-header">
        <h2>Crop Information Database</h2>
        <p>Comprehensive guide to various crops and their cultivation requirements</p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search crops by name or scientific name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
          />
          <button 
            className={`search-button ${isSearching ? 'searching' : ''}`}
            onClick={handleSearch}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
        {searchTerm && (
          <p className="search-results-count">
            Found {filteredCrops.length} crops matching your search
          </p>
        )}
      </div>

      <div className="crops-grid">
        {filteredCrops.map((crop) => (
          <div
            key={crop.id}
            className="crop-card"
            onClick={() => handleCropClick(crop)}
          >
            <h3>{crop.name}</h3>
            <p className="scientific-name">{crop.scientificName}</p>
            <div className="crop-basic-info">
              <p><strong>Growing Season:</strong> {crop.growingSeason}</p>
              <p><strong>Water Needs:</strong> {crop.waterNeeds}</p>
              <p><strong>Sunlight:</strong> {crop.sunlight}</p>
              <p><strong>Soil Type:</strong> {crop.soilType}</p>
            </div>
            <p className="crop-description">{crop.description}</p>
          </div>
        ))}
      </div>

      {showModal && selectedCrop && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2>{selectedCrop.name}</h2>
            <p className="scientific-name">{selectedCrop.scientificName}</p>
            
            <div className="modal-sections">
              <section className="modal-section">
                <h3>Basic Information</h3>
                <div className="info-grid">
                  <div><strong>Growing Season:</strong> {selectedCrop.growingSeason}</div>
                  <div><strong>Water Needs:</strong> {selectedCrop.waterNeeds}</div>
                  <div><strong>Sunlight:</strong> {selectedCrop.sunlight}</div>
                  <div><strong>Soil Type:</strong> {selectedCrop.soilType}</div>
                  <div><strong>Soil pH:</strong> {selectedCrop.pH}</div>
                  <div><strong>Plant Spacing:</strong> {selectedCrop.spacing}</div>
                  <div><strong>Days to Maturity:</strong> {selectedCrop.maturity}</div>
                </div>
              </section>

              <section className="modal-section">
                <h3>Description</h3>
                <p>{selectedCrop.description}</p>
              </section>

              <section className="modal-section">
                <h3>Care Instructions</h3>
                <ul>
                  {selectedCrop.careInstructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </section>

              <section className="modal-section">
                <h3>Common Problems</h3>
                <ul>
                  {selectedCrop.commonProblems.map((problem, index) => (
                    <li key={index}>{problem}</li>
                  ))}
                </ul>
              </section>

              <section className="modal-section">
                <h3>Harvesting & Storage</h3>
                <p><strong>Harvesting:</strong> {selectedCrop.harvesting}</p>
                <p><strong>Storage:</strong> {selectedCrop.storage}</p>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CropDetails;