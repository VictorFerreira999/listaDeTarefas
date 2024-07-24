import React, { useState, useEffect } from "react";
import './TodoList.css';  // Importa o arquivo de estilos CSS para o componente.
import Icone from './assets/icon.webp';  // Importa uma imagem para ser usada no componente.

function TodoList() {
    // Tenta obter a lista armazenada no localStorage. Se não houver nada, retorna null.
    const listaStorage = localStorage.getItem('Lista');

    // Define o estado inicial da lista, usando a lista armazenada no localStorage ou uma lista vazia.
    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");  // Define o estado inicial do novo item como uma string vazia.

    // useEffect para atualizar o localStorage sempre que a lista mudar.
    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista));
    }, [lista]);

    // Função para adicionar um novo item à lista.
    function adicionaItem(form) {
        form.preventDefault();  // Previne o comportamento padrão do formulário.
        if (!novoItem) {  // Se o novo item estiver vazio, não faz nada.
            return;
        }
        // Adiciona o novo item à lista, com isCompleted definido como false.
        setLista([...lista, { text: novoItem, isCompleted: false }]);
        setNovoItem("");  // Reseta o campo de entrada.
        document.getElementById('input-entrada').focus();  // Foca novamente no campo de entrada.
    }

    // Função para marcar um item como completo ou incompleto.
    function clicou(index) {
        const listaAux = [...lista];  // Cria uma cópia da lista.
        listaAux[index].isCompleted = !listaAux[index].isCompleted;  // Alterna o estado de isCompleted do item.
        setLista(listaAux);  // Atualiza a lista.
    }

    // Função para deletar um item da lista.
    function deleta(index) {
        const listaAux = [...lista];  // Cria uma cópia da lista.
        listaAux.splice(index, 1);  // Remove o item da lista.
        setLista(listaAux);  // Atualiza a lista.
    }

    // Função para deletar todos os itens da lista.
    function deletaTudo() {
        setLista([]);  // Reseta a lista.
    }

    // Renderiza o componente.
    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input
                    id="input-entrada"
                    type="text"
                    value={novoItem}
                    onChange={(e) => { setNovoItem(e.target.value) }}
                    placeholder="Adicione uma tarefa"
                />
                <button className="add" type="submit">Add</button>
            </form>
            <div className="listaTarefas">
                <div style={{ textAlign: 'center' }}>
                    {
                        // Se a lista estiver vazia, mostra a imagem central. Caso contrário, mostra os itens da lista.
                        lista.length < 1
                            ? <img className="icone-central" src={Icone} />
                            : lista.map((item, index) => (
                                <div
                                    key={index}
                                    className={item.isCompleted ? "item completo" : "item"}
                                >
                                    <span onClick={() => { clicou(index) }}>{item.text}</span>
                                    <button onClick={() => { deleta(index) }} className="del">Deletar</button>
                                </div>
                            ))
                    }
                    {
                        // Se a lista não estiver vazia, mostra o botão para deletar todos os itens.
                        lista.length > 0 &&
                        <button onClick={() => { deletaTudo() }} className="deleteAll">Deletar Todas</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default TodoList;  // Exporta o componente TodoList como padrão.
