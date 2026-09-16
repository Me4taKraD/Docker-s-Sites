CREATE TABLE IF NOT EXISTS items (
id SERIAL PRIMARY KEY,
title TEXT NOT NULL,
description TEXT,
image_url VARCHAR(255),
characteristics JSONB DEFAULT '{}'
);

INSERT INTO items (title, description, image_url)
VALUES (
	'SPRAWL zero',
	'Динамичный шутер, вдохновленный культовыми играми этого жанра 2000-х годов. Попробуйте выжить в жестоком киберпанковском городе, угнетаемом военным режимом и религиозными фанатиками.',
	'/images/capsule_231x87_2x.jpg'
);