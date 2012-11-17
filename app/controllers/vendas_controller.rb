class VendasController < ApplicationController
  def index
  
  end

  def nova_venda
    venda = Venda.create

    respond_to do |format|
      format.json { render :json => venda.id}
    end  
  end

  def adiciona_item_venda
    item_venda = ItemVenda.new
    item_venda.venda = Venda.find(params[:id])
    item_venda.produto = Produto.find(params[:id_produto])
    item_venda.quantidade = params[:quantidade]

    if item_venda.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def vendas_em_aberto
    respond_to do |format|
      format.json { render :json => Venda.find_all_by_fechada(false)}
    end
  end

  def fechar
    venda = Venda.find(params[:id])
    venda.desconto = params[:desconto]
    venda.fechada = true
    
    if venda.save 
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def recibo
    @venda = Venda.find(params[:id])

    render :layout => "report"
  end

  def report
    #output = VendasReport.new.recibo_to_pdf(Venda.last)
    #
    #respond_to do |format|
    #  format.pdf do
    #    send_data output, :filename => "recibo.pdf",
    #              :type => "application/pdf"
    #  end
    #end

    #file_name = "public/recibo" + params[:id] + ".pdf"
    #
    #open(file_name, "wb") do |file|
    #  file << output
    #end
    #
    #respond_to do |format|
    #  format.json { render :json => :success}
    #end
  end
end
