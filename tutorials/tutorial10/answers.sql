-- Exercise 1 (done for you): Selecting all columns
SELECT * FROM users;



-- Exercise 2 (done for you): Selecting some columns
SELECT id, first_name, last_name 
FROM users;



-- Exercise 3: Sorting
-- retrieve id, first_name, last_name sorted by last name.
SELECT id, first_name, last_name
FROM users 
ORDER BY last_name;


-- Exercise 4: Filtering
-- posts by Nicholas Khan  
SELECT id, user_id, image_url
FROM posts
WHERE user_id=26;




-- Exercise 5: Filtering with logical operators
SELECT id, image_url, user_id
FROM posts
WHERE user_id =26 OR user_id=12



-- Exercise 6: Using functions in a select statement
SELECT 
COUNT (*)
FROM posts;



-- Exercise 7: Aggregating data
SELECT 
	user_id,
	COUNT (user_id)
FROM 
	comments

GROUP BY 
	user_id;



-- Exercise 8: Joining: two tables
SELECT 
	posts.id, posts.image_url, posts.user_id
FROM 
	users
	
INNER JOIN posts ON users.id = posts.user_id
WHERE users.id = 26 or users.id = 12



-- Exercise 9: More joining practice: two tables
SELECT 
	posts.id, posts.pub_date,
	following.following_id
FROM posts
INNER JOIN following ON posts.user_id = following.following_id
WHERE following.user_id=26;


-- Exercise 10: More joining practice: three tables (Optional)
SELECT 
	posts.id, posts.pub_date,
	following.following_id,
	users.username

FROM 
	posts

INNER JOIN following 
	ON posts.user_id = following.following_id
INNER JOIN users
	ON following.following_id = users.id

WHERE 
	following.user_id=26;
	
ORDER BY 
	posts.pub_date;



-- Exercise 11: Inserting records
INSERT INTO bookmarks(id, user_id, post_id, timestamp)
VALUES (1000, 26, 219, now());

INSERT INTO bookmarks(id, user_id, post_id, timestamp)
VALUES (1000, 26, 2220, now());

INSERT INTO bookmarks(id, user_id, post_id, timestamp)
VALUES (1000, 26, 2221, now());



-- Exercise 12: Deleting records
DELETE FROM 
	bookmarks
WHERE 
	post_id = 219 and user_id =26;
	
DELETE FROM 
	bookmarks
WHERE 
	post_id = 220 and user_id =26;

DELETE FROM 
	bookmarks
WHERE 
	post_id = 221 and user_id =26;



-- Exercise 13: Updating records
UPDATE users
	SET email = 'knick2022@gmail.com'
WHERE 
	id = 26

-- Exercise 14: More Querying Practice (Optional)
SELECT
	posts.id,
	posts.user_id,
	count(comments.id),
	posts.caption
FROM 
	comments,
	posts

WHERE
	posts.id = comments.post_id and
	posts.user_id = 26
	
GROUP BY 
	posts.id

ORDER BY
	count(comments.id) desc;