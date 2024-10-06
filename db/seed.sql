INSERT INTO user (name) VALUES ('Goku');
INSERT INTO user (name, sleepy) VALUES ('Joe', true);



-- seed.sql

-- Define the email address of the user
DO $$
DECLARE
    user_email TEXT := 'user@example.com'; -- Change this to the desired email
    user_id INT;
BEGIN
    -- Insert the user if they do not exist
    INSERT INTO "Users" (email, password, admin)
    VALUES (user_email, 'securepassword', false)
    ON CONFLICT (email) DO NOTHING;

    -- Retrieve the user ID of the specified email
    SELECT id INTO user_id FROM "Users" WHERE email = user_email;

    -- Insert dummy loads for the user
    INSERT INTO "Loads" (description, archived, company, "userId")
    VALUES
        ('Load 1 description', false, 'Company A', user_id),
        ('Load 2 description', false, 'Company B', user_id),
        ('Load 3 description', false, 'Company C', user_id),
        ('Load 4 description', false, 'Company D', user_id),
        ('Load 5 description', false, 'Company E', user_id);
END $$;


