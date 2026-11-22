<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed only the two tables: categories and products.
     */
    public function run(): void
    {
        // 1. Seed Categories Table
        $audio = Category::create([
            'category_name' => 'Audio',
            'category_description' => 'Premium wireless noise-cancelling headphones and audio gear'
        ]);

        $wearables = Category::create([
            'category_name' => 'Wearables',
            'category_description' => 'Smartwatches, fitness trackers, and health devices'
        ]);

        $cameras = Category::create([
            'category_name' => 'Cameras',
            'category_description' => 'Digital mirrorless, compact, and street photography cameras'
        ]);

        $keyboards = Category::create([
            'category_name' => 'Keyboards',
            'category_description' => 'Custom mechanical keyboards and desk peripherals'
        ]);

        // 2. Seed Products Table (Linked to Category via category_id)
        Product::create([
            'category_id' => $audio->category_id,
            'product_name' => 'Sony WH-1000XM5',
            'product_image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
            'product_description' => 'Industry-leading noise cancellation with 30-hour battery life.',
            'price' => 349.00,
        ]);

        Product::create([
            'category_id' => $wearables->category_id,
            'product_name' => 'Apple Watch Ultra 2',
            'product_image' => 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
            'product_description' => 'Rugged 49mm titanium case with precision dual-frequency GPS.',
            'price' => 799.00,
        ]);

        Product::create([
            'category_id' => $cameras->category_id,
            'product_name' => 'Fujifilm X100VI',
            'product_image' => 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
            'product_description' => '40.2MP compact sensor with 20 built-in film simulations.',
            'price' => 1599.00,
        ]);

        Product::create([
            'category_id' => $keyboards->category_id,
            'product_name' => 'Keychron Q1 Pro',
            'product_image' => 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
            'product_description' => 'Full CNC aluminum body with hot-swappable tactile switches.',
            'price' => 198.00,
        ]);
    }
}
