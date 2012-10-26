class VendasController < ApplicationController
  def index
  end

  def fechar
    venda = Venda.new
    venda.desconto = params[:desconto]
    venda.save

    itens = params[:itens]
    itens.each do |i|
      item_venda = ItemVenda.new
      item_venda.venda = venda
      item_venda.produto = Produto.find(i[1].first[1])
      item_venda.save
    end

    respond_to do |format|
      format.json { render :json => :success}
    end
  end
end
