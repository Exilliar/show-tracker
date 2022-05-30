-- psql postgres -h 127.0.0.1 -d DB_NAME -f schema.sql

DROP TABLE headers;
DROP TABLE show;

CREATE TABLE headers (
	header text PRIMARY KEY
);

CREATE SEQUENCE show_id_seq;

CREATE TABLE show(
	id INTEGER PRIMARY KEY DEFAULT nextval('show_id_seq'),
	title TEXT NOT NULL,
	watchevery INTEGER NOT NULL,
	catchup INTEGER NOT NULL,
	watched INTEGER NOT NULL,
	uptodate BOOLEAN NOT NULL,
	totaleps INTEGER NOT NULL,
	datestarted DATE NOT NULL
);

INSERT INTO headers(header) VALUES ('Title'), ('Started'), ('Watched every'), ('To watch'), ('Eps watched'), ('Total eps'), ('Up to date?');

INSERT INTO show(title, watchEvery, catchUp, watched, upToDate, totalEps, dateStarted)
	VALUES ('some title', 7, 0, 2, true, 25, '2022-01-02'),
	('some different title', 7, 0, 2, false, 25, '2022-01-02');