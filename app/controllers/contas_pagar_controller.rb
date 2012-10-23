class ContasPagarController < ApplicationController
  def salvar
    conta_pagar = ContaPagar.new(:vencimento => params[:vencimento], :valor => params[:valor])
    conta_pagar.fornecedor = Fornecedor.find(params[:fornecedor_id])

    if conta_pagar.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def lista
    contas_pagar = ContaPagar.all.map do |c|
      {
          :id => c.id,
          :fornecedor_id => c.fornecedor_id,
          :fornecedor => c.fornecedor && c.fornecedor.nome,
          :vencimento => c.vencimento,
          :valor => c.valor
      }
    end
    respond_to do |format|
      format.json {
        render :json => contas_pagar
      }
    end
  end

  def alterar
    conta_pagar = ContaPagar.find(params[:id])
    conta_pagar.fornecedor = Fornecedor.find(params[:fornecedor_id])
    conta_pagar.vencimento = params[:vencimento]
    conta_pagar.valor = params[:valor]

    if conta_pagar.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def excluir
    ContaPagar.find(params[:id]).destroy

    respond_to do |format|
      format.json { render :json => :success}
    end
  end
end
