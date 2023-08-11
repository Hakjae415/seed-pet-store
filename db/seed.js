const client = require('./db.js');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS pets_products;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS pets;  
      DROP TABLE IF EXISTS owners;
    `);

    console.log('TABLES DROPPED!');
  } catch(error) {
    console.log(error);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE owners(
        Id SERIAL PRIMARY KEY,
        Name VARCHAR(30) NOT NULL
      );

      CREATE TABLE pets(
        Id SERIAL PRIMARY KEY,
        Name VARCHAR(20) NOT NULL,
        Type VARCHAR(20) NOT NULL,
        Owner_Id INTEGER REFERENCES owners(Id)
      );

      CREATE TABLE products(
        Id SERIAL PRIMARY KEY,
        Name VARCHAR(30) NOT NULL
      );

      CREATE TABLE pets_products(
        pets_id INTEGER REFERENCES pets(Id),
        products_id INTEGER REFERENCES products(Id)
      );
    `);

    console.log('TABLES CREATED!');
  } catch(error) {
    console.log(error);
  }
}

const createOwner = async(ownersName) => {
  try {
    await client.query(`
      INSERT INTO owners (Name)
      VALUES ('${ownersName}');
    `);

    console.log('OWNER CREATED!');
  } catch(error) {
    console.log(error)
  }
}

const createPets = async(petsName, petsType, petsOwnersId) => {
  try {
    await client.query(`
      INSERT INTO pets (Name, Type, Owner_Id)
      VALUES ('${petsName}', '${petsType}', ${petsOwnersId});
    `);

    console.log('PETS CREATED!')
  } catch(error) {
    console.log(error)
  }
}

const createProducts = async(productsName) => {
  try {
    await client.query(`
      INSERT INTO products (Name)
      VALUES ('${productsName}');
    `);

    console.log('PRODUCTS CREATED!')
  } catch(error) {
    console.log(error)
  }
}

const createPetProducts = async(petsId, productsId) => {
  try {
     await client.query(`
      INSERT INTO pets_products (pets_Id, products_Id)
      VALUES ('${petsId}', '${productsId}')
     `)

     console.log('PET_PRODUCTS CREATED!')
  } catch(error) {
    console.log(error)
  }
}

const syncAndSeed = async() => {
  try {
    await client.connect();
    console.log('CONNECTED TO THE DB!');

    await dropTables();
    await createTables();

    await createOwner('Melanie');
    await createOwner('Daniel');
    await createOwner('Jin');
    await createOwner('Karin');

    await createPets('Nimbus', 'Cat', 1)
    await createPets('Azula', 'Dog', 2)
    await createPets('Jackson', 'Dog', 3)
    await createPets('Tina', 'Cat', 4)
    await createPets('Zen', 'Dog', 2)

    await createProducts('Cat-nip')
    await createProducts('Leash')
    await createProducts('Cat-toy')
    await createProducts('Self-fetch-ball')
    await createProducts('Dog-treats')
    await createProducts('Cat-treats')

    await createPetProducts(1, 1)
    await createPetProducts(1, 3)
    await createPetProducts(1, 6)

    await createPetProducts(2, 2)
    await createPetProducts(2, 4)
    await createPetProducts(2, 5)

    await createPetProducts(3, 2)
    await createPetProducts(3, 4)
    await createPetProducts(3, 5)

    await createPetProducts(4, 1)
    await createPetProducts(4, 3)
    await createPetProducts(4, 6)
    
    await createPetProducts(5, 2)
    await createPetProducts(5, 4)
    await createPetProducts(5, 5)

  } catch(error) {
    console.log(error);
  }
}

syncAndSeed();