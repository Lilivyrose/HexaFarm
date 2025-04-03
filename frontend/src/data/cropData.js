const cropData = [
    {
        id: 1,
        name: "Tomato",
        scientificName: "Solanum lycopersicum",
        growthDuration: "60-80 days",
        wateringNeeds: "Regular watering, keep soil moist",
        sunlight: "Full sun (6-8 hours daily)",
        soilType: "Well-draining, rich in organic matter",
        spacing: "18-36 inches apart",
        description: "Tomatoes are warm-season vegetables that are rich in vitamins C and K, potassium, and antioxidants. They can be grown in gardens or containers, making them perfect for both small and large spaces.",
        imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3",
        season: "Summer",
        careInstructions: [
            "Water deeply and regularly",
            "Provide support through caging or staking",
            "Remove suckers for indeterminate varieties",
            "Monitor for pests and diseases",
            "Feed with balanced fertilizer every 4-6 weeks"
        ],
        commonProblems: [
            "Blossom end rot",
            "Early blight",
            "Late blight",
            "Leaf spot",
            "Fruit cracking"
        ],
        harvestTips: "Harvest when fruits are firm and fully colored but still slightly soft to touch. Pick regularly to encourage more production."
    },
    {
        id: 2,
        name: "Spinach",
        scientificName: "Spinacia oleracea",
        growthDuration: "40-50 days",
        wateringNeeds: "Consistent moisture, don't let soil dry out",
        sunlight: "Partial to full sun",
        soilType: "Rich, well-draining soil with high organic matter",
        spacing: "3-5 inches apart",
        description: "Spinach is a nutrient-rich leafy green vegetable that's easy to grow in cool weather. It's packed with iron, vitamins, and minerals.",
        imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3",
        season: "Spring/Fall",
        careInstructions: [
            "Water regularly to maintain moisture",
            "Mulch to keep soil cool",
            "Harvest outer leaves as needed",
            "Protect from extreme heat",
            "Fertilize monthly with nitrogen-rich fertilizer"
        ],
        commonProblems: [
            "Bolting in hot weather",
            "Leaf miners",
            "Downy mildew",
            "Aphids",
            "Root rot"
        ],
        harvestTips: "Harvest outer leaves when they're large enough to eat, or cut the whole plant at the base for a one-time harvest."
    },
    {
        id: 3,
        name: "Bell Pepper",
        scientificName: "Capsicum annuum",
        growthDuration: "60-90 days",
        wateringNeeds: "Moderate, consistent moisture",
        sunlight: "Full sun",
        soilType: "Rich, well-draining soil",
        spacing: "18-24 inches apart",
        description: "Bell peppers are sweet, crisp vegetables that come in various colors. They're rich in vitamins C and A, and are versatile in cooking.",
        imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3",
        season: "Summer",
        careInstructions: [
            "Maintain consistent moisture",
            "Support plants as they grow",
            "Feed with balanced fertilizer",
            "Protect from extreme temperatures",
            "Remove first flowers for stronger plants"
        ],
        commonProblems: [
            "Blossom end rot",
            "Sunscald",
            "Aphids",
            "Bacterial spot",
            "Fruit rot"
        ],
        harvestTips: "Harvest when peppers reach desired size and color. Green peppers will turn red, yellow, or orange if left on the plant longer."
    },
    {
        id: 4,
        name: "Carrot",
        scientificName: "Daucus carota",
        growthDuration: "70-80 days",
        wateringNeeds: "Regular, consistent moisture",
        sunlight: "Full sun to partial shade",
        soilType: "Deep, loose, well-draining soil",
        spacing: "2-3 inches apart",
        description: "Carrots are root vegetables rich in beta carotene and fiber. They're satisfying to grow and come in various colors and sizes.",
        imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3",
        season: "Spring/Fall",
        careInstructions: [
            "Keep soil consistently moist",
            "Thin seedlings to prevent overcrowding",
            "Mulch to retain moisture",
            "Avoid high-nitrogen fertilizers",
            "Keep soil free from rocks"
        ],
        commonProblems: [
            "Forking roots",
            "Carrot rust fly",
            "Root knot nematodes",
            "Leaf blight",
            "Splitting"
        ],
        harvestTips: "Harvest when roots reach desired size, typically when the top is 1/2 to 3/4 inch in diameter. Loosen soil before pulling."
    },
    {
        id: 5,
        name: "Basil",
        scientificName: "Ocimum basilicum",
        growthDuration: "50-75 days",
        wateringNeeds: "Moderate, allow soil to dry slightly between watering",
        sunlight: "Full sun",
        soilType: "Rich, well-draining soil",
        spacing: "12-18 inches apart",
        description: "Basil is a fragrant herb essential in many cuisines. It's easy to grow and perfect for containers or gardens.",
        imageUrl: "https://images.unsplash.com/photo-1618375531912-867984bdfd87?ixlib=rb-4.0.3",
        season: "Spring/Summer",
        careInstructions: [
            "Pinch off flower buds",
            "Harvest regularly to promote growth",
            "Protect from cold",
            "Maintain good air circulation",
            "Feed monthly with balanced fertilizer"
        ],
        commonProblems: [
            "Downy mildew",
            "Leaf spot",
            "Aphids",
            "Root rot",
            "Fusarium wilt"
        ],
        harvestTips: "Harvest leaves regularly, cutting stems back to promote bushier growth. Best flavor when harvested before flowering."
    },
    {
        id: 6,
        name: "Lettuce",
        scientificName: "Lactuca sativa",
        growthDuration: "45-65 days",
        wateringNeeds: "Regular watering, keep soil moist",
        sunlight: "Partial to full sun",
        soilType: "Rich, well-draining soil",
        spacing: "6-12 inches apart",
        description: "Lettuce is a cool-season crop that's easy to grow and perfect for salads. Multiple varieties offer different textures and flavors.",
        imageUrl: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3",
        season: "Spring/Fall",
        careInstructions: [
            "Water consistently",
            "Mulch to keep roots cool",
            "Protect from extreme heat",
            "Succession plant every 2 weeks",
            "Thin seedlings appropriately"
        ],
        commonProblems: [
            "Bolting",
            "Tip burn",
            "Aphids",
            "Slugs",
            "Bottom rot"
        ],
        harvestTips: "Harvest outer leaves as needed or cut whole head at base. Best harvested in cool morning hours."
    }
];

export default cropData; 