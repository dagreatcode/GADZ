DROP TABLE "test_table";
SELECT * FROM accounts;
CREATE TABLE accounts (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP 
);

CREATE TABLE roles(
   role_id serial PRIMARY KEY,
   role_name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE account_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  grant_date TIMESTAMP,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (role_id)
      REFERENCES roles (role_id),
  FOREIGN KEY (user_id)
      REFERENCES accounts (user_id)
);

SELECT * FROM "Users";

SELECT * FROM User;

CREATE TABLE
    Users (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        email varchar(150) NOT NULL,
        password varchar(255) NOT NULL,
        description varchar (255),
        -- admin BOOLEAN DEFAULT false,
        siteAccess BOOLEAN DEFAULT false,
        user BOOLEAN DEFAULT true,
        archived BOOLEAN DEFAULT false,
        developer BOOLEAN DEFAULT false,
        contractor BOOLEAN DEFAULT false,
        company BOOLEAN DEFAULT false -- CONSTRAINT loads_pkey PRIMARY KEY (id ASC)
        -- Foreign Key () REFERENCES ()
        -- UNIQUE
        -- PRIMARY KEY (id)
    );

COMMENT ON TABLE "Users" IS 'developers as well';

COMMENT ON COLUMN "Users".admin IS 'Super User';

SELECT * FROM "UsersProfile";

CREATE TABLE
    "UsersProfile" (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name varchar(255) NOT NULL,
        businessName varchar(255) NOT NULL,
        contactDetails varchar(255) NOT NULL,
        pointOfContact varchar(255) NOT NULL,
        dateOfBirth DATE NOT NULL,
        bio varchar(255) NOT NULL,
        location varchar(255) NOT NULL -- Foreign Key () REFERENCES ()
        -- PRIMARY KEY (id)
    );

SELECT * FROM "ContractorUsersProfile";

CREATE TABLE
    "ContractorUsersProfile" (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name varchar(255) NOT NULL,
        trucking varchar(255) NOT NULL,
        freightForwarding varchar(255) NOT NULL,
        courierServices varchar(255) NOT NULL,
        warehousing varchar(255) NOT NULL,
        coverageArea varchar(255) NOT NULL,
        licenses varchar(255) NOT NULL,
        experienceLevel varchar(255) NOT NULL,
        endorsements varchar(255) NOT NULL,
        specificSkills varchar(255) NOT NULL,
        certifications varchar(255) NOT NULL,
        myRoutesOperated varchar(255) NOT NULL,
        myPickupLocations varchar(255) NOT NULL,
        myDeliveryLocations varchar(255) NOT NULL,
        availability varchar(255) NOT NULL,
        schedule varchar(255) NOT NULL,
        generalFreight BOOLEAN DEFAULT false,
        perishableGoods BOOLEAN DEFAULT false,
        hazardousMaterials BOOLEAN DEFAULT false,
        specializedCargo BOOLEAN DEFAULT false,
        contractor BOOLEAN DEFAULT true -- Foreign Key () REFERENCES ()
        -- PRIMARY KEY (id)
    );

SELECT * FROM "CompanyUsersProfile";

CREATE TABLE
    "CompanyUsersProfile" (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name varchar(255) NOT NULL,
        companyInformation varchar(255) NOT NULL,
        rateDetails varchar(255) NOT NULL,
        paymentTerms varchar(255) NOT NULL,
        additionalBenefits varchar(255) NOT NULL,
        incentives varchar(255) NOT NULL,
        trucksAvailable varchar(255) NOT NULL,
        typeOfTrucks varchar(255) NOT NULL,
        truckCapacity varchar(255) NOT NULL,
        equipmentOffered varchar(255) NOT NULL,
        certificationsNeeded varchar(255) NOT NULL,
        safetyCompliance varchar(255) NOT NULL,
        company BOOLEAN DEFAULT true -- Foreign Key () REFERENCES ()
        -- PRIMARY KEY (id)
    );

SELECT * FROM "load";

CREATE TABLE
    "load" (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        ownerContactInfo varchar(255) NOT NULL,
        typeOfLoad varchar(255) NOT NULL,
        dimensions varchar(255) NOT NULL,
        payingPrice varchar(255) NOT NULL,
        weight varchar(255) NOT NULL,
        quantity varchar(255) NOT NULL,
        handlingRequirements varchar(255) NOT NULL,
        pickupLocation varchar(255) NOT NULL,
        deliveryLocation varchar(255) NOT NULL,
        shipmentDueDate varchar(255) NOT NULL,
        shipmentDueTime varchar(255) NOT NULL,
        datePosted DATE NOT NULL,
        timePosted TIME NOT NULL,
        trucking BOOLEAN DEFAULT true,
        shipping BOOLEAN DEFAULT false,
        airFreight BOOLEAN DEFAULT false,
        rail BOOLEAN DEFAULT false,
        prepaid BOOLEAN DEFAULT true,
        postPaid BOOLEAN DEFAULT false,
        paymentOnDelivery BOOLEAN DEFAULT false,
        tempControlled BOOLEAN DEFAULT false,
        hazardousMaterials BOOLEAN DEFAULT false,
        specialPermits BOOLEAN DEFAULT false,
        available BOOLEAN DEFAULT true -- Foreign Key () REFERENCES ()
        -- PRIMARY KEY (id)
    );

CREATE TABLE COMPANY(
   ID INT PRIMARY KEY     NOT NULL,
   NAME           TEXT    NOT NULL,
   AGE            INT     NOT NULL,
   ADDRESS        CHAR(50),
   SALARY         REAL
);

CREATE TABLE DEPARTMENT(
   ID INT PRIMARY KEY      NOT NULL,
   DEPT           CHAR(50) NOT NULL,
   EMP_ID         INT      NOT NULL
);


-- https://www.tutorialspoint.com/postgresql/postgresql_create_table.htm
-- https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-create-table/