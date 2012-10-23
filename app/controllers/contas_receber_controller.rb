class ContasReceberController < ApplicationController
  def salvar
    conta_receber = ContaReceber.new(:vencimento => params[:vencimento], :valor => params[:valor])
    conta_receber.cliente = Cliente.find(params[:cliente_id])

    if conta_receber.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def lista
    contas_receber = ContaReceber.all.map do |c|
      {
          :id => c.id,
          :cliente_id => c.cliente_id,
          :cliente => c.cliente && c.cliente.nome,
          :vencimento => c.vencimento,
          :valor => c.valor
      }
    end
    respond_to do |format|
      format.json {
        render :json => contas_receber
      }
    end
  end

  def alterar
    conta_receber = ContaReceber.find(params[:id])
    conta_receber.cliente = Cliente.find(params[:cliente_id])
    conta_receber.vencimento = params[:vencimento]
    conta_receber.valor = params[:valor]

    if conta_receber.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def excluir
    ContaReceber.find(params[:id]).destroy

    respond_to do |format|
      format.json { render :json => :success}
    end
  end
end
