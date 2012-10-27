class ServicosController < ApplicationController
  def salvar
    Servico.create(:descricao => params[:descricao])

    respond_to do |format|
      format.json { render :json => :success}
    end
  end

  def lista
    respond_to do |format|
      format.json { render :json => Servico.all}
    end
  end

  def excluir
    Servico.find(params[:id]).destroy

    respond_to do |format|
      format.json { render :json => :success}
    end
  end

  def alterar
    servico = Servico.find(params[:id])
    servico.descricao = params[:descricao]

    if servico.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end
end
