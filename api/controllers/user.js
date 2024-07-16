import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM produtos";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const q =
      "INSERT INTO produtos(`nome`, `descricao`, `preco`, `data_de_criacao`) VALUES(?)";
  
    const values = [
      req.body.nome,
      req.body.descricao,
      req.body.preco,
      req.body.data_de_criacao,
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Produto criado com sucesso.");
    });
  };

  export const updateUser = (req, res) => {
    const q =
      "UPDATE produtos SET `nome` = ?, `descricao` = ?, `preco` = ?, `data_de_criacao` = ? WHERE `id` = ?";
  
    const values = [
      req.body.nome,
      req.body.descricao,
      req.body.preco,
      req.body.data_de_criacao,
    ];
  
    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Produto atualizado com sucesso.");
    });
  };

  export const deleteUser = (req, res) => {
    const q = "DELETE FROM produtos WHERE `id` = ?";
  
    db.query(q, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Produto deletado com sucesso.");
    });
  };