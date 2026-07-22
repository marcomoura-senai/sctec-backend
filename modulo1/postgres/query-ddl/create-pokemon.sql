CREATE TABLE pokemon (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    numero_pokedex INT NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL UNIQUE,
    altura INT NOT NULL,
    peso INT NOT NULL,
    vida INT NOT NULL,
    ataque INT NOT NULL,
    defesa INT NOT NULL,
    ataque_especial INT NOT NULL
);

CREATE TABLE tipos(  
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL UNIQUE

);

CREATE TABLE pokemon_tipos (
    tipo_id INT NOT NULL REFERENCES tipos(id),
    pokemon_id INT NOT NULL REFERENCES pokemon(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT pk_pokemon_tipos PRIMARY KEY (tipo_id, pokemon_id)
)