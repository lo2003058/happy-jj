export interface RecipeList {
    language: "en" | "fr" | "zh-HK" | "zh-TW" | "zh-CN"
    items: Recipe[]
}

export interface Recipe {
    name: string,
    steps: string[]
    ingredients: Ingredients[]
    time: Time
    difficulty: "easy" | "medium" | "hard"
    tags: string[]
}

export interface Ingredients {
    name: string,
    quantity: number,
    unit: string
}

export interface Time {
    time: number
    unit: string
}

const recipeList: RecipeList[] = [
    // English Recipes
    {
        language: "en",
        items: [
            {
                name: "Ginger Red Date Tea",
                steps: [
                    "Slice the ginger.",
                    "Pit and slice the red dates.",
                    "Boil water in a pot.",
                    "Add ginger and red dates.",
                    "Simmer for 10 minutes.",
                    "Strain and serve warm."
                ],
                ingredients: [
                    {name: "Ginger", quantity: 10, unit: "g"},
                    {name: "Red dates", quantity: 5, unit: "pieces"},
                    {name: "Water", quantity: 500, unit: "ml"}
                ],
                time: {time: 15, unit: "minutes"},
                difficulty: "easy",
                tags: ["menstruation", "warm", "relief"]
            },
            {
                name: "Warm Chicken Broth",
                steps: [
                    "Prepare chicken pieces.",
                    "Chop ginger and garlic.",
                    "Boil water in a large pot.",
                    "Add chicken, ginger, and garlic.",
                    "Simmer for 30 minutes.",
                    "Season with salt and serve warm."
                ],
                ingredients: [
                    {name: "Chicken", quantity: 200, unit: "g"},
                    {name: "Ginger", quantity: 10, unit: "g"},
                    {name: "Garlic", quantity: 3, unit: "cloves"},
                    {name: "Water", quantity: 800, unit: "ml"}
                ],
                time: {time: 40, unit: "minutes"},
                difficulty: "easy",
                tags: ["menstruation", "comfort", "soup"]
            },
            {
                name: "Spinach and Tofu Soup",
                steps: [
                    "Boil water.",
                    "Add tofu cubes and simmer for 5 minutes.",
                    "Add spinach leaves.",
                    "Cook until spinach wilts.",
                    "Season with salt and pepper, then serve."
                ],
                ingredients: [
                    {name: "Tofu", quantity: 150, unit: "g"},
                    {name: "Spinach", quantity: 100, unit: "g"},
                    {name: "Water", quantity: 600, unit: "ml"}
                ],
                time: {time: 20, unit: "minutes"},
                difficulty: "easy",
                tags: ["menstruation", "light", "soup"]
            },
            {
                name: "Oatmeal with Cinnamon and Honey",
                steps: [
                    "Boil milk or water.",
                    "Add oats and cook for 5 minutes.",
                    "Stir in cinnamon and honey.",
                    "Mix well and serve warm."
                ],
                ingredients: [
                    {name: "Oats", quantity: 50, unit: "g"},
                    {name: "Milk", quantity: 200, unit: "ml"},
                    {name: "Cinnamon", quantity: 1, unit: "tsp"},
                    {name: "Honey", quantity: 1, unit: "tbsp"}
                ],
                time: {time: 10, unit: "minutes"},
                difficulty: "easy",
                tags: ["menstruation", "breakfast", "warm"]
            },
            {
                name: "Banana Walnut Smoothie",
                steps: [
                    "Peel the banana.",
                    "Combine banana, walnuts, and warm milk in a blender.",
                    "Blend until smooth.",
                    "Serve immediately at room temperature."
                ],
                ingredients: [
                    {name: "Banana", quantity: 1, unit: "piece"},
                    {name: "Walnuts", quantity: 30, unit: "g"},
                    {name: "Milk", quantity: 150, unit: "ml"}
                ],
                time: {time: 5, unit: "minutes"},
                difficulty: "easy",
                tags: ["menstruation", "smoothie", "nutritious"]
            }
        ]
    },
    // French Recipes
    {
        language: "fr",
        items: [
            {
                name: "Thé au Gingembre et aux Dattes",
                steps: [
                    "Tranchez le gingembre.",
                    "Dénoyautez et tranchez les dattes.",
                    "Faites bouillir de l'eau.",
                    "Ajoutez le gingembre et les dattes.",
                    "Laissez mijoter 10 minutes.",
                    "Filtrez et servez chaud."
                ],
                ingredients: [
                    {name: "Gingembre", quantity: 10, unit: "g"},
                    {name: "Dattes", quantity: 5, unit: "pièces"},
                    {name: "Eau", quantity: 500, unit: "ml"}
                ],
                time: {time: 15, unit: "minutes"},
                difficulty: "easy",
                tags: ["menstruation", "chaleureux", "thé"]
            },
            {
                name: "Bouillon de Poulet Réconfortant",
                steps: [
                    "Préparez des morceaux de poulet.",
                    "Hachez le gingembre et l'ail.",
                    "Faites bouillir de l'eau dans une grande casserole.",
                    "Ajoutez le poulet, le gingembre et l'ail.",
                    "Laissez mijoter pendant 30 minutes.",
                    "Assaisonnez avec du sel et servez chaud."
                ],
                ingredients: [
                    {name: "Poulet", quantity: 200, unit: "g"},
                    {name: "Gingembre", quantity: 10, unit: "g"},
                    {name: "Ail", quantity: 3, unit: "gousses"},
                    {name: "Eau", quantity: 800, unit: "ml"}
                ],
                time: {time: 40, unit: "minutes"},
                difficulty: "easy",
                tags: ["menstruation", "soupe", "réconfort"]
            },
            {
                name: "Soupe aux Épinards et au Tofu",
                steps: [
                    "Faites bouillir de l'eau.",
                    "Ajoutez les cubes de tofu et laissez cuire 5 minutes.",
                    "Ajoutez les épinards.",
                    "Laissez mijoter jusqu'à ce que les épinards flétrissent.",
                    "Assaisonnez et servez."
                ],
                ingredients: [
                    {name: "Tofu", quantity: 150, unit: "g"},
                    {name: "Épinards", quantity: 100, unit: "g"},
                    {name: "Eau", quantity: 600, unit: "ml"}
                ],
                time: {time: 20, unit: "minutes"},
                difficulty: "easy",
                tags: ["menstruation", "légère", "soupe"]
            },
            {
                name: "Porridge d'Avoine à la Cannelle et Miel",
                steps: [
                    "Faites chauffer du lait ou de l'eau.",
                    "Ajoutez les flocons d'avoine et cuisez pendant 5 minutes.",
                    "Incorporez la cannelle et le miel.",
                    "Mélangez bien et servez chaud."
                ],
                ingredients: [
                    {name: "Avoine", quantity: 50, unit: "g"},
                    {name: "Lait", quantity: 200, unit: "ml"},
                    {name: "Cannelle", quantity: 1, unit: "c. à café"},
                    {name: "Miel", quantity: 1, unit: "c. à soupe"}
                ],
                time: {time: 10, unit: "minutes"},
                difficulty: "easy",
                tags: ["menstruation", "petit-déjeuner", "chaleureux"]
            },
            {
                name: "Smoothie à la Banane et aux Noix",
                steps: [
                    "Épluchez la banane.",
                    "Mettez la banane, les noix et le lait tiède dans un mixeur.",
                    "Mixez jusqu'à obtenir une texture lisse.",
                    "Servez immédiatement à température ambiante."
                ],
                ingredients: [
                    {name: "Banane", quantity: 1, unit: "pièce"},
                    {name: "Noix", quantity: 30, unit: "g"},
                    {name: "Lait", quantity: 150, unit: "ml"}
                ],
                time: {time: 5, unit: "minutes"},
                difficulty: "easy",
                tags: ["menstruation", "smoothie", "nutritif"]
            }
        ]
    },
    // zh-HK Recipes
    {
        language: "zh-HK",
        items: [
            {
                name: "薑棗茶",
                steps: [
                    "切薑片。",
                    "去核並切棗子。",
                    "將水煮沸。",
                    "加入薑片及棗子。",
                    "小火煮10分鐘。",
                    "過濾後溫飲。"
                ],
                ingredients: [
                    {name: "薑", quantity: 10, unit: "克"},
                    {name: "棗子", quantity: 5, unit: "粒"},
                    {name: "水", quantity: 500, unit: "毫升"}
                ],
                time: {time: 15, unit: "minutes"},
                difficulty: "easy",
                tags: ["月經", "暖身", "茶飲"]
            },
            {
                name: "暖雞湯",
                steps: [
                    "準備雞肉塊。",
                    "切薑同蒜。",
                    "將水煮滾。",
                    "加入雞肉、薑同蒜。",
                    "小火煮30分鐘。",
                    "加鹽調味後即上碟。"
                ],
                ingredients: [
                    {name: "雞肉", quantity: 200, unit: "克"},
                    {name: "薑", quantity: 10, unit: "克"},
                    {name: "蒜", quantity: 3, unit: "瓣"},
                    {name: "水", quantity: 800, unit: "毫升"}
                ],
                time: {time: 40, unit: "minutes"},
                difficulty: "easy",
                tags: ["月經", "湯品", "暖身"]
            },
            {
                name: "菠菜豆腐湯",
                steps: [
                    "將水煮沸。",
                    "加入豆腐塊煮5分鐘。",
                    "加入菠菜。",
                    "待菠菜變軟後調味上碟。"
                ],
                ingredients: [
                    {name: "豆腐", quantity: 150, unit: "克"},
                    {name: "菠菜", quantity: 100, unit: "克"},
                    {name: "水", quantity: 600, unit: "毫升"}
                ],
                time: {time: 20, unit: "minutes"},
                difficulty: "easy",
                tags: ["月經", "湯品", "輕食"]
            },
            {
                name: "燕麥粥加肉桂蜜糖",
                steps: [
                    "加熱牛奶或水。",
                    "加入燕麥煮5分鐘。",
                    "拌入肉桂粉及蜜糖。",
                    "充分混合後熱食。"
                ],
                ingredients: [
                    {name: "燕麥", quantity: 50, unit: "克"},
                    {name: "牛奶", quantity: 200, unit: "毫升"},
                    {name: "肉桂粉", quantity: 1, unit: "茶匙"},
                    {name: "蜜糖", quantity: 1, unit: "湯匙"}
                ],
                time: {time: 10, unit: "minutes"},
                difficulty: "easy",
                tags: ["月經", "早餐", "暖身"]
            },
            {
                name: "香蕉核桃奶昔",
                steps: [
                    "剝香蕉皮。",
                    "將香蕉、核桃及溫牛奶放入果汁機中。",
                    "打至順滑。",
                    "室溫下即食。"
                ],
                ingredients: [
                    {name: "香蕉", quantity: 1, unit: "支"},
                    {name: "核桃", quantity: 30, unit: "克"},
                    {name: "牛奶", quantity: 150, unit: "毫升"}
                ],
                time: {time: 5, unit: "minutes"},
                difficulty: "easy",
                tags: ["月經", "奶昔", "營養"]
            }
        ]
    },
    // zh-TW Recipes
    {
        language: "zh-TW",
        items: [
            {
                name: "薑棗茶",
                steps: [
                    "切薑片。",
                    "去核並切棗子。",
                    "煮沸水。",
                    "放入薑片與棗子。",
                    "小火煮約10分鐘。",
                    "濾出後溫飲。"
                ],
                ingredients: [
                    {name: "薑", quantity: 10, unit: "克"},
                    {name: "棗子", quantity: 5, unit: "顆"},
                    {name: "水", quantity: 500, unit: "毫升"}
                ],
                time: {time: 15, unit: "minutes"},
                difficulty: "easy",
                tags: ["月經", "暖身", "茶飲"]
            },
            {
                name: "溫雞湯",
                steps: [
                    "準備雞肉塊。",
                    "切薑與蒜。",
                    "水煮滾後放入所有材料。",
                    "小火煮約30分鐘。",
                    "加鹽調味後即可享用。"
                ],
                ingredients: [
                    {name: "雞肉", quantity: 200, unit: "克"},
                    {name: "薑", quantity: 10, unit: "克"},
                    {name: "蒜", quantity: 3, unit: "瓣"},
                    {name: "水", quantity: 800, unit: "毫升"}
                ],
                time: {time: 40, unit: "minutes"},
                difficulty: "easy",
                tags: ["月經", "湯品", "暖身"]
            },
            {
                name: "菠菜豆腐湯",
                steps: [
                    "將水煮沸。",
                    "加入豆腐塊煮約5分鐘。",
                    "放入菠菜，待軟化後調味。"
                ],
                ingredients: [
                    {name: "豆腐", quantity: 150, unit: "克"},
                    {name: "菠菜", quantity: 100, unit: "克"},
                    {name: "水", quantity: 600, unit: "毫升"}
                ],
                time: {time: 20, unit: "minutes"},
                difficulty: "easy",
                tags: ["月經", "湯品", "輕食"]
            },
            {
                name: "燕麥粥加肉桂蜂蜜",
                steps: [
                    "加熱牛奶或水。",
                    "加入燕麥煮約5分鐘。",
                    "拌入肉桂粉和蜂蜜。",
                    "充分攪拌後熱食。"
                ],
                ingredients: [
                    {name: "燕麥", quantity: 50, unit: "克"},
                    {name: "牛奶", quantity: 200, unit: "毫升"},
                    {name: "肉桂粉", quantity: 1, unit: "茶匙"},
                    {name: "蜂蜜", quantity: 1, unit: "湯匙"}
                ],
                time: {time: 10, unit: "minutes"},
                difficulty: "easy",
                tags: ["月經", "早餐", "暖身"]
            },
            {
                name: "香蕉核桃奶昔",
                steps: [
                    "剝除香蕉皮。",
                    "將香蕉、核桃及溫牛奶放入果汁機。",
                    "打至順滑。",
                    "室溫下飲用。"
                ],
                ingredients: [
                    {name: "香蕉", quantity: 1, unit: "根"},
                    {name: "核桃", quantity: 30, unit: "克"},
                    {name: "牛奶", quantity: 150, unit: "毫升"}
                ],
                time: {time: 5, unit: "minutes"},
                difficulty: "easy",
                tags: ["月經", "奶昔", "營養"]
            }
        ]
    },
    // zh-CN Recipes
    {
        language: "zh-CN",
        items: [
            {
                name: "姜枣茶",
                steps: [
                    "切姜片。",
                    "去核并切枣子。",
                    "将水煮沸。",
                    "加入姜片和枣子。",
                    "小火煮10分钟。",
                    "过滤后温饮。"
                ],
                ingredients: [
                    {name: "姜", quantity: 10, unit: "克"},
                    {name: "枣子", quantity: 5, unit: "个"},
                    {name: "水", quantity: 500, unit: "毫升"}
                ],
                time: {time: 15, unit: "minutes"},
                difficulty: "easy",
                tags: ["月经", "暖身", "茶饮"]
            },
            {
                name: "暖鸡汤",
                steps: [
                    "准备鸡肉块。",
                    "切姜和蒜。",
                    "将水煮沸。",
                    "加入鸡肉、姜和蒜。",
                    "小火煮30分钟。",
                    "加盐调味后即可食用。"
                ],
                ingredients: [
                    {name: "鸡肉", quantity: 200, unit: "克"},
                    {name: "姜", quantity: 10, unit: "克"},
                    {name: "蒜", quantity: 3, unit: "瓣"},
                    {name: "水", quantity: 800, unit: "毫升"}
                ],
                time: {time: 40, unit: "minutes"},
                difficulty: "easy",
                tags: ["月经", "汤品", "暖身"]
            },
            {
                name: "菠菜豆腐汤",
                steps: [
                    "将水煮沸。",
                    "加入豆腐块煮5分钟。",
                    "加入菠菜叶。",
                    "待菠菜变软后调味。"
                ],
                ingredients: [
                    {name: "豆腐", quantity: 150, unit: "克"},
                    {name: "菠菜", quantity: 100, unit: "克"},
                    {name: "水", quantity: 600, unit: "毫升"}
                ],
                time: {time: 20, unit: "minutes"},
                difficulty: "easy",
                tags: ["月经", "汤品", "轻食"]
            },
            {
                name: "燕麦粥配肉桂蜂蜜",
                steps: [
                    "加热牛奶或水。",
                    "加入燕麦煮5分钟。",
                    "拌入肉桂粉和蜂蜜。",
                    "充分混合后趁热食用。"
                ],
                ingredients: [
                    {name: "燕麦", quantity: 50, unit: "克"},
                    {name: "牛奶", quantity: 200, unit: "毫升"},
                    {name: "肉桂粉", quantity: 1, unit: "茶匙"},
                    {name: "蜂蜜", quantity: 1, unit: "汤匙"}
                ],
                time: {time: 10, unit: "minutes"},
                difficulty: "easy",
                tags: ["月经", "早餐", "暖身"]
            },
            {
                name: "香蕉核桃奶昔",
                steps: [
                    "剥去香蕉皮。",
                    "将香蕉、核桃和温牛奶放入搅拌机中。",
                    "搅拌至顺滑。",
                    "立即饮用。"
                ],
                ingredients: [
                    {name: "香蕉", quantity: 1, unit: "根"},
                    {name: "核桃", quantity: 30, unit: "克"},
                    {name: "牛奶", quantity: 150, unit: "毫升"}
                ],
                time: {time: 5, unit: "minutes"},
                difficulty: "easy",
                tags: ["月经", "奶昔", "营养"]
            }
        ]
    }
]

export default recipeList

export function getRecipeTypeList(t: (key: string, params?: Record<string, any>) => string) {
    return [
        {label: t('cookAdvice.recipeType.all'), value: 'all'},
        {label: t('cookAdvice.recipeType.breakfast'), value: 'breakfast'},
        {label: t('cookAdvice.recipeType.lunch'), value: 'lunch'},
        {label: t('cookAdvice.recipeType.dinner'), value: 'dinner'},
        {label: t('cookAdvice.recipeType.snack'), value: 'snack'},
        {label: t('cookAdvice.recipeType.dessert'), value: 'dessert'},
        {label: t('cookAdvice.recipeType.drink'), value: 'drink'}
    ];
}

export function getRecipeDifficultyList(t: (key: string, params?: Record<string, any>) => string) {
    return [
        {label: t('difficulty.all'), value: 'all'},
        {label: t('difficulty.easy'), value: 'easy'},
        {label: t('difficulty.medium'), value: 'medium'},
        {label: t('difficulty.hard'), value: 'hard'}
    ];
}

export function getTimeTypeList(t: (key: string, params?: Record<string, any>) => string) {
    return [
        {label: t('time.all'), value: 'all'},
        {label: t('time.short'), value: 'short'},
        {label: t('time.medium'), value: 'medium'},
        {label: t('time.long'), value: 'long'}
    ];
}
