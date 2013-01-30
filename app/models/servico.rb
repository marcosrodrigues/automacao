class Servico < ActiveRecord::Base
  attr_accessible :descricao

  def preco_atual
  	if PrecoServico.find_by_servico_id(self.id)
  		PrecoServico.where(:servico_id => self.id).order(:data).all.last.preco
  	else
  		0
  	end
  end
end
