DROP TABLE headers;
DROP TABLE show;

CREATE TABLE headers (
	header VARCHAR(128)
);

CREATE TABLE show(
	id INTEGER SERIAL PRIMARY KEY,
	title VARCHAR(128),
	watchEvery INTEGER,
	catchUp INTEGER,
	watched INTEGER,
	upToDate BOOLEAN,
	totalEps INTEGER,
	dateStarted DATE
);

INSERT INTO headers(header) VALUES ("Title"), ("Started"), ("Watched every"), ("To watch"), ("Eps watched"), ("Total eps"), ("Up to date?");

INSERT INTO show(title, watchEvery, catchUp, watched, upToDate, totalEps, dateStarted)
	VALUES ("some title", 7, 0, 2, true, 25, '2022-01-02')
	("some different title", 7, 0, 2, false, 25, '2022-01-02');