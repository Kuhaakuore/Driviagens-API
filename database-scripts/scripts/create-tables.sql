CREATE TABLE passengers (
	id SERIAL PRIMARY KEY,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL
);

CREATE TABLE cities (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL
);	

CREATE TABLE flights (
	id SERIAL PRIMARY KEY,
	origin INT NOT NULL,
	destination INT NOT NULL,
	date DATE NOT NULL,
	FOREIGN KEY (origin)
		REFERENCES cities (id),
	FOREIGN KEY (destination)
		REFERENCES cities (id)
);

CREATE TABLE travels (
	id SERIAL PRIMARY KEY,
	"passengerId" INT NOT NULL,
	"flightId" INT NOT NULL,
	FOREIGN KEY ("passengerId")
		REFERENCES passengers (id),
	FOREIGN KEY ("flightId")
		REFERENCES flights (id)
);