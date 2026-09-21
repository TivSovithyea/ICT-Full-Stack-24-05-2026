# TW PC STORE demo data

From `Backend/MiniPosSystemAPI`, with your development/test database configured:

```sh
php artisan migrate
php artisan db:seed
```

The seeder adds data without truncating tables. It does not remove the old random categories if you already seeded them.

## Included on a clean database

| Records | Count |
| --- | ---: |
| Categories | 12 |
| Brands | 19 |
| Products | 42 |
| Fictional staff | 3 |
| Completed orders | 60 |
| Order items | 165 |

Categories and descriptions use Khmer, with English category labels and recognizable product names. Products cover laptops, desktops, monitors, screen protectors, mice, keyboards, storage, RAM, audio, networking, bags, and accessories. Used computers are marked `Used` / `មួយទឹក`.

Prices and configurations are illustrative test fixtures, not verified shop stock or current quotations. All amounts are **USD**; the current schema has no currency column. Images are null so the existing UI can use its fallback image.

Sales cover September 1–20, 2026, three per day during Phnom Penh shop hours. Timestamps are converted to the application's timezone before storage. Baskets include laptop bundles, desktop setups, and multi-quantity accessory purchases. Each order stores its sale price and matching item subtotals; totals are calculated in integer cents. Stock is deducted once for each inserted sale. On a clean seed, the 15.6-inch screen protector sells out and MSI Thin 15 has two remaining units.

## Files and execution order

1. `CategorySeeder`
2. `BrandSeeder`
3. `ProductSeeder`
4. `UserSeeder`
5. `OrderSeeder` — creates both orders and their order items in the same transaction as stock deductions.

Edit `database/seeders/TwPcStoreCatalog.php` to customize categories, brands, products, opening quantities, prices, descriptions, and example baskets. `DatabaseSeeder` wraps the complete sequence in a transaction; missing products or insufficient stock abort the run without leaving partial sales.

## Repeat runs

Categories, brands, and products are matched by name; staff are matched by email. Existing matches are preserved, including prices, stock, images, passwords, and descriptions. Orders are matched by the demo staff ID plus a fixed sale timestamp. Repeating the seed on later days does not add the same sales or deduct their stock again.

This is a sequential development seeder, not a concurrent import or a repair tool. Keep fixture names, staff emails, timestamps, and the application timezone stable between runs. Renaming or deleting seeded identities can make them appear new. Existing unrelated records remain untouched; existing matching products are reused and must have enough stock for any new demo sales. Changing fixture prices does not update already seeded products or orders.

For a complete reset **only on a disposable development database** (this deletes every table and its data):

```sh
php artisan migrate:fresh --seed
```

## Demo staff

| Name | Email |
| --- | --- |
| សុខា | sokha@twpcstore.example |
| ដារ៉ា | dara@twpcstore.example |
| សុភា | sophea@twpcstore.example |

The test password is `TWPC-demo-2026!`. These are fictional development accounts, not production accounts. Seeding them does not implement the currently missing authentication endpoints or assign roles.

## Verification

```sh
DB_CONNECTION=sqlite DB_DATABASE=:memory: DB_URL= APP_CONFIG_CACHE=/tmp/tw-pc-store-test-config.php php artisan test --filter=TwPcStoreSeeder
```

The tests use an in-memory SQLite database and check counts, relationships, Khmer descriptions, totals, stock reconciliation, repeat runs after edits, and transaction rollback on insufficient stock. They do not seed your configured shop database.
