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

    venda = Venda.find(params[:id])

    item_venda = venda.item_venda.find_by_produto_id(params[:id_produto])

    if item_venda
      diferencaQuantidade = (params[:quantidade]).to_i - item_venda.quantidade

      if diferencaQuantidade < 0
        diferencaQuantidade = diferencaQuantidade * -1
      end

      item_venda.quantidade = params[:quantidade]

      if item_venda.save
        estoque = MovimentacaoEstoque.new
        estoque.produto = item_venda.produto
        estoque.operacao = 2
        estoque.quantidade = diferencaQuantidade
        estoque.save

        produto = item_venda.produto
        produto.quantidade -= diferencaQuantidade
        produto.save

        respond_to do |format|
          format.json { render :json => :success}
        end
      end
    else
      item_venda = ItemVenda.new
      item_venda.venda = venda
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
  end

  def adiciona_servico

    venda = Venda.find(params[:id])

    venda_servico = venda.venda_servico.find_by_servico_id(params[:id_servico])

    if venda_servico
      venda_servico.quantidade = params[:quantidade]
    else
      venda_servico = VendaServico.new
      venda_servico.venda = venda
      venda_servico.servico = Servico.find(params[:id_servico])
      venda_servico.quantidade = params[:quantidade]
    end

    if venda_servico.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def excluir_produto
    venda = Venda.find(params[:id])

    item_venda = venda.item_venda.find_by_produto_id(params[:id_produto])

    estoque = MovimentacaoEstoque.new
    estoque.produto = item_venda.produto
    estoque.operacao = 1
    estoque.quantidade = item_venda.quantidade
    estoque.save

    produto = item_venda.produto
    produto.quantidade += item_venda.quantidade
    produto.save

    item_venda.destroy

    respond_to do |format|
      format.json { render :json => :success}
    end
  end

  def excluir_servico
    venda = Venda.find(params[:id])

    venda_servico = venda.venda_servico.find_by_servico_id(params[:id_servico])

    venda_servico.destroy

    respond_to do |format|
      format.json { render :json => :success}
    end
  end

  def vendas_em_aberto
    vendas = Venda.find_all_by_fechada_and_cancelada(false, false).map do |v|
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

  def cancelar
    venda = Venda.find(params[:id])
    venda.cancelada = true
    
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
    produtos = Venda.find(params[:id]).item_venda.order(:id).map do |p|
      {
        :id => p.produto.id,
        :produto => p.produto.descricao,
        :preco => p.produto.preco_atual,
        :quantidade => p.quantidade
      }
    end

    respond_to do |format|
      format.json { render :json => produtos}
    end  
  end

  def servicos_da_venda
    servicos = Venda.find(params[:id]).venda_servico.order(:id).map do |s|
      {
        :id => s.servico.id,
        :servico => s.servico.descricao,
        :quantidade => s.quantidade,
        :preco => s.servico.preco_atual
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
