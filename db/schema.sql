### Schema

DROP DATABASE defaultdb;

CREATE DATABASE defaultdb;

USE defaultdb;

SELECT * FROM "Users";

SELECT * FROM User;

-- CREATE TABLE Users

-- (

-- 	id BIGSERIAL NOT NULL PRIMARY KEY,

-- 	email varchar(150) NOT NULL,

-- 	password varchar(255) NOT NULL,

-- 	description varchar (255),

-- 	admin BOOLEAN DEFAULT false,

-- 	-- user BOOLEAN DEFAULT true

--     archived BOOLEAN DEFAULT false,

-- 	developer BOOLEAN DEFAULT false,

-- 	contractor BOOLEAN DEFAULT false,

-- 	company BOOLEAN DEFAULT false

-- 	-- CONSTRAINT loads_pkey PRIMARY KEY (id ASC)

--     -- Foreign Key () REFERENCES ()

-- 	-- UNIQUE

-- 	-- PRIMARY KEY (id)

-- );

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
        contactDetails varchar(255) NOT NULL,
        locations varchar(255) NOT NULL,
        briefBio varchar(255) NOT NULL,
        trucking varchar(255) NOT NULL,
        freightForwarding varchar(255) NOT NULL,
        courierServices varchar(255) NOT NULL,
        warehousing varchar(255) NOT NULL,
        coverageArea varchar(255) NOT NULL,
        licenses varchar(255) NOT NULL,
        qualifications varchar(255) NOT NULL,
        experienceLevel varchar(255) NOT NULL,
        endorsements varchar(255) NOT NULL,
        specializations varchar(255) NOT NULL,
        specificSkills varchar(255) NOT NULL,
        certifications varchar(255) NOT NULL,
        myRoutesOperated varchar(255) NOT NULL,
        myPickupLocations varchar(255) NOT NULL,
        myDeliveryLocations varchar(255) NOT NULL,
        availability varchar(255) NOT NULL,
        equipment varchar(255) NOT NULL,
        vehiclesAndResources varchar(255) NOT NULL,
        -- This could include the number and type of trucks or vehicles they own or operate.
        paymentTerms varchar(255) NOT NULL,
        schedule varchar(255) NOT NULL,
        reviews varchar(255) NOT NULL,
        insuranceCoverage varchar(255) NOT NULL,
        transportationCompliance varchar(255) NOT NULL,
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
        typeOfShip varchar(255) NOT NULL,
        typeOfFreight varchar(255) NOT NULL,
        truckCapacity varchar(255) NOT NULL,
        equipmentOffered varchar(255) NOT NULL,
        certificationsNeeded varchar(255) NOT NULL,
        safetyCompliance varchar(255) NOT NULL,
        company BOOLEAN DEFAULT true -- Foreign Key () REFERENCES ()
        -- PRIMARY KEY (id)
    );

SELECT * FROM "Load";

CREATE TABLE
    "Load" (
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

CREATE TABLE
    "CarrierProfile" (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        phoneNumber varchar(255) NOT NULL,
        dateOfBirth DATE NOT NULL,
        shipmentDetails varchar(255) NOT NULL,
        typeOfCargo varchar(255) NOT NULL,
        quantity varchar(255) NOT NULL,
        weight varchar(255) NOT NULL,
        dimensions varchar(255) NOT NULL,
        handlingRequirements varchar(255) NOT NULL,
        pickUpLocationOrigin varchar(255) NOT NULL,
        buyerDestinationPickup varchar(255) NOT NULL,
        transportationMode varchar(255) NOT NULL,
        -- Trucking, air, freight, ocean freight, rail, or a combination of multiple modes (intermodal)
        transportationWindow varchar(255) NOT NULL,
        carriersRequirements varchar(255) NOT NULL,
        license varchar(255) NOT NULL,
        insurance varchar(255) NOT NULL,
        experienceLevel varchar(255) NOT NULL,
        equipmentCapabilities varchar(255) NOT NULL,
        specializedServices varchar(255) NOT NULL,
        temperatureControlledTransportation varchar(255) NOT NULL,
        hazmatHandling varchar(255) NOT NULL,
        preferredPaymentTerms varchar(255) NOT NULL,
        transportationServiceCharge varchar(255) NOT NULL,
        relevantUniqueConsiderations varchar(255) NOT NULL,
        clearanceForInternational BOOLEAN DEFAULT false,
        available BOOLEAN DEFAULT true -- Foreign Key () REFERENCES ()
        -- PRIMARY KEY (id)
    );

CREATE TABLE
    "BrokerProfile" (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        phoneNumber varchar(255) NOT NULL,
        dateOfBirth DATE NOT NULL,
        available BOOLEAN DEFAULT true -- Foreign Key () REFERENCES ()
        -- PRIMARY KEY (id)
    );

CREATE TABLE
    "TruckingCompanies" (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        phoneNumber varchar(255) NOT NULL,
        dateOfBirth DATE NOT NULL,
        available BOOLEAN DEFAULT true -- Foreign Key () REFERENCES ()
        -- PRIMARY KEY (id)
    );

CREATE TABLE
    "WarehouseOwner" (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        phoneNumber varchar(255) NOT NULL,
        dateOfBirth DATE NOT NULL,
        available BOOLEAN DEFAULT true -- Foreign Key () REFERENCES ()
        -- PRIMARY KEY (id)
    );

CREATE TABLE
    "Driver" (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        phoneNumber varchar(255) NOT NULL,
        dateOfBirth DATE NOT NULL,
        available BOOLEAN DEFAULT true -- Foreign Key () REFERENCES ()
        -- PRIMARY KEY (id)
    );

CREATE TABLE
    "OwnerOperator" (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        phoneNumber varchar(255) NOT NULL,
        dateOfBirth DATE NOT NULL,
        available BOOLEAN DEFAULT true -- Foreign Key () REFERENCES ()
        -- PRIMARY KEY (id)
    );

CREATE TABLE
    "Buyer" (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        phoneNumber varchar(255) NOT NULL,
        dateOfBirth DATE NOT NULL,
        available BOOLEAN DEFAULT true -- Foreign Key () REFERENCES ()
        -- PRIMARY KEY (id)
    );

CREATE TABLE
    "Seller" (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        phoneNumber varchar(255) NOT NULL,
        dateOfBirth DATE NOT NULL,
        available BOOLEAN DEFAULT true -- Foreign Key () REFERENCES ()
        -- PRIMARY KEY (id)
    );