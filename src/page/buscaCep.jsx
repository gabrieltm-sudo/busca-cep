import { FileCheck, Github } from "lucide-react";
import React from "react";
import { useState } from "react";

import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading';

const BuscaCep = () => {
    const [buscaCep, setBuscaCep] = useState(false);

    const mostrarCEP = () => {
        setBuscaCep(true);
    }

    const mostrarEnd = () => {
        setBuscaCep(false);
    }

    const [endereco, setEndereco] = useState({
        estado: '',
        cidade: '',
        rua: ''
    })

    const [cep, setCep] = useState('');

    const [loading, setLoading] = useState(false);

    const [dados, setDados] = useState(null);

    const [error, setError] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        setEndereco({
            ...endereco,
            [e.target.name]: e.target.value
        })
    }
        
    const handleChangeCep = (e) => {
        e.preventDefault();
        setCep(e.target.value);
    }

    const handleSubmitEndereco = async (e) => {
        e.preventDefault();
        try {
            setError(false);
            setLoading(true);
            const resposta = await fetch(`https://viacep.com.br/ws/${endereco.estado}/${endereco.cidade}/${endereco.rua}/json/`);
            const respostaJson = await resposta.json();
            setDados(respostaJson);
            console.table(respostaJson);
        } catch (error) {
            console.error('CEP não encontrado: ', error);
            setError(true);
        } finally {
            setLoading(false);
            
            }
        }
    
    const handleSubmitCep = async (e) => {
        e.preventDefault();
        try {
            setError(false);
            console.log(`Você digitou: ${cep}`);
            setLoading(true);
            const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            setDados(await resposta.json());
            console.table(dados);
        } catch(error) {
            console.error('Endereço não encontrado: ', error);
            setError(true);
        } finally{
            setLoading(false);
        }
    }

    return(
        <div className="min-h-screen bg-zinc-950 py-8 px-4">
            <div className="max-w-2xl mx-auto">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Sistema de Busca CEP</h1>
                    <p className="text-zinc-400">Busque endereços por CEP ou encontre CEPs por endereço</p>
                </div>

                <div className="flex gap-2 mb-8 p-1 bg-zinc-900 rounded-lg border border-zinc-800">
                    <button 
                        onClick={mostrarEnd}
                        className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                            !buscaCep 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                        }`}
                    >
                        Buscar Endereço
                    </button>
                    <button 
                        onClick={mostrarCEP}
                        className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                            buscaCep 
                                ? 'bg-blue-600 text-white shadow-lg' 
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                        }`}
                    >
                        Buscar CEP
                    </button>
                </div>

            {loading ? (
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <UseAnimations animation={loading} />
                        <p className="text-zinc-300 font-medium">Carregando...</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {buscaCep ? (  
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                            <h1 className="text-xl font-semibold text-white mb-6">Busca CEP</h1>
                            <form onSubmit={handleSubmitEndereco} className="space-y-4">
                                <input
                                    name="estado"
                                    value={endereco.estado}
                                    onChange={handleChange}
                                    type="text" 
                                    placeholder="Digite o estado"
                                    className="w-full bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                                />
                                <input 
                                    name="cidade"
                                    value={endereco.cidade}
                                    onChange={handleChange}
                                    type="text" 
                                    placeholder="Digite a cidade"
                                    className="w-full bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                                />
                                <input 
                                    name="rua"
                                    value={endereco.rua}
                                    onChange={handleChange}
                                    type="text" 
                                    placeholder="Digite a rua"
                                    className="w-full bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                                />
                                <button 
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Buscar CEP
                                </button>
                            </form>   
                        </div>
                    ) : (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                            <h1 className="text-xl font-semibold text-white mb-6">Busca Endereço</h1>
                            <form onSubmit={handleSubmitCep} className="space-y-4">
                                <input 
                                    name="cep"
                                    value={cep}
                                    onChange={handleChangeCep}
                                    type="text" 
                                    placeholder="Digite o CEP"
                                    className="w-full bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                                />
                                <button 
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Buscar Endereço
                                </button>
                            </form>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-600 text-white p-4 rounded-lg">
                            <p className="font-medium">Erro: Não foi possível encontrar o resultado. Verifique os dados e tente novamente.</p>
                        </div>
                    )}

                    {dados && (
                        <div className="mt-6">
                            <div className="flex items-center gap-2 mb-6">
                                <FileCheck size={24} className="text-blue-600" />
                                <h2 className="text-lg font-semibold text-white">Resultados:</h2>
                            </div>
                            {Array.isArray(dados) ? (
                                <div className="space-y-4">
                                    {dados.map((item, index) => (
                                        <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-all duration-200">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-3">
                                                    <div>
                                                        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">CEP</p>
                                                        <p className="text-white font-medium">{item.cep}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">UF</p>
                                                        <p className="text-white font-medium">{item.uf}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">CIDADE</p>
                                                        <p className="text-white font-medium">{item.localidade}</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <div>
                                                        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">LOGRADOURO</p>
                                                        <p className="text-white font-medium">{item.logradouro}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">BAIRRO</p>
                                                        <p className="text-white font-medium">{item.bairro}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">COMPLEMENTO</p>
                                                        <p className="text-white font-medium">{item.complemento}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-all duration-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">CEP</p>
                                                <p className="text-white font-medium">{dados.cep}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">UF</p>
                                                <p className="text-white font-medium">{dados.uf}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">CIDADE</p>
                                                <p className="text-white font-medium">{dados.localidade}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">LOGRADOURO</p>
                                                <p className="text-white font-medium">{dados.logradouro}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">BAIRRO</p>
                                                <p className="text-white font-medium">{dados.bairro}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">COMPLEMENTO</p>
                                                <p className="text-white font-medium">{dados.complemento}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div>
                <div className=" flex justify-center text-center mt-12 text-zinc-500 text-sm">
                    <p>Desenvolvido por Gabriel Torres Machado</p>
                    <a href="https://github.com/gabrieltm-sudo" target="_blank" rel="noopener noreferrer" className="ml-3 w-5 text-white hover:text-blue-500"><Github /></a>
                </div>
            </div>
            </div>
        </div>
    );
};

export default BuscaCep;