CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text ,
    url text NOT NULL,
    title text NOT NULL,
    likes text DEFAULT 0
);


insert into blogs (author, url,title,likes) values ('Subash', 'subash.com','subash got talent',12);
insert into blogs (author, url,title,likes) values ('Subash2', 'subash2.com','subash2 got talent',2);


SELECT * FROM blogs