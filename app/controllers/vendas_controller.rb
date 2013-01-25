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

    # TODO - se o produto ja tiver sido adicionado alterar a quantidade

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

    # TODO - se o serviço ja tiver sido adicionado alterar a quantidade

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
    vendas = Venda.find_all_by_fechada(false).map do |v|
      {
        :id => v.id,
        :cliente_id => v.cliente_id,
        :cliente_nome => v.cliente ? v.cliente.nome : ""
      }
    end

    respond_to do |format|
      format.json { render :json => vendas }
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

  def informar_cliente
    venda = Venda.find(params[:id])
    venda.cliente = Cliente.find(params[:cliente_id])  

    if venda.save 
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def produtos_da_venda
    produtos = Venda.find(params[:id]).item_venda.map do |p|
      {
        :id => p.id,
        :produto => p.produto.descricao
      }
    end

    respond_to do |format|
      format.json { render :json => produtos}
    end  
  end

  def servicos_da_venda
    servicos = Venda.find(params[:id]).venda_servico.map do |s|
      {
        :id => s.id,
        :servico => s.servico.descricao
      }
    end

    respond_to do |format|
      format.json { render :json => servicos}
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
