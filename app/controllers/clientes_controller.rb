class ClientesController < ApplicationController
  def salvar
    Cliente.create(:nome => params[:nome], :telefone => params[:telefone])

    respond_to do |format|
      format.json { render :json => :success}
    end
  end

  def lista
    respond_to do |format|
      format.json { render :json => Cliente.all}
    end
  end

  def excluir
    Cliente.find(params[:id]).destroy

    respond_to do |format|
      format.json { render :json => :success}
    end
  end

  def alterar
    cliente = Cliente.find(params[:id])
    cliente.nome = params[:nome]
    cliente.telefone = params[:telefone]

    if cliente.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def pesquisa
    if params[:term]
      like = "%".concat(params[:term].upcase.concat("%"))
      clientes = Cliente.where("upper(nome) like ?", like).order(:nome)
    else
      clientes = Cliente.all
    end
    list = clientes.limit(15).map { |s| Hash[id: s.id, label: s.nome, name: s.nome] }
    render json: list
  end
end
