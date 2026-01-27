import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from './components/Header'
import Produtos from './containers/Produtos'
import { GlobalStyle } from './styles'

import type { RootState } from './store'
import { adicionar } from './store/cartSlice'
import { useGetProdutosQuery } from './store/api'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  // RTK Query (substitui o useEffect + fetch)
  const { data: produtos = [], isLoading, isError } = useGetProdutosQuery()

  // Redux (substitui useState do carrinho)
  const dispatch = useDispatch()
  const carrinho = useSelector((state: RootState) => state.cart.itens)

  // Favoritos pode continuar em useState (não faz parte do requisito do slice)
  const [favoritos, setFavoritos] = useState<Produto[]>([])

  function adicionarAoCarrinho(produto: Produto) {
    if (carrinho.find((p) => p.id === produto.id)) {
      alert('Item já adicionado')
    } else {
      dispatch(adicionar(produto))
    }
  }

  function favoritar(produto: Produto) {
    if (favoritos.find((p) => p.id === produto.id)) {
      const favoritosSemProduto = favoritos.filter((p) => p.id !== produto.id)
      setFavoritos(favoritosSemProduto)
    } else {
      setFavoritos([...favoritos, produto])
    }
  }

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (isError) {
    return <p>Erro ao carregar produtos</p>
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={favoritar}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
      </div>
    </>
  )
}

export default App
