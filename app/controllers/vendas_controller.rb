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

  def report
    output = VendasReport.new.recibo_to_pdf(Venda.last)

    #respond_to do |format|
    #  format.pdf do
    #    send_data output, :filename => "recibo.pdf",
    #              :type => "application/pdf"
    #  end
    #end

    file_name = "public/recibo" + params[:id] + ".pdf"

    open(file_name, "wb") do |file|
      file << output
    end

    respond_to do |format|
      format.json { render :json => :success}
    end
  end
end
