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
    list = servicos.limit(15).map { |s| 
      Hash[
        id: s.id, 
        label: s.descricao, 
        name: s.descricao,
        preco: s.preco_atual
      ] 
    }
    render json: list
  end

  def precos
    respond_to do |format|
      format.json { render :json => PrecoServico.find_all_by_servico_id(params[:id])}
    end
  end

  def salvar_preco
    preco_servico = PrecoServico.new(:data => params[:data], :preco => params[:preco])
    preco_servico.servico = Servico.find(params[:servico_id])

    if preco_servico.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def alterar_preco
    preco_servico = PrecoServico.find(params[:id])
    preco_servico.data = params[:data]
    preco_servico.preco = params[:preco]

    if preco_servico.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end

  def excluir_preco
    PrecoServico.find(params[:id]).destroy

    respond_to do |format|
      format.json { render :json => :success}
    end
  end
end
