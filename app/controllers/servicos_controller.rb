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

  def pesquisa
    if params[:term]
      like = "%".concat(params[:term].upcase.concat("%"))
      servicos = Servico.where("upper(descricao) like ?", like).order(:descricao)
    else
      servicos = Servico.all
    end
    list = servicos.limit(15).map { |s| Hash[id: s.id, label: s.descricao, name: s.descricao] }
    render json: list
  end
end
