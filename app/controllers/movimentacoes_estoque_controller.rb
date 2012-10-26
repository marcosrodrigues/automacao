class MovimentacoesEstoqueController < ApplicationController
  def salvar
    movimentacao_estoque = MovimentacaoEstoque.new(:operacao => params[:operacao], :quantidade => params[:quantidade])
    movimentacao_estoque.produto = Produto.find(params[:produto_id])
    movimentacao_estoque.save

    produto = movimentacao_estoque.produto
    if movimentacao_estoque.operacao == 1
      produto.quantidade = produto.quantidade + movimentacao_estoque.quantidade
    else
      produto.quantidade = produto.quantidade - movimentacao_estoque.quantidade
    end

    if produto.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def lista
    movimentacoes_estoque = MovimentacaoEstoque.all.map do |m|
      {
          :id => m.id,
          :produto_id => m.produto_id,
          :produto => m.produto && m.produto.descricao,
          :operacao => m.operacao,
          :quantidade => m.quantidade
      }
    end
    respond_to do |format|
      format.json {
        render :json => movimentacoes_estoque
      }
    end
  end
end
