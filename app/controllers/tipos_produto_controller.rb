class TiposProdutoController < ApplicationController
  def salvar
    TipoProduto.create(:descricao => params[:descricao])

    respond_to do |format|
      format.json { render :json => :success}
    end
  end

  def lista
    respond_to do |format|
      format.json { render :json => TipoProduto.all}
    end
  end

  def excluir
    TipoProduto.find(params[:id]).destroy

    respond_to do |format|
      format.json { render :json => :success}
    end
  end

  def alterar
    tipo_produto = TipoProduto.find(params[:id])
    tipo_produto.descricao = params[:descricao]

    if tipo_produto.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end
end
