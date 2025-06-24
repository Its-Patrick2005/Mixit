const foodList = [
  {
    id: "breakfast1",
    name: "Pancakes",
    image: "https://www.allrecipes.com/thmb/FE0PiuuR0Uh06uVh1c2AsKjRGbc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21014-Good-old-Fashioned-Pancakes-mfs_002-0e249c95678f446291ebc9408ae64c05.jpg",
    rating: 4.5,
    ingredients: ["Flour", "Milk", "Eggs", "Sugar", "Baking Powder", "Butter"],
    method: [
      "Mix dry ingredients in a bowl.",
      "Whisk in milk, eggs, and melted butter until smooth.",
      "Preheat a griddle or pan over medium heat.",
      "Pour batter and cook until bubbles form.",
      "Flip and cook until golden brown.",
      "Serve with syrup or toppings."
    ],
    funFact: "The first pancakes were made over 30,000 years ago on hot stones!"
  },
  {
    id: "lunch1",
    name: "Grilled Chicken Salad",
    image: "https://somuchfoodblog.com/wp-content/uploads/2022/07/chicken-green-salad4.jpg",
    rating: 4.7,
    ingredients: ["Grilled Chicken", "Lettuce", "Tomatoes", "Cucumbers", "Olive Oil", "Lemon Juice"],
    method: [
      "Grill the chicken until cooked through.",
      "Chop lettuce, tomatoes, and cucumbers.",
      "Slice grilled chicken into strips.",
      "Toss vegetables and chicken in a bowl.",
      "Drizzle olive oil and lemon juice on top.",
      "Mix well and serve fresh."
    ],
    funFact: "Salads were a popular dish in ancient Roman times!"
  },
  {
    id: "supper1",
    name: "Spaghetti Bolognese",
    image: "https://www.slimmingeats.com/blog/wp-content/uploads/2010/04/spaghetti-bolognese-36-720x720.jpg",
    rating: 4.3,
    ingredients: ["Spaghetti", "Ground Beef", "Tomato Sauce", "Onion", "Garlic", "Herbs"],
    method: [
      "Boil spaghetti according to package instructions.",
      "Sauté onions and garlic until soft.",
      "Add ground beef and cook until browned.",
      "Pour in tomato sauce and herbs.",
      "Simmer sauce for 15–20 minutes.",
      "Serve sauce over drained spaghetti."
    ],
    funFact: "Traditional Bolognese sauce actually uses very little tomato!"
  },
  {
    id: "dessert1",
    name: "Chocolate Cake",
    image: "https://butternutbakeryblog.com/wp-content/uploads/2023/04/chocolate-cake.jpg",
    rating: 4.9,
    ingredients: ["Flour", "Cocoa Powder", "Eggs", "Sugar", "Butter", "Baking Powder"],
    method: [
      "Preheat oven to 350°F (175°C).",
      "Mix dry ingredients in one bowl.",
      "Mix wet ingredients in another bowl.",
      "Combine wet and dry ingredients.",
      "Pour into a greased cake pan.",
      "Bake for 30–35 minutes.",
      "Cool and frost as desired."
    ],
    funFact: "Chocolate cake became popular in the U.S. in the late 1800s."
  },
  {
    id: "breakfast2",
    name: "Omelette",
    image: "https://www.blueband.com/en-pk/-/media/Project/Upfield/Brands/Blue-Band/Blue-Band-PK/Assets/Recipes/Web-banner-3.jpg?rev=e6eef31a2aa84da8bf62a5a578c5b90a&w=1600",
    rating: 4.2,
    ingredients: ["Eggs", "Salt", "Pepper", "Vegetables", "Cheese"],
    method: [
      "Crack eggs into a bowl and beat with salt and pepper.",
      "Heat oil in a non-stick skillet.",
      "Pour eggs into the pan and spread evenly.",
      "Add vegetables and cheese on one half.",
      "Fold the omelette over and cook until set.",
      "Slide onto a plate and serve warm."
    ],
    funFact: "Napoleon's army inspired the creation of the first giant omelette festival in France!"
  },
  // Continue adding the rest similarly (Veggie Burger, Steak, Ice Cream Sundae)...
];

export default foodList;
