SELECT p.id, p.nome, p.numero_pokedex, t.id, t.name 
FROM pokemon p
JOIN pokemon_tipos pt ON pt.pokemon_id = p.id
JOIN tipos t ON t.id = pt.tipo_id
WHERE p.id = 13


