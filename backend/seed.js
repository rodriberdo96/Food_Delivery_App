import mongoose from "mongoose";
import "dotenv/config";
import foodModel from "./models/foodModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FOOD_ITEMS = [
  { name: "Greek salad", price: 12, description: "Fresh mixed greens with feta cheese, olives, tomatoes, and a zesty Mediterranean dressing", category: "Salad", image: "food_1.png" },
  { name: "Veg salad", price: 18, description: "A colorful medley of seasonal vegetables tossed in a light vinaigrette with herbs", category: "Salad", image: "food_2.png" },
  { name: "Clover Salad", price: 16, description: "Crispy greens with clover sprouts, avocado, and a tangy citrus dressing", category: "Salad", image: "food_3.png" },
  { name: "Chicken Salad", price: 24, description: "Grilled chicken breast over fresh greens with cherry tomatoes and house dressing", category: "Salad", image: "food_4.png" },
  { name: "Lasagna Rolls", price: 14, description: "Tender pasta rolled with ricotta, spinach, and topped with marinara sauce", category: "Rolls", image: "food_5.png" },
  { name: "Peri Peri Rolls", price: 12, description: "Spicy peri peri chicken wrapped in a warm tortilla with fresh veggies", category: "Rolls", image: "food_6.png" },
  { name: "Chicken Rolls", price: 20, description: "Succulent chicken strips wrapped in a soft roll with garlic aioli", category: "Rolls", image: "food_7.png" },
  { name: "Veg Rolls", price: 15, description: "Crispy vegetable spring rolls served with sweet chili dipping sauce", category: "Rolls", image: "food_8.png" },
  { name: "Ripple Ice Cream", price: 14, description: "Creamy vanilla ice cream with rich chocolate ripple swirls", category: "Deserts", image: "food_9.png" },
  { name: "Fruit Ice Cream", price: 22, description: "Refreshing fruit-infused ice cream made with real seasonal fruits", category: "Deserts", image: "food_10.png" },
  { name: "Jar Ice Cream", price: 10, description: "Artisanal ice cream served in a mason jar with cookie crumble topping", category: "Deserts", image: "food_11.png" },
  { name: "Vanilla Ice Cream", price: 12, description: "Classic Madagascar vanilla bean ice cream, smooth and indulgent", category: "Deserts", image: "food_12.png" },
  { name: "Chicken Sandwich", price: 12, description: "Grilled chicken breast with lettuce, tomato, and mayo on artisan bread", category: "Sandwich", image: "food_13.png" },
  { name: "Vegan Sandwich", price: 18, description: "Plant-based goodness with avocado, hummus, and roasted vegetables", category: "Sandwich", image: "food_14.png" },
  { name: "Grilled Sandwich", price: 16, description: "Toasted sourdough with melted cheese, caramelized onions, and herbs", category: "Sandwich", image: "food_15.png" },
  { name: "Bread Sandwich", price: 24, description: "Triple-decker club sandwich with premium fillings and gourmet sauces", category: "Sandwich", image: "food_16.png" },
  { name: "Cup Cake", price: 14, description: "Fluffy vanilla cupcake topped with buttercream frosting and sprinkles", category: "Cake", image: "food_17.png" },
  { name: "Vegan Cake", price: 12, description: "Moist plant-based chocolate cake with coconut cream frosting", category: "Cake", image: "food_18.png" },
  { name: "Butterscotch Cake", price: 20, description: "Rich butterscotch layered cake with caramel drizzle and praline", category: "Cake", image: "food_19.png" },
  { name: "Sliced Cake", price: 15, description: "A generous slice of our signature multi-layered celebration cake", category: "Cake", image: "food_20.png" },
  { name: "Garlic Mushroom", price: 14, description: "Sautéed mushrooms in garlic butter with fresh herbs and crusty bread", category: "Pure Veg", image: "food_21.png" },
  { name: "Fried Cauliflower", price: 22, description: "Crispy battered cauliflower florets with spicy sriracha mayo dip", category: "Pure Veg", image: "food_22.png" },
  { name: "Mix Veg Pulao", price: 10, description: "Fragrant basmati rice cooked with seasonal vegetables and aromatic spices", category: "Pure Veg", image: "food_23.png" },
  { name: "Rice Zucchini", price: 12, description: "Light zucchini rice bowl with herbs, lemon, and parmesan shavings", category: "Pure Veg", image: "food_24.png" },
  { name: "Cheese Pasta", price: 12, description: "Creamy four-cheese pasta with a blend of mozzarella, cheddar, and parmesan", category: "Pasta", image: "food_25.png" },
  { name: "Tomato Pasta", price: 18, description: "Al dente pasta in a rich San Marzano tomato sauce with fresh basil", category: "Pasta", image: "food_26.png" },
  { name: "Creamy Pasta", price: 16, description: "Silky cream sauce pasta with mushrooms, garlic, and Italian herbs", category: "Pasta", image: "food_27.png" },
  { name: "Chicken Pasta", price: 24, description: "Grilled chicken with penne in a roasted red pepper cream sauce", category: "Pasta", image: "food_28.png" },
  { name: "Butter Noodles", price: 14, description: "Silky egg noodles tossed in golden butter with fresh parsley and pepper", category: "Noodles", image: "food_29.png" },
  { name: "Veg Noodles", price: 12, description: "Stir-fried noodles with crispy vegetables in a savory soy-ginger sauce", category: "Noodles", image: "food_30.png" },
  { name: "Somen Noodles", price: 20, description: "Delicate Japanese somen noodles in a chilled dashi broth with toppings", category: "Noodles", image: "food_31.png" },
  { name: "Cooked Noodles", price: 15, description: "Wok-tossed noodles with a medley of vegetables in teriyaki glaze", category: "Noodles", image: "food_32.png" },
];

async function seed() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("MONGO_URI is required. Create a .env file.");
    process.exit(1);
  }

  // Copy images from frontend assets to backend uploads
  const assetsDir = path.join(__dirname, "..", "frontend", "src", "assets", "frontend_assets");
  const uploadsDir = path.join(__dirname, "uploads");

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  console.log("📸 Copying food images to uploads/...");
  for (const item of FOOD_ITEMS) {
    const src = path.join(assetsDir, item.image);
    const dest = path.join(uploadsDir, item.image);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    } else {
      console.warn(`  ⚠ Image not found: ${src}`);
    }
  }
  console.log("✅ Images copied.\n");

  // Connect and seed
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log("🔗 Connected to MongoDB.");

    const existingCount = await foodModel.countDocuments();
    if (existingCount > 0) {
      console.log(`🗑  Clearing ${existingCount} existing food items...`);
      await foodModel.deleteMany({});
    }

    console.log("🌱 Seeding 32 food items...");
    await foodModel.insertMany(FOOD_ITEMS);

    const finalCount = await foodModel.countDocuments();
    console.log(`✅ Done! ${finalCount} food items in the database.\n`);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

seed();
