class VendasController < ApplicationController
  def index
  
  end

  def nova_venda
    venda = Venda.create

    respond_to do |format|
      format.json { render :json => venda.id}
    end  
  end

  def adiciona_produto
    item_venda = ItemVenda.new
    item_venda.venda = Venda.find(params[:id])
    item_venda.produto = Produto.find(params[:id_produto])
    item_venda.quantidade = params[:quantidade]

    if item_venda.save
      
      estoque = MovimentacaoEstoque.new
      estoque.produto = item_venda.produto
      estoque.operacao = 2
      estoque.quantidade = item_venda.quantidade
      estoque.save

      produto = item_venda.produto
      produto.quantidade -= item_venda.quantidade
      produto.save

      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def adiciona_servico
    venda_servico = VendaServico.new
    venda_servico.venda = Venda.find(params[:id])
    venda_servico.servico = Servico.find(params[:id_servico])
    venda_servico.quantidade = params[:quantidade]

    if venda_servico.save
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
    @empresa = Empresa.first
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
