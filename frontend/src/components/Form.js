import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
          const user = ref.current;
    
          user.nome.value = onEdit.nome;
          user.descricao.value = onEdit.descricao;
          user.preco.value = onEdit.preco;
          user.data_de_criacao.value = onEdit.data_de_criacao;
        }
      }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (
            !user.nome.value ||
            !user.descricao.value ||
            !user.preco.value ||
            !user.data_de_criacao.value
          ) {
            return toast.warn("Preencha todos os campos!");
          }

          if (onEdit) {
            await axios
              .put("http://localhost:8800/" + onEdit.id, {
                nome: user.nome.value,
                descricao: user.descricao.value,
                preco: user.preco.value,
                data_de_criacao: user.data_de_criacao.value,
              })
              .then(({ data }) => toast.success(data))
              .catch(({ data }) => toast.error(data));
            } else {
                await axios
                  .post("http://localhost:8800", {
                    nome: user.nome.value,
                    descricao: user.descricao.value,
                    preco: user.preco.value,
                    data_de_criacao: user.data_de_criacao.value,
                  })
                  .then(({ data }) => toast.success(data))
                  .catch(({ data }) => toast.error(data));
            }

            user.nome.value = "";
            user.descricao.value = "";
            user.preco.value = "";
            user.data_de_criacao.value = "";

            setOnEdit(null);
            getUsers();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
            <Label>Nome</Label>
            <Input name="nome" />
            </InputArea>
            <InputArea>
            <Label>Descrição</Label>
            <Input name="descricao" />
            </InputArea>
            <InputArea>
            <Label>Preço</Label>
            <Input name="preco" type="number" />
            </InputArea>
            <InputArea>
            <Label>Data de Criação</Label>
            <Input name="data_de_criacao" type="date" />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;