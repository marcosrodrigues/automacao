class ProdutosController < ApplicationController
  def salvar
    produto = Produto.new(:descricao => params[:descricao], :codigo_barras => params[:codigo_barras],
                          :preco_venda => params[:preco_venda])
    produto.tipo_produto = TipoProduto.find(params[:tipo_produto_id])

    if produto.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def lista
    produtos = Produto.all.map do |p|
      {
          :id => p.id,
          :descricao => p.descricao,
          :codigo_barras => p.codigo_barras,
          :preco_venda => p.preco_venda,
          :tipo_produto_id => p.tipo_produto_id,
          :tipo_produto => p.tipo_produto && p.tipo_produto.descricao
      }
    end
    respond_to do |format|
      format.json {
        render :json => produtos
      }
    end
  end

  def pesquisa
    if params[:term]
      like = "%".concat(params[:term].upcase.concat("%"))
      produtos = Produto.where("upper(descricao) like ?", like)
    else
      produtos = Produto.all
    end
    list = produtos.map { |p| Hash[id: p.id, label: p.descricao, name: p.descricao] }
    render json: list
  end

  def alterar
    produto = Produto.find(params[:id])
    produto.descricao = params[:descricao]
    produto.codigo_barras = params[:codigo_barras]
    produto.preco_venda = params[:preco_venda]
    produto.tipo_produto = TipoProduto.find(params[:tipo_produto_id])

    if produto.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def excluir
    Produto.find(params[:id]).destroy

    respond_to do |format|
      format.json { render :json => :success}
    end
  end
end
