<?php

namespace Database\Seeders;

use Carbon\CarbonImmutable;

/** Fictional TW PC STORE inventory. Prices are sample USD amounts, not quotations. */
final class TwPcStoreCatalog
{
    public static function stockedAt(): CarbonImmutable
    {
        return CarbonImmutable::create(2026, 8, 31, 8, 0, 0, 'Asia/Phnom_Penh')
            ->setTimezone(config('app.timezone'));
    }

    public const CATEGORIES = [
        'កុំព្យូទ័រយួរដៃ (Laptop)' => 'កុំព្យូទ័រយួរដៃសម្រាប់សិក្សា ការងារ រចនាក្រាហ្វិក និងលេងហ្គេម។',
        'កុំព្យូទ័រលើតុ (Desktop)' => 'កុំព្យូទ័រលើតុសម្រាប់ការិយាល័យ និងឈុតកុំព្យូទ័រដំឡើងសម្រាប់លេងហ្គេម។',
        'អេក្រង់កុំព្យូទ័រ (Monitor)' => 'អេក្រង់សម្រាប់ការងារ ការសិក្សា និងលេងហ្គេម។',
        'កណ្ដុរ (Mouse)' => 'កណ្ដុរមានខ្សែ ឥតខ្សែ និងកណ្ដុរសម្រាប់លេងហ្គេម។',
        'ក្ដារចុច (Keyboard)' => 'ក្ដារចុចសម្រាប់ការិយាល័យ និងលេងហ្គេម ព្រមទាំងឈុតក្ដារចុចជាមួយកណ្ដុរ។',
        'ស្គ្រីនការពារអេក្រង់ (Screen Protector)' => 'ស្គ្រីនការពារអេក្រង់កុំព្យូទ័រយួរដៃពីស្នាមឆ្កូត។',
        'ឧបករណ៍ផ្ទុកទិន្នន័យ (Storage)' => 'SSD, HDD និង USB សម្រាប់រក្សាទុកទិន្នន័យ។',
        'អង្គចងចាំ (RAM)' => 'អង្គចងចាំសម្រាប់បន្ថែមល្បឿនកុំព្យូទ័រយួរដៃ និងកុំព្យូទ័រលើតុ។',
        'កាស និងឧបករណ៍បំពងសំឡេង (Audio)' => 'កាសមានមីក្រូហ្វូន និងឧបករណ៍បំពងសំឡេងសម្រាប់កុំព្យូទ័រ។',
        'ឧបករណ៍បណ្ដាញ (Networking)' => 'រ៉ោតទ័រ និងឧបករណ៍ភ្ជាប់ Wi-Fi សម្រាប់ផ្ទះ និងការិយាល័យ។',
        'កាបូបកុំព្យូទ័រ (Laptop Bag)' => 'កាបូប និងស្រោមការពារកុំព្យូទ័រយួរដៃ។',
        'គ្រឿងបន្ថែម (Accessories)' => 'ខ្សែភ្ជាប់ ឧបករណ៍បម្លែង បន្ទះកណ្ដុរ និងសម្ភារៈសម្អាតកុំព្យូទ័រ។',
    ];

    public const BRANDS = [
        'Lenovo' => 'កុំព្យូទ័រយួរដៃ និងកុំព្យូទ័រសម្រាប់អាជីវកម្ម។',
        'ASUS' => 'កុំព្យូទ័រយួរដៃ និងឧបករណ៍សម្រាប់លេងហ្គេម។',
        'Acer' => 'កុំព្យូទ័រយួរដៃ និងអេក្រង់កុំព្យូទ័រ។',
        'HP' => 'កុំព្យូទ័រសម្រាប់ការសិក្សា និងការិយាល័យ។',
        'Dell' => 'កុំព្យូទ័រយួរដៃ កុំព្យូទ័រលើតុ និងអេក្រង់។',
        'MSI' => 'កុំព្យូទ័រ និងគ្រឿងបន្លាស់សម្រាប់លេងហ្គេម។',
        'Apple' => 'កុំព្យូទ័រ MacBook និងគ្រឿងបន្ថែម។',
        'Logitech' => 'កណ្ដុរ ក្ដារចុច កាស និងឧបករណ៍បំពងសំឡេង។',
        'Razer' => 'កណ្ដុរ និងក្ដារចុចសម្រាប់លេងហ្គេម។',
        'AOC' => 'អេក្រង់កុំព្យូទ័រសម្រាប់ការងារ និងលេងហ្គេម។',
        'Samsung' => 'អេក្រង់កុំព្យូទ័រ និងឧបករណ៍ផ្ទុកទិន្នន័យ។',
        'Kingston' => 'SSD, RAM និង USB សម្រាប់កុំព្យូទ័រ។',
        'Crucial' => 'អង្គចងចាំ និង SSD សម្រាប់កុំព្យូទ័រ។',
        'SanDisk' => 'USB និងឧបករណ៍ផ្ទុកទិន្នន័យ។',
        'Seagate' => 'ថាសរឹង និងឧបករណ៍ផ្ទុកទិន្នន័យខាងក្រៅ។',
        'TP-Link' => 'រ៉ោតទ័រ និងឧបករណ៍បណ្ដាញ។',
        'UGREEN' => 'ខ្សែភ្ជាប់ USB Hub និងឧបករណ៍បម្លែង។',
        'Fantech' => 'កណ្ដុរ ក្ដារចុច និងគ្រឿងបន្ថែមសម្រាប់លេងហ្គេម។',
        'TW PC STORE' => 'ឈុតកុំព្យូទ័រដំឡើង និងគ្រឿងបន្ថែមទូទៅរបស់ហាង TW PC STORE។',
    ];

    /** Rows: name, category, brand, USD price, opening stock, Khmer description. */
    public const PRODUCTS = [
        ['Lenovo IdeaPad Slim 3 15IRU8', 'កុំព្យូទ័រយួរដៃ (Laptop)', 'Lenovo', '529.00', 15, 'Core i5-1335U, RAM 8GB, SSD 512GB, អេក្រង់ 15.6 អ៊ីញ។ សម្រាប់សិស្ស និស្សិត និងការងារការិយាល័យ។'],
        ['ASUS Vivobook 15 X1504VA', 'កុំព្យូទ័រយួរដៃ (Laptop)', 'ASUS', '579.00', 12, 'Core i5-1335U, RAM 16GB, SSD 512GB, អេក្រង់ 15.6 អ៊ីញ។ សម្រាប់ការងារប្រចាំថ្ងៃ។'],
        ['Acer Aspire 5 A515-58M', 'កុំព្យូទ័រយួរដៃ (Laptop)', 'Acer', '599.00', 10, 'Core i5-1335U, RAM 16GB, SSD 512GB។ សម្រាប់ការសិក្សា និងការងារ។'],
        ['HP 15-fd0013TU', 'កុំព្យូទ័រយួរដៃ (Laptop)', 'HP', '489.00', 12, 'Core i3-1315U, RAM 8GB, SSD 512GB, អេក្រង់ 15.6 អ៊ីញ។ ជម្រើសសម្រាប់ការិយាល័យ។'],
        ['Dell Inspiron 15 3530', 'កុំព្យូទ័រយួរដៃ (Laptop)', 'Dell', '619.00', 10, 'Core i5-1334U, RAM 8GB, SSD 512GB។ សម្រាប់រៀន និងធ្វើការតាមអនឡាញ។'],
        ['MSI Thin 15 B12UC', 'កុំព្យូទ័រយួរដៃ (Laptop)', 'MSI', '729.00', 7, 'Core i5-12450H, RAM 16GB, SSD 512GB, RTX 3050។ សម្រាប់លេងហ្គេម និងរចនាក្រាហ្វិក។'],
        ['Apple MacBook Air M1 13-inch', 'កុំព្យូទ័រយួរដៃ (Laptop)', 'Apple', '699.00', 5, 'Apple M1, RAM 8GB, SSD 256GB។ ទម្ងន់ស្រាល សម្រាប់ការងារ និងការសិក្សា។'],
        ['Lenovo ThinkPad T480 Used', 'កុំព្យូទ័រយួរដៃ (Laptop)', 'Lenovo', '249.00', 6, 'មួយទឹក៖ Core i5-8350U, RAM 8GB, SSD 256GB។ តម្លៃសមរម្យសម្រាប់សិស្ស និងការិយាល័យ។'],
        ['TW Gaming Desktop i5 RTX 4060', 'កុំព្យូទ័រលើតុ (Desktop)', 'TW PC STORE', '799.00', 8, 'ឈុតដំឡើង៖ Core i5-12400F, RAM 16GB, SSD 1TB, RTX 4060។ មិនរួមបញ្ចូលអេក្រង់។'],
        ['Dell OptiPlex 7090 SFF Used', 'កុំព្យូទ័រលើតុ (Desktop)', 'Dell', '329.00', 10, 'មួយទឹក៖ Core i5-10500, RAM 8GB, SSD 256GB។ សម្រាប់ការិយាល័យ មិនរួមអេក្រង់។'],
        ['HP ProDesk 400 G6 Used', 'កុំព្យូទ័រលើតុ (Desktop)', 'HP', '279.00', 6, 'មួយទឹក៖ Core i5-9500, RAM 8GB, SSD 256GB។ សម្រាប់ការងារឯកសារ មិនរួមអេក្រង់។'],
        ['AOC 24G2SP 24-inch', 'អេក្រង់កុំព្យូទ័រ (Monitor)', 'AOC', '159.00', 12, 'អេក្រង់ IPS, Full HD, 165Hz ទំហំ 24 អ៊ីញ សម្រាប់លេងហ្គេម។'],
        ['Dell P2422H 24-inch', 'អេក្រង់កុំព្យូទ័រ (Monitor)', 'Dell', '179.00', 10, 'អេក្រង់ IPS, Full HD ទំហំ 24 អ៊ីញ សម្រាប់ការិយាល័យ។'],
        ['Samsung LF24T350 24-inch', 'អេក្រង់កុំព្យូទ័រ (Monitor)', 'Samsung', '109.00', 8, 'អេក្រង់ IPS, Full HD, 75Hz សម្រាប់រៀន និងធ្វើការ។'],
        ['Logitech M185 Wireless Mouse', 'កណ្ដុរ (Mouse)', 'Logitech', '12.50', 40, 'កណ្ដុរឥតខ្សែ ភ្ជាប់តាម USB Receiver ងាយស្រួលយកតាមខ្លួន។'],
        ['Logitech B100 USB Mouse', 'កណ្ដុរ (Mouse)', 'Logitech', '5.00', 35, 'កណ្ដុរមានខ្សែ USB សម្រាប់ការិយាល័យ និងហាងអ៊ីនធឺណិត។'],
        ['Logitech G102 Lightsync', 'កណ្ដុរ (Mouse)', 'Logitech', '22.00', 20, 'កណ្ដុរសម្រាប់លេងហ្គេម មានភ្លើង RGB និងខ្សែ USB។'],
        ['Razer DeathAdder Essential', 'កណ្ដុរ (Mouse)', 'Razer', '25.00', 12, 'កណ្ដុរសម្រាប់លេងហ្គេម រចនាសម្រាប់ការកាន់ប្រើប្រាស់បានស្រួល។'],
        ['Logitech K120 USB Keyboard', 'ក្ដារចុច (Keyboard)', 'Logitech', '9.50', 30, 'ក្ដារចុចមានខ្សែ USB សម្រាប់ការងារឯកសារ និងការប្រើប្រាស់ប្រចាំថ្ងៃ។'],
        ['Logitech MK120 Keyboard Mouse Combo', 'ក្ដារចុច (Keyboard)', 'Logitech', '15.00', 25, 'ឈុតក្ដារចុច និងកណ្ដុរមានខ្សែ USB សម្រាប់កុំព្យូទ័រលើតុ។'],
        ['Fantech MAXFIT61 Mechanical Keyboard', 'ក្ដារចុច (Keyboard)', 'Fantech', '39.00', 12, 'ក្ដារចុចមេកានិចទំហំតូច មានភ្លើង RGB សម្រាប់លេងហ្គេម។'],
        ['Laptop Screen Protector 15.6-inch', 'ស្គ្រីនការពារអេក្រង់ (Screen Protector)', 'TW PC STORE', '3.00', 20, 'ស្គ្រីនថ្លាការពារស្នាមឆ្កូត ទំហំ 15.6 អ៊ីញ។ សូមពិនិត្យទំហំអេក្រង់មុនបិទ។'],
        ['Laptop Screen Protector 14-inch', 'ស្គ្រីនការពារអេក្រង់ (Screen Protector)', 'TW PC STORE', '3.00', 30, 'ស្គ្រីនថ្លាការពារស្នាមឆ្កូត ទំហំ 14 អ៊ីញ សម្រាប់កុំព្យូទ័រយួរដៃ។'],
        ['MacBook Air 13-inch Screen Protector', 'ស្គ្រីនការពារអេក្រង់ (Screen Protector)', 'TW PC STORE', '5.00', 15, 'ស្គ្រីនការពារសម្រាប់ MacBook Air M1 ទំហំ 13.3 អ៊ីញ។'],
        ['Kingston NV2 NVMe SSD 500GB', 'ឧបករណ៍ផ្ទុកទិន្នន័យ (Storage)', 'Kingston', '35.00', 20, 'SSD M.2 NVMe ទំហំ 500GB សម្រាប់ដំឡើងប្រព័ន្ធ និងរក្សាទុកឯកសារ។'],
        ['Samsung 970 EVO Plus NVMe SSD 1TB', 'ឧបករណ៍ផ្ទុកទិន្នន័យ (Storage)', 'Samsung', '79.00', 10, 'SSD M.2 NVMe ទំហំ 1TB សម្រាប់ការងារដែលត្រូវការល្បឿន។'],
        ['SanDisk Ultra Flair USB 64GB', 'ឧបករណ៍ផ្ទុកទិន្នន័យ (Storage)', 'SanDisk', '8.50', 40, 'USB 3.0 ទំហំ 64GB សម្រាប់ផ្ទេរឯកសារ និងរក្សាទុកទិន្នន័យ។'],
        ['Seagate Expansion Portable HDD 1TB', 'ឧបករណ៍ផ្ទុកទិន្នន័យ (Storage)', 'Seagate', '49.00', 10, 'ថាសរឹងខាងក្រៅទំហំ 1TB សម្រាប់បម្រុងទុកឯកសារ។'],
        ['Kingston DDR4 8GB 3200 SODIMM', 'អង្គចងចាំ (RAM)', 'Kingston', '19.00', 25, 'RAM DDR4 ទំហំ 8GB ល្បឿន 3200 សម្រាប់កុំព្យូទ័រយួរដៃដែលគាំទ្រ។'],
        ['Crucial DDR4 16GB 3200 SODIMM', 'អង្គចងចាំ (RAM)', 'Crucial', '32.00', 15, 'RAM DDR4 ទំហំ 16GB សម្រាប់បន្ថែមអង្គចងចាំកុំព្យូទ័រយួរដៃ។'],
        ['Kingston FURY Beast DDR4 16GB Desktop', 'អង្គចងចាំ (RAM)', 'Kingston', '35.00', 15, 'RAM DDR4 ទំហំ 16GB សម្រាប់កុំព្យូទ័រលើតុ។'],
        ['Logitech H111 Stereo Headset', 'កាស និងឧបករណ៍បំពងសំឡេង (Audio)', 'Logitech', '12.00', 20, 'កាសមានមីក្រូហ្វូន រន្ធ 3.5mm សម្រាប់រៀន និងប្រជុំតាមអនឡាញ។'],
        ['Logitech Z120 USB Speakers', 'កាស និងឧបករណ៍បំពងសំឡេង (Audio)', 'Logitech', '18.00', 12, 'ឧបករណ៍បំពងសំឡេងមួយគូ ប្រើភ្លើងតាម USB និងសំឡេងតាមរន្ធ 3.5mm។'],
        ['TP-Link Archer C6 AC1200 Router', 'ឧបករណ៍បណ្ដាញ (Networking)', 'TP-Link', '39.00', 12, 'រ៉ោតទ័រ Wi-Fi សម្រាប់ផ្ទះ និងការិយាល័យតូច។'],
        ['TP-Link TL-WN725N USB Wi-Fi Adapter', 'ឧបករណ៍បណ្ដាញ (Networking)', 'TP-Link', '7.50', 25, 'ឧបករណ៍ភ្ជាប់ Wi-Fi តាម USB សម្រាប់កុំព្យូទ័រ។'],
        ['TW Laptop Backpack 15.6-inch', 'កាបូបកុំព្យូទ័រ (Laptop Bag)', 'TW PC STORE', '12.00', 30, 'កាបូបស្ពាយសម្រាប់កុំព្យូទ័រយួរដៃ មានកន្លែងដាក់ឆ្នាំងសាក និងគ្រឿងបន្ថែម។'],
        ['TW Laptop Sleeve 14-inch', 'កាបូបកុំព្យូទ័រ (Laptop Bag)', 'TW PC STORE', '6.00', 20, 'ស្រោមការពារកុំព្យូទ័រយួរដៃទំហំ 14 អ៊ីញ ងាយស្រួលយកតាមខ្លួន។'],
        ['UGREEN USB-C Hub 5-in-1', 'គ្រឿងបន្ថែម (Accessories)', 'UGREEN', '25.00', 15, 'ឧបករណ៍ពង្រីករន្ធ USB-C ជាមួយរន្ធ HDMI និង USB សម្រាប់កុំព្យូទ័រដែលគាំទ្រ។'],
        ['UGREEN HDMI Cable 2m', 'គ្រឿងបន្ថែម (Accessories)', 'UGREEN', '5.50', 35, 'ខ្សែ HDMI ប្រវែង 2 ម៉ែត្រ សម្រាប់ភ្ជាប់កុំព្យូទ័រទៅអេក្រង់។'],
        ['Fantech Mouse Pad 800x300mm', 'គ្រឿងបន្ថែម (Accessories)', 'Fantech', '7.00', 25, 'បន្ទះកណ្ដុរទំហំធំ សម្រាប់ដាក់ក្ដារចុច និងកណ្ដុរ។'],
        ['Universal Silicone Keyboard Protector', 'គ្រឿងបន្ថែម (Accessories)', 'TW PC STORE', '1.50', 40, 'ស្រោមស៊ីលីកូនការពារធូលីលើក្ដារចុច។ សូមពិនិត្យទំហំមុនប្រើ។'],
        ['Laptop Cleaning Kit', 'គ្រឿងបន្ថែម (Accessories)', 'TW PC STORE', '2.50', 30, 'ឈុតសម្អាតមានក្រណាត់ និងជក់ សម្រាប់ថែទាំកុំព្យូទ័រ។'],
    ];

    /** Repeatable shopping baskets: product name => quantity. */
    public const BASKETS = [
        ['Lenovo IdeaPad Slim 3 15IRU8' => 1, 'Logitech M185 Wireless Mouse' => 1, 'Laptop Screen Protector 15.6-inch' => 1],
        ['ASUS Vivobook 15 X1504VA' => 1, 'Laptop Screen Protector 15.6-inch' => 1, 'TW Laptop Backpack 15.6-inch' => 1],
        ['Acer Aspire 5 A515-58M' => 1, 'Logitech M185 Wireless Mouse' => 1],
        ['HP 15-fd0013TU' => 1, 'Laptop Screen Protector 15.6-inch' => 1, 'Universal Silicone Keyboard Protector' => 1],
        ['Dell Inspiron 15 3530' => 1, 'Laptop Screen Protector 15.6-inch' => 1, 'TW Laptop Backpack 15.6-inch' => 1],
        ['MSI Thin 15 B12UC' => 1, 'Logitech G102 Lightsync' => 1, 'Fantech Mouse Pad 800x300mm' => 1],
        ['TW Gaming Desktop i5 RTX 4060' => 1, 'AOC 24G2SP 24-inch' => 1, 'Logitech MK120 Keyboard Mouse Combo' => 1],
        ['Dell OptiPlex 7090 SFF Used' => 1, 'Dell P2422H 24-inch' => 1, 'Logitech MK120 Keyboard Mouse Combo' => 1],
        ['Logitech K120 USB Keyboard' => 2, 'Logitech B100 USB Mouse' => 2],
        ['Kingston NV2 NVMe SSD 500GB' => 1, 'Kingston DDR4 8GB 3200 SODIMM' => 1],
        ['UGREEN USB-C Hub 5-in-1' => 1, 'UGREEN HDMI Cable 2m' => 2, 'SanDisk Ultra Flair USB 64GB' => 1],
        ['Laptop Screen Protector 14-inch' => 1, 'Universal Silicone Keyboard Protector' => 2, 'Laptop Cleaning Kit' => 1],
    ];
}
