class ProdutosController < ApplicationController
  def salvar
    produto = Produto.new(:descricao => params[:descricao], :codigo_barras => params[:codigo_barras])
    produto.tipo_produto = TipoProduto.find(params[:tipo_produto_id])

    if produto.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def lista
    produtos = Produto.limit(params[:limit]).offset(params[:start]).order(:descricao).map do |p|
      {
          :id => p.id,
          :descricao => p.descricao,
          :codigo_barras => p.codigo_barras,
          :tipo_produto_id => p.tipo_produto_id,
          :tipo_produto => p.tipo_produto && p.tipo_produto.descricao,
          :quantidade => p.quantidade
      }
    end
    respond_to do |format|
      format.json {
        render :json => {:list => produtos, :count => Produto.count}
      }
    end
  end

  def pesquisa
    if params[:term]
      like = "%".concat(params[:term].upcase.concat("%"))
      produtos = Produto.where("upper(descricao) like ?", like).order(:descricao)
    else
      produtos = Produto.all
    end
    list = produtos.limit(15).map { |p| Hash[id: p.id, label: p.descricao, name: p.descricao] }
    render json: list
  end

  def alterar
    produto = Produto.find(params[:id])
    produto.descricao = params[:descricao]
    produto.codigo_barras = params[:codigo_barras]
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

  def precos
    respond_to do |format|
      format.json { render :json => PrecoProduto.find_all_by_produto_id(params[:id])}
    end
  end

  def salvar_preco
    preco_produto = PrecoProduto.new(:data => params[:data], :preco => params[:preco])
    preco_produto.produto = Produto.find(params[:produto_id])

    if preco_produto.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def alterar_preco
    preco_produto = PrecoProduto.find(params[:id])
    preco_produto.data = params[:data]
    preco_produto.preco = params[:preco]

    if preco_produto.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def excluir_preco
    PrecoProduto.find(params[:id]).destroy

    respond_to do |format|
      format.json { render :json => :success}
    end
  end
end
