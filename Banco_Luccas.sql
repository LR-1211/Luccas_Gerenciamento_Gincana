-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS gincana;
USE gincana;

-- Tabela de equipes
CREATE TABLE IF NOT EXISTS equipe (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    pontos INT DEFAULT 0
);

-- Procedure para inserir equipe
DELIMITER $$
CREATE PROCEDURE inserir_equipe_Luccas (
    IN p_nome VARCHAR(100),
    IN p_pontos INT
)
BEGIN
    INSERT INTO equipe (nome, pontos)
    VALUES (p_nome, p_pontos);
END$$
DELIMITER ;

-- Procedure para listar equipes
DELIMITER $$
CREATE PROCEDURE listar_equipes_Luccas ()
BEGIN
    SELECT * FROM equipe;
END$$
DELIMITER ;

-- Procedure para editar equipe
DELIMITER $$
CREATE PROCEDURE editar_equipe_Luccas (
    IN p_id INT,
    IN p_novo_nome VARCHAR(100),
    IN p_novos_pontos INT
)
BEGIN
    UPDATE equipe
    SET nome = p_novo_nome,
        pontos = p_novos_pontos
    WHERE id = p_id;
END$$
DELIMITER ;

-- Procedure para excluir equipe
DELIMITER $$
CREATE PROCEDURE excluir_equipe_Luccas (IN p_id INT)
BEGIN
    DELETE FROM equipe WHERE id = p_id;
END$$
DELIMITER ;
