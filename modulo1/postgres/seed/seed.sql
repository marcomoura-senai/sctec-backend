INSERT INTO pokemon (numero_pokedex, nome, altura, peso, vida, ataque, defesa, ataque_especial)
VALUES
(1, 'Bulbassauro', 7, 1300, 57, 49, 49, 45),
(2, 'Charmander', 6, 800, 65, 80, 65, 60),
(3, 'Squirtle', 5, 900, 50, 85, 40, 35),
(5, 'Meowth', 4, 400, 35, 45, 35, 55),
(6, 'Treecko', 4, 700, 55, 65, 70, 95),
(25, 'Pikachu', 4, 350, 35, 55, 30, 50)


INSERT INTO tipos (name)
VALUES
('normal'),
('fire'),
('water'),
('electric'),
('grass'),
('ice'),
('fighting'),
('poison'),
('ground'),
('flying'),
('psychic'),
('bug'),
('rock'),
('ghost'),
('dragon'),
('dark'),
('steel'),
('fairy')

INSERT INTO pokemon_tipos (tipo_id, pokemon_id)
VALUES
(1, 13),
(1, 14),
(1, 15),
(3, 13),
(3, 14),
(3, 15)