const products = [
    {
        "title": "naranjas",
        "description": "naranjas de Argentina",
        "code": "KWI-NZL-004",
        "price": 200,
        "status": true,
        "stock": 100,
        "category": "frutas",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_orange-512.png"
    },
    {
        "title": "manzanas",
        "description": "manzanas de Argentina",
        "code": "KWI-NZL-005",
        "price": 300,
        "status": true,
        "stock": 100,
        "category": "frutas",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_apple-512.png"
    },
    {
        "title": "peras",
        "description": "peras de Argentina",
        "code": "KWI-NZL-006",
        "price": 400,
        "status": true,
        "stock": 100,
        "category": "frutas",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_pear-512.png"
    },
    {
        "title": "bananas",
        "description": "bananas de Argentina",
        "code": "KWI-NZL-007",
        "price": 500,
        "status": true,
        "stock": 100,
        "category": "frutas",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_banana-512.png"
    },
    {
        "title": "limones",
        "description": "limones de Argentina",
        "code": "KWI-NZL-008",
        "price": 600,
        "status": true,
        "stock": 100,
        "category": "frutas",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_lemon-512.png",
        "__v": 0
    },
    {
        "title": "tomates",
        "description": "tomates de Argentina",
        "code": "KWI-NZL-009",
        "price": 500,
        "status": true,
        "stock": 100,
        "category": "verduras",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_tomato-512.png"
    },
    {
        "title": "papas",
        "description": "papas de Argentina",
        "code": "KWI-NZL-010",
        "price": 300,
        "status": true,
        "stock": 100,
        "category": "verduras",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_potato-512.png"
    },
    {
        "title": "cebollas",
        "description": "cebollas de Argentina",
        "code": "KWI-NZL-011",
        "price": 250,
        "status": true,
        "stock": 100,
        "category": "verduras",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_onion-512.png"
    },
    {
        "title": "zanahorias",
        "description": "zanahorias de Argentina",
        "code": "KWI-NZL-012",
        "price": 300,
        "status": true,
        "stock": 100,
        "category": "verduras",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_carrot-512.png"
    },
    {
        "title": "lechugas",
        "description": "lechugas de Argentina",
        "code": "KWI-NZL-013",
        "price": 450,
        "status": true,
        "stock": 100,
        "category": "verduras",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_lettuce-512.png"
    },
    {
        "title": "leche",
        "description": "leche de Argentina",
        "code": "KWI-NZL-014",
        "price": 500,
        "status": true,
        "stock": 100,
        "category": "lacteos",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_milk-512.png"
    },
    {
        "title": "queso",
        "description": "queso de Argentina",
        "code": "KWI-NZL-015",
        "price": 300,
        "status": true,
        "stock": 100,
        "category": "lacteos",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_cheese-512.png"
    },
    {
        "title": "manteca",
        "description": "manteca de Argentina",
        "code": "KWI-NZL-016",
        "price": 350,
        "status": true,
        "stock": 100,
        "category": "lacteos",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_butter-512.png"
    },
    {
        "title": "yogurt",
        "description": "yogurt de Argentina",
        "code": "KWI-NZL-017",
        "price": 400,
        "status": true,
        "stock": 100,
        "category": "lacteos",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_yogurt-512.png"
    },
    {
        "title": "crema",
        "description": "crema de Argentina",
        "code": "KWI-NZL-018",
        "price": 250,
        "status": true,
        "stock": 100,
        "category": "lacteos",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_cream-512.png"
    },
    {
        "title": "pan",
        "description": "pan de Argentina",
        "code": "KWI-NZL-019",
        "price": 150,
        "status": true,
        "stock": 100,
        "category": "panificados",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_bread-512.png"
    },
    {
        "title": "galletitas",
        "description": "galletitas de Argentina",
        "code": "KWI-NZL-020",
        "price": 350,
        "status": true,
        "stock": 100,
        "category": "panificados",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_cookie-512.png"
    },
    {
        "title": "torta",
        "description": "torta de Argentina",
        "code": "KWI-NZL-021",
        "price": 800,
        "status": true,
        "stock": 100,
        "category": "panificados",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_cake-512.png"
    },
    {
        "title": "facturas",
        "description": "facturas de Argentina",
        "code": "KWI-NZL-022",
        "price": 600,
        "status": true,
        "stock": 100,
        "category": "panificados",
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_pastry-512.png"
    }
]

export default products;