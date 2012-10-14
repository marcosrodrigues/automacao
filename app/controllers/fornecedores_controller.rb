class FornecedoresController < ApplicationController
  def salvar
    Fornecedor.create(:nome => params[:nome], :telefone => params[:telefone])

    respond_to do |format|
      format.json { render :json => :success}
    end
  end

  def lista
    respond_to do |format|
      format.json { render :json => Fornecedor.all}
    end
  end

  def excluir
    Fornecedor.find(params[:id]).destroy

    respond_to do |format|
      format.json { render :json => :success}
    end
  end

  def alterar
    fornecedor = Fornecedor.find(params[:id])
    fornecedor.nome = params[:nome]
    fornecedor.telefone = params[:telefone]

    if fornecedor.save
      respond_to do |format|
        format.json { render :json => :success}
      end
    end
  end
end
