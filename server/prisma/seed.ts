import { prisma } from "./prismaInstance";

async function createOrder(data: any) {
    return prisma.order.create({ data });
}

const techProducts = [
    {
        title: 'Apple iPhone 13 Pro Max',
        description: '6.7-inch OLED Display, A15 Bionic Chip, 5G capable, Night mode, 4K Dolby Vision HDR Recording',
        url: 'http://apple.com/iphone',
        price: 1099.00,
        quantity: 1
    },
    {
        title: 'Dell XPS 15 Laptop',
        description: 'Intel Core i7, 16GB RAM, 512GB SSD, 15.6-inch 4K UHD Display',
        url: 'http://dell.com',
        price: 2300.50,
        quantity: 1
    },
    {
        title: 'Samsung Galaxy S22 Ultra',
        description: '6.8-inch Dynamic AMOLED 2X, Snapdragon 898, 5G capable, 108MP camera, 8K video recording',
        url: 'http://samsung.com',
        price: 1199.00,
        quantity: 1
    },
    {
        title: 'Apple MacBook Air (M1, 2020)',
        description: 'Apple M1 Chip, 13.3-inch Retina Display, 8GB RAM, 256GB SSD',
        url: 'http://apple.com/macbook-air',
        price: 999.00,
        quantity: 1
    },
    {
        title: 'Sony WH-1000XM4 Wireless Headphones',
        description: 'Industry-leading noise canceling with Dual Noise Sensor technology, 30-hour battery life, Touch Sensor controls',
        url: 'http://sony.com',
        price: 349.99,
        quantity: 1
    }
];

async function main() {
    const clientsData = [
        {
            name: 'Juan',
            email: 'juan@example.com',
            password: 'SecurePassword123!',
            phone: '+123456789',
            address: 'Some Address 123',
            city: 'Some City',
            state: 'Some State',
            country: 'Some Country',
            postalCode: '12345',
            orders: [{
                createDate: new Date('Aug 28 2023'),
                status: 'Approve',
                shippingAddress: 'Some Address 123',
                shippingPromise: new Date(),
                items: techProducts.slice(0, 2)
            }]
        },
        {
            name: 'Maria',
            email: 'maria@example.com',
            password: 'SecurePassword456!',
            phone: '+987654321',
            address: 'Another Address 456',
            city: 'Another City',
            state: 'Another State',
            country: 'Another Country',
            postalCode: '67890',
            orders: [{
                createDate: new Date(),
                status: 'Pending',
                shippingAddress: 'Another Address 456',
                shippingPromise: new Date('Aug 25 2023'),
                items: techProducts.slice(1,3)
            }]
        },
        {
            name: 'Pedro',
            email: 'pedro@example.com',
            password: 'SecurePassword789!',
            phone: '+111223344',
            address: 'Different Address 789',
            city: 'Different City',
            state: 'Different State',
            country: 'Different Country',
            postalCode: '11223',
            orders: [{
                createDate: new Date(),
                status: 'Shipped',
                shippingAddress: 'Different Address 789',
                shippingPromise: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                items: techProducts.slice(2,4)
            }]
        },
        {
            name: 'Roberto',
            email: 'roberto@example.com',
            password: 'SecurePassword123!',
            phone: '+123456789',
            address: 'Tech Street 789',
            city: 'Tech City',
            state: 'Tech State',
            country: 'Tech Country',
            postalCode: '78901',
            orders: [{
                createDate: new Date(),
                status: 'Approve',
                shippingAddress: 'Tech Street 789',
                shippingPromise: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                items: techProducts
            }]
        },
        {
            name: 'Elena',
            email: 'elena@example.com',
            password: 'SecurePassword456!',
            phone: '+123456789',
            address: 'Tech Street 456',
            city: 'Tech City',
            state: 'Tech State',
            country: 'Tech Country',
            postalCode: '45678',
            orders: [
                {
                    createDate: new Date(),
                    status: 'Traveling',
                    shippingAddress: 'Tech Street 456',
                    shippingPromise: new Date('Aug 15 2023'),
                    items: techProducts.slice(2,4)
                },
                {
                    createDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
                    status: 'Traveling',
                    shippingAddress: 'Tech Street 456',
                    shippingPromise: new Date('Aug 24 2023'),
                    items: techProducts
                },
                {
                    createDate: new Date('Aug 20 2023'),
                    status: 'Approve',
                    shippingAddress: 'Tech Street 456',
                    shippingPromise: new Date(new Date().getTime() + 36 * 60 * 60 * 1000), // 1.5 días a partir de hoy
                    items: techProducts.slice(1,3)
                }
            ]
        }
    ];

    for (let client of clientsData) {
        const { orders, ...clientData } = client;

        const createdClient = await prisma.client.create({ data: clientData });

        for (let order of orders) {
            await prisma.order.create({
                data: {
                    createDate: order.createDate,
                    status: order.status,
                    shippingAddress: order.shippingAddress,
                    shippingPromise: order.shippingPromise,
                    clientId: createdClient.id,
                    items: { create: order.items }
                }
            });
        }
    }

    console.log("Seeding completed!");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
